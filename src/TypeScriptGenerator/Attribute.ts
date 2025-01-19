export class Attribute{
    private name : string;
    private type : string;
    private access : string;
    private isStatic : boolean;
    private readonly format:string;
    private attrStr : string;
    private constructor(
        name : string
        ,type : string
        ,access : string
        ,isStatic : boolean
        ,result : string
    ){
        this.name = name;
        this.type = type;
        this.access = access;
        this.isStatic = isStatic;
        this.attrStr = "";
        // 変数フォーマット
        // public static test : int
        this.format = "%s %s %s : %s"
    }

    private executeFormat(...args:object[]) : string{
        let result = "";
        args.forEach((value : object)=>{
            let work = this.format;
            let searchIndex : number = 0;
            
        })
    }

    public static createInstance(value:string, visibility:string) : Attribute{
        let access : string = visibility;

    }

    private parse(value : string){

    }


}