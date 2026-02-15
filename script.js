const API_URL = "https://mintai-backend.vercel.app/api/chat";

async function sendMessage() {

  let input = document.getElementById("userInput");
  let chat = document.getElementById("chatBox");
  let msg = input.value.trim();

  if(msg === "") return;

  // user message
  chat.innerHTML += `<div class="user-msg">${msg}</div>`;
  input.value="";
  chat.scrollTop = chat.scrollHeight;

  // typing dots
  chat.innerHTML += `
  <div id="typing" class="typing">
    <span></span><span></span><span></span>
  </div>`;
  chat.scrollTop = chat.scrollHeight;

  try {

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({ message: msg })
    });

    const data = await res.json();

    document.getElementById("typing").remove();

   let products = getProductLink(data.reply);

chat.innerHTML += `
<div class="bot-msg">
${data.reply}
<br><br>
🌿 Recommended Products:
<br>
${products}
<br><br>
<a href="store.html" class="buy-btn">View Products</a>
</div>`;

    chat.scrollTop = chat.scrollHeight;

  } catch(err){
    document.getElementById("typing").remove();
    chat.innerHTML += `<div class="bot-msg">Server error 😔</div>`;
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
