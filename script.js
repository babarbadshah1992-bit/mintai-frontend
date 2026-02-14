// 🔗 YOUR BACKEND API (VERCEL)
const API_URL = "https://mintai-backend.vercel.app/api/chat";


// 🛍️ Affiliate Product Database
const productsDB = {
  hair: [
    { name:"WOW Onion Hair Oil", link:"https://amzn.to/3HairOil" },
    { name:"Mamaearth Hair Fall Shampoo", link:"https://amzn.to/3Shampoo" }
  ],
  skin: [
    { name:"Vitamin C Serum", link:"https://amzn.to/3Serum" },
    { name:"Sunscreen SPF50", link:"https://amzn.to/3Sunscreen" }
  ],
  weight: [
    { name:"Green Tea Fat Burner", link:"https://amzn.to/3Greentea" },
    { name:"Apple Cider Vinegar", link:"https://amzn.to/3ACV" }
  ]
};



// 📩 ADD MESSAGE TO CHAT
function addMsg(text, who){
  const box = document.getElementById("messages");
  box.innerHTML += `<p><b>${who}:</b> ${text}</p>`;
  box.scrollTop = box.scrollHeight;
}



// ⏳ TYPING ANIMATION
function showTyping(){
  const box = document.getElementById("messages");
  box.innerHTML += `<p id="typing">🤖 MintAI is thinking...</p>`;
  box.scrollTop = box.scrollHeight;
}

function removeTyping(){
  const typing = document.getElementById("typing");
  if(typing) typing.remove();
}



// 🛍️ SHOW PRODUCTS
function showProducts(keyword){
  if(!productsDB[keyword]) return;

  const chat = document.getElementById("messages");
  chat.innerHTML += `<h3>🛍️ Recommended Products</h3>`;

  productsDB[keyword].forEach(p=>{
    chat.innerHTML += `
      <div class="product-card">
        <h4>${p.name}</h4>
        <a href="${p.link}" target="_blank">Buy on Amazon</a>
      </div>
    `;
  });
}



// 🚀 MAIN SEND MESSAGE FUNCTION
async function sendMessage(){

  const input = document.getElementById("userInput");
  const msg = input.value.trim();
  if(!msg) return;

  // user msg
  addMsg(msg,"You");
  input.value="";

  // typing animation
  showTyping();

  try{
    // call backend
    const res = await fetch(API_URL,{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ message: msg })
    });

    const data = await res.json();

    removeTyping();

    // AI reply
    addMsg(data.reply,"MintAI");

    // 🔥 AUTO PRODUCT MATCHING
    const m = msg.toLowerCase();

    if(m.includes("hair") || m.includes("hair fall") || m.includes("bald")){
      showProducts("hair");
    }

    if(m.includes("skin") || m.includes("pimple") || m.includes("acne")){
      showProducts("skin");
    }

    if(m.includes("weight") || m.includes("fat") || m.includes("belly")){
      showProducts("weight");
    }

  }catch(err){
    removeTyping();
    addMsg("Server error. Please try again.","MintAI");
  }
}
