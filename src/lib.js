const vscode = require('vscode');


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
};


function deleteLine(lineNumber) {
    vscode.window.activeTextEditor.edit(editBuilder => {
        // foreach line in array delete the line
        for(let i = 0; i < lineNumber.length; i++){
            // ternaire to avoid blank space
            i == 0 && lineNumber[i] == 0 ? editBuilder.delete(new vscode.Range(lineNumber[i] + 1, 0, lineNumber[i], 0)) : editBuilder.delete(new vscode.Range(lineNumber[i] - 1, 1000, lineNumber[i], 1000));
        }
    })
    .then(success => {
        if (success) {
            // pretty weird bug, without code the extension doesn't work (here console.log)
            console.log();
        } else {
            vscode.window.showInformationMessage("An error occured");
        }
    });
}

// Return a true if the current language is supported
function isLanguageSupported(handleLanguages) {
    let doc = vscode.window.activeTextEditor.document
    if(handleLanguages[doc.languageId] !== undefined){
        return true;
    }
    return false;
}

// Return an array of lines that contain the log keyword
function getLogLine() {
    let doc = vscode.window.activeTextEditor.document
    let positionArray = [];
    let regex = handleLanguages[doc.languageId];
    // verify each line of th current document
    for (let i = 0; i < doc.lineCount; i++) {
        if(regex.test(doc.lineAt(i).text)){
            positionArray.push(i);
            // i-- use to avoid skipping a line
            i--;
        }
    }
    return positionArray;
}

module.exports = {
    deleteLine,
    isLanguageSupported,
    getLogLine
}