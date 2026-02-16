const API_URL = "https://mintai-backend.vercel.app/api/chat";

async function sendMessage() {

  const input = document.getElementById("userInput");
  const chat = document.getElementById("chatBox");

  let msg = input.value.trim();
  if(msg === "") return;

  // USER MESSAGE ADD
  chat.innerHTML += `<div class="user-msg">${msg}</div>`;
  input.value = "";

  // SCROLL TO USER MESSAGE (ChatGPT style)
  setTimeout(() => {
    chat.scrollTop = chat.scrollHeight;
  }, 100);

  // TYPING DOTS SHOW
  chat.innerHTML += `
  <div id="typing" class="typing">
    <span></span><span></span><span></span>
  </div>`;

  chat.scrollTop = chat.scrollHeight;

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg })
    });

    const data = await res.json();

    // REMOVE TYPING
    document.getElementById("typing").remove();

    // BOT MESSAGE ADD
    chat.innerHTML += `
      <div class="bot-msg">
      ${data.reply}
      <br><br>
      <a href="store.html" class="buy-btn">View Products</a>
      </div>`;

    // FINAL SCROLL (important)
    setTimeout(() => {
      chat.scrollTop = chat.scrollHeight;
    }, 100);

  } catch (error) {
    alert("API error");
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
