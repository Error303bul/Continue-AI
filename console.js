function getReserved() {
    var toReturn = ""
    for (let i in reservedWords) toReturn += "{" + reservedWords[i].word + "|" + reservedWords[i].popularity + "|" + "[" + reservedWords[i].useBefore.toString() + "]" + "|" + "[" + reservedWords[i].useAfter.toString() + "]" + "}" + (i == reservedWords.length - 1 ? "." : ";")
    return toReturn
}

function loadReserved(string) {
    reservedWords = []
    const objects = []
    let value = ""
    for (let i in string) {
        if (string[i] == "." || string[i] == ";") {
            if (value != "") {
                objects.push(value)
            }
            value = ""
        } else {
            value += string[i]
        }
    }
    if (value != "") {
        objects.push(value)
    }
    value = ""
    for (let j in objects) {
        objects[j] = objects[j].slice(1, objects[j].length - 1)
        const specialValues = objects[j].split("|")
        const appearWord = new Word(specialValues[0])
        appearWord.popularity = Number(specialValues[1])
        const useBeforeString = specialValues[2].slice(1, specialValues[2].length - 1)
        value = ""
        for (let n in useBeforeString) {
            if (useBeforeString[n] == ",") {
                if (value != "") {
                    appearWord.useBefore.push(value)
                }else{
                }
                value = ""
            } else {
                value += useBeforeString[n]
            }
            
        }
        if (value != "") {
            appearWord.useBefore.push(value)
        }
        value = ""
        const useAfterString = specialValues[3].slice(1, specialValues[3].length - 1)
        value = ""
        for (let n in useAfterString) {
            if (useAfterString[n] == ",") {
                if (value!="") {
                    appearWord.useAfter.push(value)
                }else{

                }
                value = ""
            } else {
                value += useAfterString[n]
            }
        }
        if (value.length > 0) {
            appearWord.useAfter.push(value)
        }
        value = ""
        reservedWords.push(appearWord)
    }
}