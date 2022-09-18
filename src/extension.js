// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');


/**
 * @param {vscode.ExtensionContext} context
 */

let doc = vscode.window.activeTextEditor.document

function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "cleanconsole" is now active!');

	
	let disposable = vscode.commands.registerCommand('cleanconsole.cleanConsole', function () {
		// The code you place here will be executed every time your command is executed
		let lineToDelete = getLogLine();
		deleteLine(lineToDelete);
		if(lineToDelete.length > 0){
			vscode.window.showInformationMessage("not empty");
		} else {
			vscode.window.showInformationMessage("empty");
		}
		// Display a message box to the user
		
		
	});

	context.subscriptions.push(disposable);
}

function deleteLine(lineNumber) {

		vscode.window.activeTextEditor.edit(editBuilder => {
			for(let i = 0; i < lineNumber.length; i++){
				editBuilder.delete(new vscode.Range(lineNumber[i], 0, lineNumber[i], 1000));
			}
		});
}

// Return an array of lines that contain the log keyword
function getLogLine() {
	let positionArray = [];
	let regex = new RegExp(/console.log\([^\s]+\)?/g);
	for (let i = 0; i < doc.lineCount; i++) {
		if(regex.test(doc.lineAt(i).text)){
			positionArray.push(i);
		}
	}
	return positionArray;
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}

