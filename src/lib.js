const { window, Range } = require('vscode');
const { handleLanguages } = require('./config.js');

function deleteLine(lineNumber) {
    window.activeTextEditor.edit(editBuilder => {
        // foreach line in array delete the line
        for(let i = 0; i < lineNumber.length; i++){
            // ternaire to avoid blank space
            i == 0 && lineNumber[i] == 0 ? editBuilder.delete(new Range(lineNumber[i] + 1, 0, lineNumber[i], 0)) : editBuilder.delete(new Range(lineNumber[i] - 1, 1000, lineNumber[i], 1000));
        }
    })
    .then(success => {
        if (success) {
            // pretty weird bug, without code the extension doesn't work (here console.log)
            console.log();
        } else {
            window.showInformationMessage("An error occured");
        }
    });
}

// Return a true if the current language is supported
function isLanguageSupported() {
    let doc = window.activeTextEditor.document
    if(handleLanguages[doc.languageId] !== undefined){
        return true;
    }
    return false;
}

// Return an array of lines that contain the log keyword
function getLogLine() {
    let doc = window.activeTextEditor.document
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
