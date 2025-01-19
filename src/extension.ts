// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { X2jOptions, XMLParser } from '../node_modules/fast-xml-parser/src/fxp';
import { TypeScriptGenerator } from './TypeScriptGenerator/TypeScriptGenerator';
import { IGenerator } from './IGenerator';
import { GeneratorFactory } from './GneratorFactory';
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "plantumltocode" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('plantumltocode.generate', async () => {
		let file : vscode.Uri[] | undefined = await vscode.window.showOpenDialog(
			{
				title:"select xmi file"
				,canSelectFiles:true
				,canSelectMany:false
				,filters:{
					"Xmi File":["xmi"]
				}
				,defaultUri : vscode.workspace.workspaceFile
			}
		)
		if(file == undefined){
			return;
		}
		
		let saveDir : vscode.Uri[] | undefined = await vscode.window.showOpenDialog(
			{
				title:"select Save Directory"
				,canSelectFiles:false
				,canSelectMany:false
				,canSelectFolders : true
				,defaultUri : vscode.workspace.workspaceFile
			}
		)
		if(saveDir == undefined){
			return;
		}

		
		let options : X2jOptions={
			ignoreDeclaration: true
			,ignoreAttributes : false
			
		}
		
		let parser : XMLParser = new XMLParser(options)
		let contentArray : Uint8Array = await vscode.workspace.fs.readFile(file[0])
		let xmiContent : string = new TextDecoder().decode(contentArray);
		let opt : vscode.QuickPickOptions = {
			canPickMany : false
			,title : "Language for the generate"
			,placeHolder : "Language for the generate"
		}
		let selected :string | undefined = await vscode.window.showQuickPick(GeneratorFactory.getSupport(),opt)
		if(selected == undefined){
			return;
		}
		let generateFactory : GeneratorFactory = GeneratorFactory.createInstance(
			selected
			,xmiContent
			,parser
			,saveDir[0]
		)
		
		let generator : IGenerator = generateFactory.getGenerator();
		let message = generator.generateCode();
		vscode.window.showInformationMessage(message);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
