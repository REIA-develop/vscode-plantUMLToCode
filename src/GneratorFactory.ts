import { XMLParser } from "../node_modules/fast-xml-parser/src/fxp";
import { IGenerator } from "./IGenerator";
import { TypeScriptGenerator } from "./TypeScriptGenerator/TypeScriptGenerator";
import * as vscode from 'vscode';
import { IllegalArgumentException } from "./IllegalArgumentException";
export class GeneratorFactory{
    private static readonly SUPPORT : Array<string> = [
        "TypeScript"
    ];
    private readonly GENERATOR : Array<any> = [
        TypeScriptGenerator.createInstance

    ];
    private readonly xmiContent : string;
    private readonly classDiagram : string;
    private readonly parser  : XMLParser;
    private readonly saveDir : vscode.Uri;
    private readonly selectedIndex : number;
    private constructor(
        xmiContent : string
        ,classDiagram : string
        ,parser : XMLParser
        ,saveDir : vscode.Uri
        ,selectedIndex : number
    ){
        

        this.xmiContent = xmiContent;
        this.parser = parser;
        this.saveDir = saveDir;
        this.selectedIndex = selectedIndex;
        this.classDiagram = classDiagram;
    }
    public static getSupport() : Array<string>{
        return GeneratorFactory.SUPPORT;
    }
    public static createInstance(
        selected : string
        ,xmiContent : string
        , classDiagram : string
        ,parser : XMLParser
        ,saveDir : vscode.Uri
    ) : GeneratorFactory{
        if(!(GeneratorFactory.SUPPORT.includes(selected))){
            throw new IllegalArgumentException(selected + " is not Supported");
        }
        return new GeneratorFactory(
            xmiContent
            ,classDiagram
            ,parser
            ,saveDir
            ,GeneratorFactory.SUPPORT.indexOf(selected)
        )
    }
    public getGenerator() : IGenerator{
        return this.GENERATOR[this.selectedIndex](
            this.xmiContent
            ,this.classDiagram
            ,this.parser
            ,this.saveDir
        );
    }
}