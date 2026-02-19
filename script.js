const API_URL = "https://mintai-backend.vercel.app/api/chat";

async function sendMessage() {

  const input = document.getElementById("userInput");
  const chat = document.getElementById("chatBox");

  let msg = input.value.trim();
  if(msg === "") return;

  // USER MESSAGE ADD
  chat.innerHTML += `<div class="user-msg">${msg}</div>`;
  input.value = "";
  
  // TYPING DOTS SHOW
  chat.innerHTML += `
  <div id="typing" class="typing">
    <span></span><span></span><span></span>
  </div>`;

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg })
    });

    const data = await res.json();

    // REMOVE TYPING
    document.getElementById("typing").remove();
    
// CLEAN REPLY (remove any code from response)
let cleanReply = data.reply
  .replace(/setTimeout[\s\S]*/g, "")   // remove scroll code
  .replace(/const lastMessage[\s\S]*/g, "")
  .replace(/chat\.lastElementChild[\s\S]*/g, "");

// BOT MESSAGE ADD (SAFE)
chat.innerHTML += `
<div class="bot-msg">
${cleanReply}
<br><br>
<a href="store.html" class="buy-btn">View Products</a>
</div>
`;
  setTimeout(() => {
 const lastMessage = chat.lastElementChild;
 lastMessage.scrollIntoView({
  behavior: "smooth",
  block: "start"
 });
},100);  
// SCROLL AFTER BOT MESSAGE
setTimeout(() => {
 const lastMessage = chat.lastElementChild;
 lastMessage.scrollIntoView({
   behavior: "smooth",
   block: "start"
 });
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
/* SPLASH SCREEN PREMIUM */
#splash{
  position:fixed;
  width:100%;
  height:100vh;
  background:linear-gradient(135deg,#0f2027,#203a43,#2c5364);
  display:flex;
  justify-content:center;
  align-items:center;
  z-index:9999;
  transition:0.5s;
}

.logo-animate span{
  font-size:42px;
  font-weight:bold;
  color:white;
  opacity:0;
  display:inline-block;
  animation: pop 0.6s forwards;
}

.logo-animate span:nth-child(1){animation-delay:0.1s}
.logo-animate span:nth-child(2){animation-delay:0.2s}
.logo-animate span:nth-child(3){animation-delay:0.3s}
.logo-animate span:nth-child(4){animation-delay:0.4s}
.logo-animate span:nth-child(5){animation-delay:0.5s}
.logo-animate span:nth-child(6){animation-delay:0.6s}

@keyframes pop{
  0%{
    transform:translateY(40px) scale(0.5);
    opacity:0;
  }
  100%{
    transform:translateY(0) scale(1);
    opacity:1;
  }
}
