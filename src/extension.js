// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const { window, commands } = require('vscode');
const { isLanguageSupported, deleteLine, getLogLine } = require('./lib.js');

/**
 * @param {vscode.ExtensionContext} context
 */


function activate(context) {

	let disposable = commands.registerCommand('cleanconsole.cleanConsole', function () {
	
		// Verify if the language is supported
		if(!isLanguageSupported()){
			window.showErrorMessage(" Language not supported yet")
			return
		}
		// Get the array of lines index that contain the log keyword
		let lineToDelete = getLogLine();
		// if the array is not empty, delete the lines
		if(lineToDelete.length > 0){
			deleteLine(lineToDelete);
		} else {
			window.showErrorMessage(" Nothing to delete");
		}

	});

	let Sdisposable = commands.registerCommand('cleanconsole.cleanConsoleList', function () {
	
		// Verify if the language is supported
		if(!isLanguageSupported()){
			// Get the array of lines index that contain the log keyword
			window.showErrorMessage(" Language not supported yet");
			return;
		}
		let lineCount = getLogLine();
		if(lineCount.length > 0){
			window.showInformationMessage("Number of log lines : " + lineCount.length);
		} else {
			window.showErrorMessage(" Nothing to delete");
		}
		

	});
	
	context.subscriptions.push([disposable, Sdisposable]);
}


module.exports = {
	activate
}

