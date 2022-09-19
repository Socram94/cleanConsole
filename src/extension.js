// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');


/**
 * @param {vscode.ExtensionContext} context
 */

const handleLanguages = {
	'javascript': /console.log\([^\s]+\)?/g,
	'c': /printf\(.+\)?/g,
}

let doc = vscode.window.activeTextEditor.document

function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "cleanconsole" is now active!');

	
	let disposable = vscode.commands.registerCommand('cleanconsole.cleanConsole', function () {
		// Get the current language to update the regex
		vscode.window.showInformationMessage(vscode.window.activeTextEditor.document.languageId);
		
		// Verify if the language is supported
		if(isLanguageSupported(handleLanguages)){
			// Get the array of lines index that contain the log keyword
			let lineToDelete = getLogLine();
			// if the array is not empty, delete the lines
			if(lineToDelete.length > 0){
				deleteLine(lineToDelete);
			} else {
				vscode.window.showErrorMessage(" Nothing to delete");
			}
		} else [
			vscode.window.showErrorMessage(" Language not supported yet")
		]

		
		
	});

	context.subscriptions.push(disposable);
}

function deleteLine(lineNumber) {
		vscode.window.activeTextEditor.edit(editBuilder => {
			// foreach line in array delete the line
			for(let i = 0; i < lineNumber.length; i++){
				editBuilder.delete(new vscode.Range(lineNumber[i], 0, lineNumber[i], 1000));
			}
		})
		.then(success => {
			if (success) {
				vscode.window.showInformationMessage(" Succefully deleted");
			} else {
				vscode.window.showInformationMessage(" Failed");
			}
		});
}

function isLanguageSupported(handleLanguages) {
	if(handleLanguages[doc.languageId] !== undefined){
		return true;
	}
	return false;
}

// Return an array of lines that contain the log keyword
function getLogLine() {
	let positionArray = [];
	let regex = handleLanguages[doc.languageId];
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

