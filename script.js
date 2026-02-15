const API_URL = "https://mintai-backend.vercel.app/api/chat";

function sendMessage() {
  let input = document.getElementById("userInput");
  let chat = document.getElementById("chatBox");

  let msg = input.value.toLowerCase().trim();
  if(msg=="") return;

  chat.innerHTML += `<div class="user-msg">${msg}</div>`;

  // typing dots
  chat.innerHTML += `
    <div id="typing" class="typing">
      <span></span><span></span><span></span>
    </div>`;
  chat.scrollTop = chat.scrollHeight;
  input.value="";

  setTimeout(()=>{
    document.getElementById("typing").remove();

    let reply = "";

    // 🩺 BLOOD PRESSURE
    if(msg.includes("bp") || msg.includes("blood pressure")){
      reply = `
      ❤️ BP control tips:<br><br>
      🥗 Eat: Banana, beetroot, oats, spinach<br>
      🥤 Drink: Coconut water, green tea<br>
      🚫 Avoid: Salt, fried food, stress<br><br>
      🌿 Recommended Products:<br>
      <a href="store.html" class="buy-btn">View Products</a>`;
    }

    // 💇 HAIR FALL
    else if(msg.includes("hair")){
      reply = `
      💇 Hair fall control:<br><br>
      🥗 Eat: Almonds, eggs, spinach<br>
      🥤 Drink: Amla juice, coconut water<br>
      🧴 Use: Onion oil, mild shampoo<br><br>
      🌿 Recommended Products:<br>
      <a href="store.html" class="buy-btn">View Products</a>`;
    }

    // ⚖️ WEIGHT LOSS
    else if(msg.includes("weight")){
      reply = `
      ⚖️ Weight loss tips:<br><br>
      🥗 Eat: Oats, salad, fruits<br>
      🥤 Drink: Lemon water, green tea<br>
      🚶 Daily walk 30 min<br><br>
      🌿 Recommended Products:<br>
      <a href="store.html" class="buy-btn">View Products</a>`;
    }

    // ✨ SKIN CARE
    else if(msg.includes("skin") || msg.includes("pimple")){
      reply = `
      ✨ Clear skin tips:<br><br>
      🥗 Eat: Fruits, cucumber, nuts<br>
      🥤 Drink: 3L water daily<br>
      🧴 Use: Vitamin C serum, sunscreen<br><br>
      🌿 Recommended Products:<br>
      <a href="store.html" class="buy-btn">View Products</a>`;
    }

    // DEFAULT
    else{
      reply = `
      🤖 Ask about:<br>
      • Hair fall<br>
      • Weight loss<br>
      • Skin care<br>
      • Blood pressure`;
    }

    chat.innerHTML += `<div class="bot-msg">${reply}</div>`;
    chat.scrollTop = chat.scrollHeight;

  },1200);
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
function toggleMenu() {
  let nav = document.getElementById("navLinks");
  nav.classList.toggle("active");
}
