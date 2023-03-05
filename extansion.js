const extansionReader=new FileReader()

extansionReader.onload=function(){
    const text=extansionReader.result
    const values=text.split("\n")
    premadeAlphabet(values[2])
}

function loadExtension() {
    if (extansionFiles.files[0].name.endsWith(".cae")) {
        extansionReader.readAsText(extansionFiles.files[0])
    } else {
        output.innerHTML = '\\Can read files with only "cae" extansion'
    }
}