

export class FileContent{
    private name : string;
    private content : Uint8Array;
    private constructor(name:string, content:Uint8Array){
        this.name = name;
        this.content = content;
    }
    public static createInstance(name:string, content:string){
        let arrayContent : Uint8Array = new TextEncoder().encode(content);
        return new FileContent(name,arrayContent);
    }
    public getName() : string{
        return this.name;
    }

    public getContent() : Uint8Array{
        return this.content;
    }
}