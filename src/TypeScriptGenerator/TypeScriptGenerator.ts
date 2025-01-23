import * as vscode from 'vscode';
import { XMLParser } from '../../node_modules/fast-xml-parser/src/fxp';
import { IGenerator } from '../IGenerator';
import { IllegalArgumentException } from '../IllegalArgumentException';
import { ISourceElement } from '../ISourceElement';
import { SourceElementFactory } from './SourceElementFactory';
import { FileContent } from '../FileContent';
import { Dictionary } from '../Dictionary';
import { IClassRelation } from '../IClassRelation';
export class TypeScriptGenerator implements IGenerator{
	private classList : Array<FileContent>;
	private saveDir : vscode.Uri;
	private readonly EXTENSION :string = ".ts";
	private relation : Dictionary<string, IClassRelation>;
	
	private constructor(
		xml : any
		, saveDir : vscode.Uri
		, relation : Dictionary<string, IClassRelation>
	){
		this.EXTENSION = ".ts";
		this.saveDir = saveDir;
		this.relation = relation;
		this.classList = this.readXML(xml);
	}
	private static readRelation(diagram : string) : Dictionary<string, IClassRelation>{
		let relateList : Dictionary<string, IClassRelation> = new Dictionary<string, IClassRelation>();

		// 正規表現抽出
		// {class} ...|> {interface} : implements relation
		// {class} ---|> {class} : extends relation
		// but about point or hyphen count, extrude from thinks
		
		// get extends Relation
		let extendsMatches : RegExpMatchArray | null = diagram.match(/.*[-*]\|>.*/g);
		let extendsRelation : Dictionary<string, string> = new Dictionary<string, string>();
		let afterCollectExtendsMatches : RegExpMatchArray | Array<string> = [];
		if(extendsMatches != null){
			afterCollectExtendsMatches = extendsMatches;
		}
		afterCollectExtendsMatches.map(
			(value) =>{
				let keyValue : Array<string> = value.replaceAll(/[\t|\-|>]/g,"").split(" ").filter((value) => {return value != ""});
				let relationSrc :string = keyValue[0];
				let relationTarget : string = keyValue[1];
				if(extendsRelation.keyContains(relationSrc)){
					throw new IllegalArgumentException(relationSrc + " have a many extends relation");
				}
				extendsRelation.add(relationSrc,relationTarget);
			}
		)
		
		let implementsMatches : RegExpMatchArray | null = diagram.match(/.*[\.*]\|>.*/g);
		let implementsRelation : Dictionary<string, Array<string>> = new Dictionary<string, Array<string>>();
		let afterCollectImplementsMatches : RegExpMatchArray | Array<string> = [];
		if(implementsMatches != null){
			afterCollectImplementsMatches = implementsMatches;
		}
		afterCollectImplementsMatches.map(
			(value) =>{
				let keyValue : Array<string> = value.replaceAll(/[\t|\.|>]/g,"").split(" ").filter((value) => {return value != ""});
				let relationSrc :string = keyValue[0];
				let relationTarget : string = keyValue[1];
				if(!(implementsRelation.keyContains(relationSrc))){
					implementsRelation.add(relationSrc,[]);
				}
				implementsRelation.getOrDefault(relationSrc,[]).push(relationTarget);
			}
		)

		for(let key of extendsRelation.keyIterator()){
			relateList.add(
				key
				,SourceElementFactory.ClassRelation(
					extendsRelation.getOrDefault(key,"")
					,implementsRelation.getOrDefault(key,[])
				)
			);
		}
		
		for(let key of implementsRelation.keyIterator()){
			if(relateList.keyContains(key)){
				continue;
			}
			relateList.add(
				key
				,SourceElementFactory.ClassRelation(
					extendsRelation.getOrDefault(key,"")
					,implementsRelation.getOrDefault(key,[])
				)
			);
		}


		return relateList;
	}
	/**
	 * 
	 */
	private readXML(xml : any) : Array<FileContent>{
		let result : Array<FileContent> = [];
		let classList : Array<any> = xml["XMI"]["XMI.content"]["UML:Model"]["UML:Namespace.ownedElement"]["UML:Class"];

		let methodDict : Dictionary<string, any[]> = new Dictionary<string, any[]>();
		let attributeDict : Dictionary<string, any[]> = new Dictionary<string, any[]>();
		// 属性検証
		for(let _class of classList){
			let name = _class["@_name"];

			let attribute = _class["UML:Classifier.feature"]["UML:Attribute"];
			if(attribute != undefined){
				// 変数が一つだった場合配列ではないが、複数の時配列であるため、
				// 一つの時、配列に変換する
				attribute = (attribute == undefined) ? [] : attribute;
				attribute = (attribute.length == undefined) ? [attribute] : attribute;

			}else{
				attribute = [];
			}
	
			// メソッド版
			let methods = _class["UML:Classifier.feature"]["UML:Operation"];
			if(methods != undefined){
				methods = (methods == undefined) ? [] : methods;
				methods = (methods.length == undefined) ? [methods] : methods;
			}else{
				methods = [];
			}

			methodDict.add(name, methods);
			attributeDict.add(name, attribute);
		}

		// ソース生成
		for(let _class of classList){
			let source : string = "";
			let name = _class["@_name"];
			let fileName = name + this.EXTENSION;

			let methods : any[] = methodDict.get(name);
			// インターフェースメソッドの結合
			this.relation.getOrDefault(name,
				SourceElementFactory.ClassRelation("",[])
			).getImplements().map(
				(implementsClass : string) =>{
					methods = methods.concat(
						methodDict.get(implementsClass)
					);
				}
			)
			let attribute : any[] = attributeDict.get(name);


			// classまたはインタフェースしか存在せず
			// クラスにはisInterface属性が存在しないため
			// undefinedと比較している
			if(_class["@_isInterface"] != undefined){
				source = this.createInterface(_class, methods);
				result.push(
					FileContent.createInstance(fileName, source)
				);
				continue;
			}
			
			source = this.createClass(name, attribute, methods);
			result.push(
				FileContent.createInstance(fileName, source)
			);
		}

		return result;
	}

