import { IllegalArgumentException } from "../IllegalArgumentException";
import { ISourceElement } from "./ISourceElement";

export class AbstructMethod implements ISourceElement{
	private value : string;
	
	private constructor(
		value : string
		
	){
		this.value = value;
		
	}
	public static createInstance(value:string) : AbstructMethod{
		return new AbstructMethod(value.replaceAll(" ",""));
	}
	public parse() : string{
		let result = "";
		/* "REFFERER_URL : String" */
		let argsTemp : RegExpMatchArray | null = this.value.match(/\(.*\)/)
		if(argsTemp == null){
			throw new IllegalArgumentException(`${this.value} is Illegal Value.(not Found Args)`);
		}
		let argStr : string = "";
		argStr = argsTemp[0];
		let nameReturn = this.value.replace(argStr,"");

		let args:string[] = argStr.substring(1,argStr.length - 1).split(",");

		let [name, returnType] = nameReturn.split(":");

		result += `${name}`;
		let argsVerify: string[] = new Array();
		args.forEach((value : string)=>{
			if(value.length == 0){
				return;
			}
			let [name, type] = value.split(":");
			argsVerify.push(`${name} : ${type}`);
		})
		let argsStr : string = "()";
		if(argsVerify.length > 0 ){
			argsStr = `(${argsVerify.join(", ")})`;
		} 
		result += argsStr;
		result += ` : ${returnType};`;

		return result;

	}
	
}