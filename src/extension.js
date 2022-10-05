// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const mylib = require('./lib.js');

/**
 * @param {vscode.ExtensionContext} context
 */

// Current handle languages
const handleLanguages = {
	"javascript": /console.[^\s]+\([^\s]+\)?/g,
	"typescript": /console.[^\s]+\([^\s]+\)?/g,
	"c": /printf\([^\s]+\)?/g,
	"cpp": /printf\([^\s]+\)?/g,
	"csharp": /Console.[^\s]+\([^\s]+\)?/g,
	"java": /System.out.println\([^\s]+\)?/g,
	"php": /echo [^\s]+\)?/g,
	"python": /print\([^\s]+\)?/g,
	"ruby": /puts\([^\s]+\)?/g,
	"go": /fmt.Println\([^\s]+\)?/g,
	"rust": /println.?\([^\s]+\)?/g, 
	"perl": /print\([^\s]+\)?/g,
	"lua": /print\([^\s]+\)?/g,
	"fsharp": /printfn\([^\s]+\)?/g, 
	"kotlin": /println\([^\s]+\)?/g,
	"objective-c": /NSLog\([^\s]+\)?/g,
	"objective-cpp": /NSLog\([^\s]+\)?/g,
	"coffeescript": /console.log\([^\s]+\)?/g,
	"clojure": /println\([^\s]+\)?/g,
	"elixir": /IO.puts\([^\s]+\)?/g,
	"elm": /Debug.log\([^\s]+\)?/g,
	"groovy": /println\([^\s]+\)?/g,
	"haskell": /putStrLn\([^\s]+\)?/g,
	"julia": /println\([^\s]+\)?/g,
	"ocaml": /print_endline\([^\s]+\)?/g,
	"r": /print\([^\s]+\)?/g,
	"scala": /println\([^\s]+\)?/g,
	"swift": /print\([^\s]+\)?/g,
	"visual basic": /Debug.Print\([^\s]+\)?/g,
	"vbnet": /Console.WriteLine\([^\s]+\)?/g,
	"xquery": /trace\([^\s]+\)?/g,
}

function activate(context) {

	let disposable = vscode.commands.registerCommand('cleanconsole.cleanConsole', function () {
	
		// Verify if the language is supported
		if(!mylib.isLanguageSupported(handleLanguages)){
			vscode.window.showErrorMessage(" Language not supported yet")
			return
		}
		// Get the array of lines index that contain the log keyword
		let lineToDelete = mylib.getLogLine();
		// if the array is not empty, delete the lines
		if(lineToDelete.length > 0){
			mylib.deleteLine(lineToDelete);
		} else {
			vscode.window.showErrorMessage(" Nothing to delete");
		}

	});

	let Sdisposable = vscode.commands.registerCommand('cleanconsole.cleanConsoleList', function () {
	
		// Verify if the language is supported
		if(!mylib.isLanguageSupported(handleLanguages)){
			// Get the array of lines index that contain the log keyword
			vscode.window.showErrorMessage(" Language not supported yet");
			return;
		}
		let lineCount = mylib.getLogLine();
		if(lineCount.length > 0){
			vscode.window.showInformationMessage("Number of log lines : " + lineCount.length);
		} else {
			vscode.window.showErrorMessage(" Nothing to delete");
		}
		

	});
	
	context.subscriptions.push([disposable, Sdisposable]);
}


module.exports = {
	activate
}
