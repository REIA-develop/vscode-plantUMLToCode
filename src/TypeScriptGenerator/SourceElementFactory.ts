import { Attribute } from "./Attribute";
import { ClassStr } from "./ClassStr";
import { ISourceElement } from "../ISourceElement";
import { Method } from "./Method";
import { Interface } from "./Interface";
import { AbstructMethod } from "./AbstructMethod";
import { ClassRelation } from "./ClassRelation";
import { IClassRelation } from "../IClassRelation";
export class SourceElementFactory{
	public static Method(value:string, visibility:string, isStatic : string) : ISourceElement{
		return Method.createInstance(value,visibility,isStatic);
	}
	public static AbstructMethod(value:string) : ISourceElement{
		return AbstructMethod.createInstance(value);
	}
	public static Class(className : string, attributeList : Array<ISourceElement>,methodList : Array<ISourceElement>, classRelation : IClassRelation) : ISourceElement{
		return ClassStr.createInstance(className, attributeList, methodList, classRelation);
	}
	public static InterFace(className : string, abstructMethodList : Array<ISourceElement>) : ISourceElement{
		return Interface.createInstance(className, abstructMethodList);
	}
	public static Attr(value:string, visibility:string, isStatic : string) : ISourceElement{
		return Attribute.createInstance(value,visibility,isStatic);
	}

	public static ClassRelation(extendsClass : string, implementsClass : Array<string>) : IClassRelation{
		return ClassRelation.createInstance(extendsClass, implementsClass);
	}
}