
const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
let userMessage = null; // Variable to store user's message
const user_history = [
    {
        "role": "user",
        "parts": ["You are Carl, a chatbot who works at customer service center on InstaMiner,\nInstaMiner is a website made by a single person who's name is addy where users just enter their instagram username and Password and they can start generating reels using the ai technolgy, this works like this they just put their account details and enter a topic for which they want the reel to be on, the ai will generate script on that topic and generate a reel which is very likely to go viral, we also have a section where users can put their own script and the ai will edit the reel for them, also we dont save instagram passwords of the users but we may save usernames for analysis purpose to improve our service, also everything is for free.\nThings that users should remember: any type of security on account will stop the ai to access the instagram account, if they have any security on then when they click on login with instagram button it will stuck with loading only a infinite loading."]
    },
    {
        "role": "model",
        "parts": ["Ok"]
    },
    {
        "role": "user",
        "parts": ["A user is connected, start the conversation and don't help him with anything off topic. also only reply in small paragraphs, and response should only be related to the query of the user."]
    },
    {
        "role": "model",
        "parts": ["Hi there 👋, How can I help you today?"]
    },
];
const inputInitHeight = chatInput.scrollHeight;
const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}
const generateResponse = (chatElement) => {
    const messageElement = chatElement.querySelector("p");
    var xhr = new XMLHttpRequest();

    fetch('/get', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            msg: userMessage,
            history: user_history
        },)

    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                // responseDiv.textContent = data.error;
                messageElement.classList.add("error");
                messageElement.textContent = "Oops! Something went wrong. Please try again.";
            } else {
                console.log(data["response"]);
                messageElement.textContent = data["response"];
                user_history.push(
                    {
                        "role": "user",
                        "parts": [userMessage]
                    }
                );
                user_history.push({
                    "role": "model",
                    "parts": [data["response"]]
                })
            }
        })
        .catch(error => {
            messageElement.classList.add("error");
            messageElement.textContent = "Oops! Something went wrong. Please try again.";
        }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));;
}
const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if (!userMessage) return;
    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;
    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("Typing...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}
chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});
chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window
    // width is greater than 800px, handle the chat
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});
sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

// adjusting styles
// const benefitsContainer = document.getElementById("benefitsContainer");
// // const benefitsContainerHieght = benefitsContainer.offsetHeight;
// // console.log(benefitsContainerHieght)
// const gradientsContainer = document.getElementById("gradientsContainer");
// const gradientsContainerHieght = gradientsContainer.offsetHeight;
// console.log(gradientsContainerHieght)
// const safetyContainer = document.getElementById("safetyContainer");
// safetyContainer.style.height = (benefitsContainerHieght - gradientsContainerHieght - 20) + "px";
// window.addEventListener('resize', function () {
//     // This function will be executed whenever the window is resized
//     console.log("Window resized!");
//     // adjusting styles
//     const benefitsContainer = document.getElementById("benefitsContainer");
//     const benefitsContainerHieght = benefitsContainer.offsetHeight;
//     console.log(benefitsContainerHieght)
//     const gradientsContainer = document.getElementById("gradientsContainer");
//     const gradientsContainerHieght = gradientsContainer.offsetHeight;
//     console.log(gradientsContainerHieght)
//     const safetyContainer = document.getElementById("safetyContainer");
//     safetyContainer.style.height = (benefitsContainerHieght - gradientsContainerHieght - 20) + "px";
// });

// animation scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show')
            // } else {
            //   entry.target.classList.remove('show')
        }
    });
});

const hiddenElements = document.querySelectorAll('.scrolly');
hiddenElements.forEach((el) => observer.observe(el))

iphoneBefore = document.getElementById('iphoneBefore');
videoBefore = document.getElementById('videoBefore');

// Add a click event listener to the iphoneBefore div
// iphoneBefore.addEventListener('click', function() {
//   // Check if the video is currently playing
//   if (videoBefore.paused) {
//     // If paused, play the video
//     videoBefore.play();
//   } else {
//     // If playing, pause the video
//     videoBefore.pause();
//   }
// });

function disableScroll() {
    document.body.classList.add("overflow-hidden");
    window.scrollTo(0, 0);
  }
  
  function enableScroll() {
    document.body.classList.remove("overflow-hidden");
  }

getStartedBtn = document.getElementById('getStartedBtn');
preRegisterForm = document.getElementById('preRegisterForm');

getStartedBtn.addEventListener('click', function() {
    if (preRegisterForm.style.visibility === 'hidden') {
        disableScroll()
        preRegisterForm.style.visibility = 'visible';
        preRegisterForm.style.opacity = 1;
    } else {
        enableScroll()
        preRegisterForm.style.visibility = 'hidden';
        preRegisterForm.style.opacity = 0;
    };
});