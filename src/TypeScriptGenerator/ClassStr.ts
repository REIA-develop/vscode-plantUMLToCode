import { IClassRelation } from "../IClassRelation";
import { IllegalArgumentException } from "../IllegalArgumentException";
import { ISourceElement } from "../ISourceElement";

export class ClassStr implements ISourceElement{
	private className : string;
	private attributeList : Array<ISourceElement>;
	private methodList : Array<ISourceElement>
	private classRelation : IClassRelation
	private constructor(
		className : string
		,attributeList : Array<ISourceElement>
		,methodList : Array<ISourceElement>
		,classRelation : IClassRelation
	){
		this.className = className;
		this.attributeList = attributeList;
		this.methodList = methodList;
		this.classRelation = classRelation;
	}
	public static createInstance(
		className : string
		, attributeList : Array<ISourceElement>
		,methodList : Array<ISourceElement>
		,classRelation : IClassRelation
	) : ClassStr{
		return new ClassStr(className, attributeList, methodList, classRelation);
	}
	public parse() : string{
		let result = "export class " + this.className;
		// 継承
		result += this.classRelation.getExtendsString();
		// 実装
		result += this.classRelation.getImplementsString();
		result +="{\n";
		
		this.attributeList.forEach((attr)=>{
			result += "\t" + attr.parse() + "\n";
			result += "\n";
		});

		this.methodList.forEach((method)=>{
			result += "\t" + method.parse().replaceAll("\n","\n\t") + "\n";
			result += "\n";
		})

		result += "\n}"

		return result;

	}
	
}