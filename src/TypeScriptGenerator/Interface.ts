
import { ISourceElement } from "../ISourceElement";

export class Interface implements ISourceElement{
	private name : string;
	private methodList : Array<ISourceElement>
	private constructor(
		name : string
		,methodList : Array<ISourceElement>
	){
		this.name = name;
		this.methodList = methodList;
	}
	public static createInstance(className : string, methodList : Array<ISourceElement>) : Interface{
		return new Interface(className,  methodList);
	}
	public parse() : string{
		let result = "export interface " + this.name + "{\n";

		this.methodList.forEach((method)=>{
			result += "\t" + method.parse() + "\n";
			result += "\n";
		})

		result += "\n}"

		return result;

	}
	
}