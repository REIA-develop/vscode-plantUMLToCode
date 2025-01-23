import { IllegalArgumentException } from "../IllegalArgumentException";
import { ISourceElement } from "../ISourceElement";

export class Attribute implements ISourceElement{
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



	public static createInstance(value:string, visibility:string, isStatic : string) : Attribute{
		let staticBool : boolean = false;
		switch(isStatic.toLowerCase()){
			case "true":
				staticBool = true;
			case "false":
				break;
			default:
				throw new IllegalArgumentException("have possible Illegal static attribute value : " + isStatic);
		}
		return new Attribute(value.replaceAll(" ",""), visibility, staticBool);
	}

	public parse() : string{
		let result = "";
		/* "REFFERER_URL : String" */
		let [name, type] = this.value.split(":");
		result = `${this.visibility} `;
		

		if(Boolean(this.isStatic)){
			result += `static `;
		}
		
		result += `${name} : ${type};`;
		return result;

	}

}