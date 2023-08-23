const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-btn');
const deleteButton = document.getElementById("delete-btn");

const chatContainer = document.querySelector(".chat-container");
chatContainer.classList.add("animate__animated", "animate__slideInRight");

const audioChat = new Audio("sound-chat/sound.wav");

let userText = null;

const API_KEY = "sk-Wk9AcY0Qat3nwBYTSTEsT3BlbkFJqRCiaea8UWwTCFzlOv8d";

const localDataFromLocalstorage = () => {

    const defaultText = `<div class="default-text">
                            <h1> LUNA AI </h1>
                            <p>Start your conversation with LUNA!</p>
                        </div>`
    
    chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
}

localDataFromLocalstorage();

const createElement = (html, className) => {
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML = html;
    chatDiv.classList.add("animate__animated", "animate__slideInRight");
    return chatDiv;
}

const getChatResponse = async (incomingChatDiv) => {

    const API_URL = "https://api.openai.com/v1/completions";
    const pElement = document.createElement("p");

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: userText,
            max_tokens: 2048,
            temperature: 0.5,
            n: 1,
            stop: null
        })
    };

    try {
        const response = await (await fetch(API_URL, requestOptions)).json();
        pElement.textContent = response.choices[0].text.trim();
        playSound();

    } catch(error) {
        pElement.classList.add("error");
        pElement.textContent = "Check your internet connection!";
    }

    incomingChatDiv.querySelector(".typing-animation").remove();
    incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
}

const playSound = () => {
    audioChat.play();
}

const copyResponse = (copyBtn) => {
    const responseTextElement = copyBtn.parentElement.querySelector("p");
    navigator.clipboard.writeText(responseTextElement.textContent);
    copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i>';
    setTimeout(() => {
        copyBtn.textContent = "";
    }, 1000);
}

const showTypingAnimation = () => {
    const html = 
            `<div class="chat-content">
                <div class="chat-details">
                    <img src="image-profile/IA/lunaai.png" alt="AI - ai">
                    <div class="typing-animation">
                        <div class="typing-dot" style="--delay: 0.1s"></div>
                        <div class="typing-dot" style="--delay: 0.3s"></div>
                        <div class="typing-dot" style="--delay: 0.4s"></div>
                    </div>
                </div>
                <span onclick = "copyResponse(this)" class="material-symbols-rounded">
                    <i class="fa-solid fa-copy"></i>
                </span>
            </div>`
    
    const incomingChatDiv = createElement(html, "incoming");
    chatContainer.appendChild(incomingChatDiv);
    getChatResponse(incomingChatDiv);
    playSound();
}

const handleOutgoingChat = () => {
    
    userText = chatInput.value.trim();
    if (!userText) return;

    const html = 
            `<div class="chat-content">
                <div class="chat-details">
                    <img src="image-profile/USER/user.jpg" alt="Saitama - User">
                    <p></p>
                </div>
            </div>`
    
    const outgoingChatDiv = createElement(html, "outgoing");
    outgoingChatDiv.querySelector("p").textContent = userText;
    document.querySelector(".default-text")?.remove();
    chatContainer.appendChild(outgoingChatDiv);

    setTimeout(showTypingAnimation, 500);

}

deleteButton.addEventListener("click", () => {
    if (confirm("Delete the entire conversation?")) {
        localStorage.removeItem("all-chats");
        localDataFromLocalstorage();
    }
});

sendButton.addEventListener("click", handleOutgoingChat);