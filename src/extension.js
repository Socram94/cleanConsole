// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */

const handleLanguages = {
	'javascript': /console.log\([^\s]+\)?/g,
	'typescript': /console.log\([^\s]+\)?/g,
	'c': /printf\([^\s]+\)?/g,
	'cpp': /printf\([^\s]+\)?/g,
	'csharp': /Console.WriteLine\([^\s]+\)?/g,
	'java': /System.out.println\([^\s]+\)?/g,
	'php': /echo [^\s]+\)?/g,
	'python': /print\([^\s]+\)?/g,
	'ruby': /puts\([^\s]+\)?/g,
	'go': /fmt.Println\([^\s]+\)?/g,
	'rust': /println\([^\s]+\)?/g,
	'perl': /print\([^\s]+\)?/g,
	'lua': /print\([^\s]+\)?/g,
	'powershell': /Write-Host\([^\s]+\)?/g, // à vérifier
	'fsharp': /printfn\([^\s]+\)?/g, 
	'kotlin': /println\([^\s]+\)?/g,
	'objective-c': /NSLog\([^\s]+\)?/g,
	'objective-cpp': /NSLog\([^\s]+\)?/g,
	'coffeescript': /console.log\([^\s]+\)?/g,
	'clojure': /println\([^\s]+\)?/g,
	'elixir': /IO.puts\([^\s]+\)?/g,
	'elm': /Debug.log\([^\s]+\)?/g,
	'groovy': /println\([^\s]+\)?/g,
	'haskell': /putStrLn\([^\s]+\)?/g,
	'julia': /println\([^\s]+\)?/g,
	'ocaml': /print_endline\([^\s]+\)?/g,
	'r': /print\([^\s]+\)?/g,
	'scala': /println\([^\s]+\)?/g,
	'swift': /print\([^\s]+\)?/g,
	'vba': /Debug.Print\([^\s]+\)?/g,
	'vbnet': /Console.WriteLine\([^\s]+\)?/g,
	'xquery': /trace\([^\s]+\)?/g,
}

let doc = vscode.window.activeTextEditor.document

function activate(context) {

	let disposable = vscode.commands.registerCommand('cleanconsole.cleanConsole', function () {
	
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
		} else {
			vscode.window.showErrorMessage(" Language not supported yet")
		}
	});

	context.subscriptions.push(disposable);
}

function deleteLine(lineNumber) {
		vscode.window.activeTextEditor.edit(editBuilder => {
			// foreach line in array delete the line
			for(let i = 0; i < lineNumber.length; i++){
				i == 0 && lineNumber[i] == 0 ? editBuilder.delete(new vscode.Range(lineNumber[i], 0, lineNumber[i], 1000)) : editBuilder.delete(new vscode.Range(lineNumber[i] - 1, 1000, lineNumber[i], 1000));
			}
		})
		.then(success => {
			if (success) {
				vscode.window.showInformationMessage("Succeffully deleted");
			} else {
				vscode.window.showInformationMessage("An error occured");
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
	vscode.window.showInformationMessage("line " + doc.lineCount + " contains log");
	for (let i = 0; i < doc.lineCount; i++) {
		if(regex.test(doc.lineAt(i).text)){
			positionArray.push(i);
			// i-- is indispensable to avoid skipping a line
			i--;
		}
	}
	return positionArray;
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}

