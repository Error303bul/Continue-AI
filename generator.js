enter.onclick = function () {
    if (ask.value != "") output.innerHTML = continueReplic(ask.value)
}

function continueReplic(string) {
    const wordsInSentece = analiseWords(string)
    for (let i in wordsInSentece) {
        let found = false
        for (let j in reservedWords) {
            if (reservedWords[j].word == wordsInSentece[i]) {
                found = true
                break
            }
        }
        if (!found) {
            return "\\I don`t understand word " + wordsInSentece[i]
        }
    }
    let continued = ""

    while (true) {
        var continueWord = false
        const checkRepeation = function (length, word) {
            for (let i = 1; i <= length; i++) {
                if (wordsInSentece[wordsInSentece.length - i - 1] == word) return false
            }
            return true
        }
        for (let i in reservedWords) {
            if (checkRepeation(Math.floor(wordsInSentece.length / 5) + Math.ceil(reservedWords[i].popularity / 5) + 5, reservedWords[i].word) && (reservedWords[i].useAfter.indexOf(wordsInSentece[wordsInSentece.length - 1]) > -1) && ((reservedWords[i].popularity > continueWord.popularity) || (continueWord === false))) continueWord = reservedWords[i]
        }
        if (continueWord !== false) {
            continued += " " + continueWord.word
            wordsInSentece.push(continueWord.word)
            for (let i in continueWord.useBefore) {
                if (checkRepeation(2 + Math.floor(wordsInSentece.length / 2),continueWord.useBefore[i])) {
                    continued += " " + continueWord.useBefore[i]
                    wordsInSentece.push(continueWord.useBefore[i])
                    break
                }
            }
        } else {
            break;
        }
    }
    return string + continued + '.'
}