document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("ask")) {
        const limitBox = document.querySelector(".limit-box");
        if (limitBox) {
            limitBox.style.display = "none";
        }
    }
});

const API_URL="https://mintai-backend.vercel.app/api/chat";
/* PRODUCT DATABASE */
const productsDB = {
  lips: [
    {name:"Mamaearth Lip Balm", link:"#"},
    {name:"Biotique Lip Balm", link:"#"}
  ],
  hair: [
    {name:"WOW Onion Oil", link:"#"},
    {name:"Mamaearth Hair Oil", link:"#"}
  ],
  skin: [
    {name:"Cetaphil Cleanser", link:"#"},
    {name:"Mamaearth Face Wash", link:"#"}
  ],
  weight: [
    {name:"Himalaya Fat Burner", link:"#"},
    {name:"Green Tea", link:"#"}
  ]
};

function addMsg(text,who){
 document.getElementById("chatBox").innerHTML += `<p><b>${who}:</b> ${text}</p>`;
}

async function sendMessage() {

  const input = document.getElementById("userInput");
  const msg = input.value.trim();
  if(!msg) return;

  // show user message
  addMsg(msg,"You");
  input.value = "";

  // show typing animation
  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML += `<p id="typing" class="typing"><b>MintAI:</b> thinking...</p>`;

  // wait 1.5 sec (real feel)
  await new Promise(r => setTimeout(r,1500));

  // call backend
  const res = await fetch(API_URL,{
    method:"POST",
    headers:{ "Content-Type":"application/json"},
    body: JSON.stringify(msg)
  });

  const reply = await res.text();

  // remove typing
  document.getElementById("typing").remove();

  // show AI reply
  typeWriter(reply);

  // show products
  showProducts(msg);
}

function askPreset(text){
 document.getElementById("userInput").value=text;
 sendMessage();
}

function sendPreset(){
 const text=document.getElementById("searchBox").value;
 askPreset(text);
}
function showProducts(userText){
   let list = document.getElementById("productList");
   list.innerHTML="";

   userText = userText.toLowerCase();

   let category=null;

   if(userText.includes("lip")) category="lips";
   else if(userText.includes("hair")) category="hair";
   else if(userText.includes("skin")) category="skin";
   else if(userText.includes("weight")) category="weight";

   if(!category) return;

   productsDB[category].forEach(p=>{
      list.innerHTML += `
        <div class="product-card">
          <p>${p.name}</p>
          <button>Buy Now</button>
        </div>`;
   });
}
/* REAL AI TYPING EFFECT */
function typeWriter(text){
  let i = 0;
  const speed = 20;

  const box = document.getElementById("chatBox");
  const p = document.createElement("p");
  p.innerHTML = "<b>MintAI:</b> ";
  box.appendChild(p);

  function typing(){
    if(i < text.length){
      p.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }

  typing();
}
