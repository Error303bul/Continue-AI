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
    
    /*for (let count = 0; count < 200; count++)*/while(true) {
        var continueWord = false
        const checkRepeation=function(length, word){
        for(let i=1;i<=length;i++){
            if(wordsInSentece[wordsInSentece.length-i-1]==word) return false
        }
        return true
    }
        for (let i in reservedWords) {
            if (checkRepeation(Math.floor(wordsInSentece.length/5)+10, reservedWords[i].word)&&(reservedWords[i].useAfter.indexOf(wordsInSentece[wordsInSentece.length - 1]) > -1) && ((reservedWords[i].popularity > continueWord.popularity) || (continueWord === false))) continueWord = reservedWords[i]
        }
        if (continueWord !== false) {
            continued += continueWord.word+" "
            wordsInSentece.push(continueWord.word)
        } else {
            continued.slice(0,continued,length-1)
            break;
        }
    }
    return string + " " + continued
}