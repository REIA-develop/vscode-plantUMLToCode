import * as vscode from 'vscode';
import { IGenerator } from '../IGenerator';
import { IllegalArgumentException } from '../IllegalArgumentException';
export class TypeScriptGenerator implements IGenerator{
    private classList : Array<string>;

    private constructor(filePath:string){
        this.filePath = filePath;
    }
    
    /**
     * 
     */
    private static readXML() : TypeScriptGenerator{
        /*
            最終的な構造
            {
                "class名":{
                    属性 : {
                        名前 : string
                        ,型 : string
                        ,アクセサ : string
                        ,isStatic : boolean
                    }
                    メソッド : {
                        名前 : string
                        戻り値型 : string
                        アクセサ : string
                        isStatic : boolean
                        引数 : List<属性>
                    }
                }
            }
        */

    }

    public generateCode(): string {
        throw new Error('Method not implemented.');
    }

    public static createInstance(filePath:string) : TypeScriptGenerator{
        if(!(filePath.endsWith(".xml"))){
            throw new IllegalArgumentException(
                "\"{filePath}\" is not XML file.".replace("{filePath}",filePath)
            );
        }
        return new TypeScriptGenerator(filePath);
    }

}