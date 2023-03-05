var reader = new FileReader()

function createBlob(data) {
    return new Blob([data], { type: "text/plain" });
}

function saveAs(content, fileName) {
    const a = document.createElement("a");
    const isBlob = content.toString().indexOf("Blob") > -1;
    let url = content;
    if (isBlob) {
        url = window.URL.createObjectURL(content);
    }
    a.href = url;
    a.download = fileName;
    a.click();
    if (isBlob) {
        window.URL.revokeObjectURL(url);
    }
}

function download() {
    if (getReserved().length > 0) {
        try {
            const file = createBlob(getReserved())
            saveAs(file, prompt("Enter name of file") + ".cad")
        } catch (e) { output.innerHTML = e }
    } else {
        output.innerHTML = "Can not save empty file"
    }
}

saveButton.onclick = download

reader.onload = function () {
    loadReserved(reader.result)
}

loadButton.onclick = function () {
    if (loadFiles.files[0].name.endsWith(".cad")) {
        reader.readAsText(loadFiles.files[0])
    } else {
        output.innerHTML = `Only files with extansion "cad" can be readen`
    }
}