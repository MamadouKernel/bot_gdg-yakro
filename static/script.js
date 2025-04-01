document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("send-btn").addEventListener("click", sendMessage);
    document.getElementById("user-input").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});

function sendMessage() {
    let userInput = document.getElementById("user-input").value.trim();
    if (userInput === "") return;

    let chatBox = document.getElementById("chat-box");

    // Ajouter le message utilisateur
    let userMessage = document.createElement("div");
    userMessage.className = "user-message";
    userMessage.textContent = userInput;
    chatBox.appendChild(userMessage);

    document.getElementById("user-input").value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // Ajouter une indication "Le bot écrit..."
    let botTyping = document.createElement("div");
    botTyping.className = "bot-message typing";
    botTyping.textContent = "Le bot écrit...";
    chatBox.appendChild(botTyping);

    fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        chatBox.removeChild(botTyping);
        let botMessage = document.createElement("div");
        botMessage.className = "bot-message";
        botMessage.textContent = "GDG-Yamoussoukro 🤖: " + data.response;
        chatBox.appendChild(botMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
        
    })
    .catch(error => {
        chatBox.removeChild(botTyping);
        console.error("Erreur:", error);
    });
}
