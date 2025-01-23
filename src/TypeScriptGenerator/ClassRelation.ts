import { IClassRelation } from "../IClassRelation"
/**
 * クラスの継承文字列と実装文字列を取得する
 */
export class ClassRelation implements IClassRelation{
    private readonly extendsClass : string;
    private readonly implementsClass : string;
    private readonly implementsList : Array<string>
    
    private constructor(
        extendsClass : string
        ,implementsClass : string
        ,implementsList : Array<string>
    ){
        this.extendsClass = extendsClass;
        this.implementsClass = implementsClass;
        this.implementsList = implementsList;
    }
    public getImplements(): Array<string> {
        return this.implementsList;
    }
    public static createInstance(extendsClass : string, implementsClass : Array<string>) : ClassRelation{
        let workExtends = "";
        if(extendsClass.length != 0){
            workExtends = " extends " + extendsClass;
        }

        let workImplements = "";
        if(implementsClass.length != 0){
            workImplements = " implements " + implementsClass.join(", ");
        }

        return new ClassRelation(workExtends, workImplements,implementsClass);
    }
    public getImplementsString(): string {
        return this.implementsClass;
        
    }
    public getExtendsString(): string {
        return this.extendsClass;
        
    }

}