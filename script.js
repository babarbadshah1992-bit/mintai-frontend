const API_URL = "https://mintai-backend.vercel.app/api/chat";

function sendMessage() {

  let input = document.getElementById("userInput");
  let chat = document.getElementById("chatBox");

  let userText = input.value.trim();
  if(userText=="") return;

  // USER MESSAGE
  chat.innerHTML += `
    <div class="user-msg">${userText}</div>
  `;

  // TYPING DOTS
  chat.innerHTML += `
    <div id="typing" class="typing">
      <span></span><span></span><span></span>
    </div>
  `;

  chat.scrollTop = chat.scrollHeight;
  input.value="";

  // AI REPLY DELAY
  setTimeout(()=>{

    document.getElementById("typing").remove();

    chat.innerHTML += `
      <div class="bot-msg">
        It seems like you mentioned "<b>${userText}</b>" 😊<br><br>
        🌿 Recommended Products:
        <br><br>
        <a href="store.html" class="buy-btn">View Products</a>
      </div>
    `;

    chat.scrollTop = chat.scrollHeight;

  },1500);
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
