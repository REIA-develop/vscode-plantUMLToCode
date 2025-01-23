import { IllegalArgumentException } from "../IllegalArgumentException";
import { ISourceElement } from "../ISourceElement";

/**
 * インターフェースに追加するメソッド群
 * 通常のメソッドと異なり、{}が不要であるため実装
 */
export class AbstructMethod implements ISourceElement{
	private value : string;
	private argsMatch : RegExpMatchArray
	private constructor(
		value : string
		,argsMatch : RegExpMatchArray
	){
		this.value = value;
		this.argsMatch = argsMatch;
		
	}
	/**
	 * インスタンスを生成する
	 * @param {string} value xmiのvalueの中身
	 * @returns 
	 */
	public static createInstance(value:string) : AbstructMethod{
		let valueSpaceDelete : string = value.replaceAll(" ","");
		let argsTemp : RegExpMatchArray | null = valueSpaceDelete.match(/\(.*\)/);
		if(argsTemp == null){
			throw new IllegalArgumentException(
				`${value} is Illegal Value.(not Found block of Args)`
			);
		}
		return new AbstructMethod(valueSpaceDelete, argsTemp);
	}
	public parse() : string{
		let result = "";
		/* "REFFERER_URL : String" */
		
		let argStr : string = "";
		argStr = this.argsMatch[0];
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