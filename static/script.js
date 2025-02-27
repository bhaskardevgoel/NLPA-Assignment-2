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
