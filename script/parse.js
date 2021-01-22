function parseSerials(rawText) {
    const regexpMerakiSerial = /\w{4}-\w{4}-\w{4}/g;  
    var result = rawText.match(regexpMerakiSerial);
    
    if(result==null) {
        return null;
    }
    
    var serials = [];
    for (i=0;i<result.length;i++){
        serials.push(result[i].toUpperCase());
    }
    
    return serials;
}

function log(entry) {    
    const logWindow = document.getElementById("divLogWindow");
    const lineBreak = document.createElement("br");
    
    var textNode = document.createTextNode(entry);
    logWindow.appendChild(textNode);
    logWindow.appendChild(lineBreak);
    
    //wait for elements to be appended and scroll log window to last item
    window.setTimeout(function() {  
        var elem = document.getElementById("divLogWindow");
        elem.scrollTop = elem.scrollHeight;
    }, 50);
}

function process() { 
    const   output  = document.getElementById("divOutput");
    const   input   = document.getElementById("textareaSerialsBox");
    var     serials = parseSerials(input.value);
    
    if (serials==null) {
        log("ERROR: Text contains no Meraki device serial numbers")
        output.innerHTML = "";
    }
    else {
        log("Found " + serials.length.toString() + " serial number" + (serials.length == 1 ? "" : "s"))
        for (i=0;i<serials.length;i++) {
            var textNode    = document.createTextNode(serials[i]);
            var lineBreak   = document.createElement("br");
            output.appendChild(textNode);
            output.appendChild(lineBreak);
        }
    }     
}

function copyToClipboard() {
    var elm = document.getElementById("divOutput");
    
    // for Internet Explorer
    if(document.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(elm);
        range.select();
        document.execCommand("Copy");
        log("Copied serial numbers to clipboard");
    }
    else if(window.getSelection) {
        // other browsers

        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(elm);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand("Copy");
        log("Copied serial numbers to clipboard");
    }
}