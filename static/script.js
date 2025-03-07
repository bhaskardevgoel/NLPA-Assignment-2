function translateText() {
    let text = document.getElementById("english_text").value.trim();
    let targetLanguage = document.getElementById("target_language").value;

    if (!text) {
        alert("Please enter some text to translate.");
        return;
    }

    fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ "english_text": text, "target_language": targetLanguage })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            document.getElementById("translated_text").innerText = data.translated_text;
        }
    })
    .catch(error => console.error("Error:", error));
}

function copyText() {
    let translatedText = document.getElementById("translated_text").innerText;
    if (!translatedText) {
        alert("No translated text available to copy.");
        return;
    }
    navigator.clipboard.writeText(translatedText).then(() => {
        alert("Translated text copied to clipboard!");
    }).catch(err => console.error("Failed to copy text: ", err));
}

function downloadText() {
    let translatedText = document.getElementById("translated_text").innerText;
    if (!translatedText) {
        alert("No translated text available to download.");
        return;
    }
    let blob = new Blob([translatedText], { type: "text/plain" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "translated_text.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
