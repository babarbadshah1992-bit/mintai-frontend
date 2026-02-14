function toggleMenu(){
    document.getElementById("navLinks").classList.toggle("active");
}
const API_URL = "https://mintai-backend.vercel.app/api/chat";

async function sendMessage(){

    let input = document.getElementById("userInput");
    let chatBox = document.getElementById("chatBox");
    let typing = document.getElementById("typing");

    let msg = input.value.trim();
    if(!msg) return;

    chatBox.innerHTML += `<div class="user-msg">${msg}</div>`;
    input.value = "";

    typing.style.display="block";

    const res = await fetch(API_URL,{
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({message:msg})
    });

    const data = await res.json();

    typing.style.display="none";

    chatBox.innerHTML += `<div class="bot-msg">${data.reply}</div>`;

    showProducts();
}

function showProducts(){
    let chatBox = document.getElementById("chatBox");

    chatBox.innerHTML += `
        <div class="bot-msg">
            🌿 Recommended Products:
            <br><br>
            <a href="store.html" class="buy-btn">View Products</a>
        </div>
    `;
}
