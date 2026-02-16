const API_URL = "https://mintai-backend.vercel.app/api/chat";

async function sendMessage() {

  const input = document.getElementById("userInput");
  const chat = document.getElementById("chatBox");
  let msg = input.value.trim();
  if(msg === "") return;

  // USER MESSAGE
  chat.innerHTML += `<div class="user-msg">${msg}</div>`;
  input.value = "";

  // Scroll to user message (IMPORTANT)
  
chat.scrollTop = chat.scrollHeight;

},100);

  // Typing dots show
  chat.innerHTML += `
    <div id="typing" class="typing">
      <span></span><span></span><span></span>
    </div>`;

  try {

    const res = await fetch(API_URL,{
      method:"POST",
      headers:{ "Content-Type":"application/json"},
      body: JSON.stringify({message:msg})
    });

    const data = await res.json();

    // remove typing
    document.getElementById("typing").remove();

    // BOT MESSAGE
    chat.innerHTML += `
      <div class="bot-msg">
        <b>${msg}</b><br><br>
        ${data.reply}
        <br><br>
        <a href="store.html" class="buy-btn">View Products</a>
      </div>
    `;
    /* Scroll to BOT message (ChatGPT style) */
setTimeout(() => {
  const allBots = document.querySelectorAll(".bot-msg");
const lastBot = allBots[allBots.length - 1];

chat.scrollTop = chat.scrollHeight;   // ⭐ ADD THIS

lastBot.scrollIntoView({
  behavior: "smooth",
  block: "start"
});
}, 200);

    // ⭐⭐⭐ MAIN MAGIC SCROLL ⭐⭐⭐
    setTimeout(()=>{
      chat.scrollTop = chat.scrollHeight;
    },200);

  } catch(err){

    document.getElementById("typing").remove();
    chat.innerHTML += `<div class="bot-msg">Server error 😢</div>`;
  }
}
function toggleMenu() {
  let nav = document.getElementById("navLinks");
  nav.classList.toggle("active");
}
function getProductLink(text){

  text = text.toLowerCase();

  if(text.includes("hair") || text.includes("bald") || text.includes("dandruff")){
    return "WOW Onion Hair Oil, Mamaearth Shampoo";
  }

  if(text.includes("weight") || text.includes("fat") || text.includes("belly")){
    return "Fat Burner, Apple Cider Vinegar";
  }

  if(text.includes("skin") || text.includes("pimple") || text.includes("acne")){
    return "Vitamin C Serum, SPF50 Sunscreen";
  }

  if(text.includes("bp") || text.includes("blood pressure") || text.includes("sugar") || text.includes("diabetes")){
    return "Multivitamins, Herbal Supplements";
  }

  return "Top Ayurvedic Wellness Products";
}
