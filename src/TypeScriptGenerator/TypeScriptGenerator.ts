import * as vscode from 'vscode';
import { XMLParser } from '../../node_modules/fast-xml-parser/src/fxp';
import { IGenerator } from '../IGenerator';
import { IllegalArgumentException } from '../IllegalArgumentException';
import { ISourceElement } from './ISourceElement';
import { SourceElementFactory } from './SourceElementFactory';
import { FileContent } from '../FileContent';
export class TypeScriptGenerator implements IGenerator{
	private classList : Array<FileContent>;
	private saveDir : vscode.Uri;
	private readonly EXTENSION :string
	private constructor(classList : Array<FileContent>, saveDir : vscode.Uri){
		this.classList = classList;
		this.saveDir = saveDir;
		this.EXTENSION = ".ts";
	}
	
	/**
	 * 
	 */
	private readXML(xml : any) : TypeScriptGenerator{
		let result : Array<FileContent> = [];
		let classList : Array<any> = xml["XMI"]["XMI.content"]["UML:Model"]["UML:Namespace.ownedElement"]["UML:Class"];

		for(let _class of classList){
			let source : string = "";
			let name = _class["@_name"] + this.EXTENSION;
			// classまたはインタフェースしか存在せず
			// インターフェースにはisInterface属性が存在しないため
			// undefinedと比較している
			if(_class["@_isInterface"] != undefined){
				source = TypeScriptGenerator.createInterface(_class);
				result.push(
					FileContent.createInstance(name, source)
				);
				continue;
			}

			source = TypeScriptGenerator.createClass(_class);
			result.push(
				FileContent.createInstance(name, source)
			);
		}

		return new TypeScriptGenerator(result,this.saveDir);
	}

	private static createClass(_class : any) : string{
		let name = _class["@_name"];
		let attributeList : Array<ISourceElement> = [];
		let methodList : Array<ISourceElement> = [];

		let attribute = _class["UML:Classifier.feature"]["UML:Attribute"];
		if(attribute != undefined){
			attribute = (attribute == undefined) ? [] : attribute;
			attribute = (attribute.length == undefined) ? [attribute] : attribute;
			attributeList = TypeScriptGenerator.createAttribute(attribute);
		}

		let methods = _class["UML:Classifier.feature"]["UML:Operation"];
		if(methods != undefined){
			methods = (methods == undefined) ? [] : methods;
			methods = (methods.length == undefined) ? [methods] : methods;
			methodList = TypeScriptGenerator.createOperation(methods);
		}


		let sourceGenerator :ISourceElement = SourceElementFactory.Class(name, attributeList, methodList);

		let source : string = sourceGenerator.parse();

		return source;
	}
	private static createInterface(_class : any) : string{
		let name = _class["@_name"];
		let methodList : Array<ISourceElement> = [];

		let methods = _class["UML:Classifier.feature"]["UML:Operation"];
		if(methods != undefined){
			methods = (methods == undefined) ? [] : methods;
			methods = (methods.length == undefined) ? [methods] : methods;
			methodList = TypeScriptGenerator.createAbstructOperation(methods);
		}


		let sourceGenerator :ISourceElement = SourceElementFactory.InterFace(name, methodList);

		let source : string = sourceGenerator.parse();

		return source;
	}
	private static createAbstructOperation(operateList : any[]) : Array<ISourceElement>{
		let result : Array<ISourceElement> = [];
		operateList.forEach((value)=>{
			let name : string = value["@_name"];
			result.push(SourceElementFactory.AbstructMethod(
				name
			));
		});
		return result;
	}
	private static createAttribute(attributeList : any[]) : Array<ISourceElement>{
		let result : Array<ISourceElement> = [];
		attributeList.forEach((value)=>{
			let name : string = value["@_name"];
			let visibility :string = value["@_visibility"];
			let isStatic : string = (value["@_isStatic"] == undefined) ? "false" : value["@_isStatic"];
			result.push(SourceElementFactory.Attr(
				name
				,visibility
				,isStatic
			));
		});
		return result;
	}
	private static createOperation(operateList : any[]) : Array<ISourceElement>{
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

	public static createInstance(xmiContent:string,parser : XMLParser, saveDir : vscode.Uri) : TypeScriptGenerator{
		let xml : any = parser.parse(xmiContent);
		return new TypeScriptGenerator([],saveDir).readXML(xml);
	}

}