	private createClass(name : string, attribute : any[], methods : any[]) : string{
		// 変数一覧
		let attributeList : Array<ISourceElement> = [];
		// メソッド一覧
		let methodList : Array<ISourceElement> = [];

		attributeList = this.createAttribute(attribute);

		// メソッド版
		methodList = this.createOperation(methods);


		let sourceGenerator :ISourceElement = SourceElementFactory.Class(
			name
			, attributeList
			, methodList
			, this.relation.getOrDefault(
				name
				,SourceElementFactory.ClassRelation("",[])
			)
		);

		let source : string = sourceGenerator.parse();

		return source;
	}
	private createInterface(_class : any, methods:any[]) : string{
		let name = _class["@_name"];
		let methodList : Array<ISourceElement> = [];

		methodList = this.createAbstructOperation(methods);


		let sourceGenerator :ISourceElement = SourceElementFactory.InterFace(name, methodList);

		let source : string = sourceGenerator.parse();

		return source;
	}
	private createAbstructOperation(operateList : any[]) : Array<ISourceElement>{
		let result : Array<ISourceElement> = [];
		operateList.forEach((value)=>{
			let name : string = value["@_name"];
			result.push(SourceElementFactory.AbstructMethod(
				name
			));
		});
		return result;
	}
	private createAttribute(attributeList : any[]) : Array<ISourceElement>{
		let result : Array<ISourceElement> = [];
		attributeList.forEach((value)=>{
			// 変数名
			let name : string = value["@_name"];
			// アクセサ
			let visibility :string = value["@_visibility"];
			// staticであるか
			let isStatic : string = (value["@_isStatic"] == undefined) ? "false" : value["@_isStatic"];
			result.push(SourceElementFactory.Attr(
				name
				,visibility
				,isStatic
			));
		});
		return result;
	}
	private createOperation(operateList : any[]) : Array<ISourceElement>{
		let result : Array<ISourceElement> = [];
		operateList.forEach((value)=>{
			let name : string = value["@_name"];
			let visibility :string = value["@_visibility"];
			let isStatic : string = (value["@_isStatic"] == undefined) ? "false" : value["@_isStatic"];
			result.push(SourceElementFactory.Method(
				name
				,visibility
				,isStatic
			));
		});
		return result;
	}

	public generateCode(): string {
		// 書き込みログ
		let result = "";
		this.classList.forEach((file : FileContent)=>{
			let saveUri : vscode.Uri = vscode.Uri.file(
				this.saveDir.path + "/" + file.getName()
			);
			if(result.length != 0){
				result += "\n";
			}
			let tempPath = saveUri.path.replaceAll("/","\\");
			result += tempPath.substring(1,tempPath.length);
			vscode.workspace.fs.writeFile(saveUri,file.getContent());
		});
		result = "completed save\n" + result;

		return result;
	}

	public static createInstance(xmiContent : string,classDiagram : string, parser : XMLParser, saveDir : vscode.Uri) : TypeScriptGenerator{
		let xml : any = parser.parse(xmiContent);
		let relate : Dictionary<string, IClassRelation> = TypeScriptGenerator.readRelation(classDiagram);
		return new TypeScriptGenerator(xml, saveDir,relate);
	}

}