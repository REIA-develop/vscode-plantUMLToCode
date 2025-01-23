import { IllegalArgumentException } from "../IllegalArgumentException";
import { ISourceElement } from "../ISourceElement";

export class Method implements ISourceElement{
	private value : string;
	private visibility : string;
	private isStatic : boolean;
	private constructor(
		value : string
		,visibility : string
		,isStatic : boolean
	){
		this.value = value;
		this.visibility = visibility;
		this.isStatic = isStatic;
	}
	public static createInstance(value:string, visibility:string, isStatic : string) : Method{
		let staticBool : boolean = false;
		switch(isStatic.toLowerCase()){
			case "true":
				staticBool = true;
			case "false":
				break;
			default:
				throw new IllegalArgumentException("have possible Illegal static attribute value : " + isStatic);
		}
		return new Method(value.replaceAll(" ",""), visibility, staticBool);
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
		
		result = `${this.visibility} `;
		if(Boolean(this.isStatic)){
			result += `static `;
		}

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
		result += ` : ${returnType}{\n`;

		if(result.length > 80){
			result = result.replace("(","(\n\t");
			result = result.replaceAll(", ","\n\t, ");
			result = result.replace(")","\n)");
		}

		result += "}"

		return result;

	}
	
}