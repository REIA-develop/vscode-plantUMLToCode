import { IllegalArgumentException } from "../IllegalArgumentException";
import { ISourceElement } from "./ISourceElement";

export class ClassStr implements ISourceElement{
	private className : string;
	private attributeList : Array<ISourceElement>;
	private methodList : Array<ISourceElement>
	private constructor(
		className : string
		,attributeList : Array<ISourceElement>
		,methodList : Array<ISourceElement>
	){
		this.className = className;
		this.attributeList = attributeList;
		this.methodList = methodList;
	}
	public static createInstance(className : string, attributeList : Array<ISourceElement>,methodList : Array<ISourceElement>) : ClassStr{
		return new ClassStr(className, attributeList, methodList);
	}
	public parse() : string{
		let result = "export class " + this.className + "{\n";

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