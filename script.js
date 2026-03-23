const chatDiv = document.getElementById("chat");
const userInput = document.getElementById("userInput");

function appendMessage(sender, text) {
    chatDiv.innerHTML += `<b>${sender}:</b> ${text}<br>`;
    chatDiv.scrollTop = chatDiv.scrollHeight;
}

function sendMsg() {
    const msg = userInput.value;
    if(msg.trim() === "") return;
    appendMessage("You", msg);
    userInput.value = "";

    fetch("/get", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({msg: msg})
    })
    .then(response => response.json())
    .then(data => appendMessage("Bot", data.answer));
}

userInput.addEventListener("keypress", function(e) {
    if(e.key === "Enter") sendMsg();
});