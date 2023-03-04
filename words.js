var reservedWords = []
var alphabet = []
premadeAlphabet("abcdefghijklmnopqrstuvwxyz")
premadeAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
/*premadeAlphabet("абвгдеёжзиклмнопрстуфхцчшщъыьэюя")
premadeAlphabet("АБВГДЕЁЖЗИКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ")*/
premadeAlphabet("`@#$&")
class Word {
    word = ""
    popularity = 0
    useBefore = []
    useAfter = []

    constructor(word) {
        this.word = word
        this.popularity = 1;
    }
}

function premadeAlphabet(string = "") {
    for (let i in string) if (alphabet.indexOf(string[i]) == -1) alphabet.push(string[i])
}

function analiseWords(sentence) {
    let splitted = []
    var value = ""
    for (let i in sentence) {
        if (alphabet.indexOf(sentence[i]) > -1) {
            value += sentence[i]
        } else {
            if (value.length > 0) {
                splitted.push(value.toLowerCase())
                value = ""
            }
        }
    }
    if (value.length > 0) {
        splitted.push(value.toLowerCase())
        value = ""
    }
    return splitted
}


function load(sentence) {
    var splitted = analiseWords(sentence)
    for (let i in splitted) {
        var previousWord = (i > 0 ? splitted[i - 1] : "")
        var newWord = true
        var nextWord = ((i < splitted.length - 1) ? splitted[Number(i) + 1] : "")
        if (reservedWords.length > 0) {
            for (let j in reservedWords) {
                if (reservedWords[j].word == splitted[i]) {
                    reservedWords[j].popularity++;
                    newWord = false;
                    if (previousWord.length>0) reservedWords[j].useAfter.push(previousWord)
                    if (nextWord.length>0) reservedWords[j].useBefore.push(nextWord)
                    break;
                }
            }
        }
        if (newWord) {
            const appearWord = new Word(splitted[i])
            if (previousWord != "") appearWord.useAfter.push(previousWord)
            if (nextWord != "") appearWord.useBefore.push(nextWord)
            reservedWords.push(appearWord)
        }
    }
}

post.onclick = function () {
    if (words.value.length > 0) {
        load(words.value)
        words.value = ""
    }
}