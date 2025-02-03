

let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak(" Good Morning , welcome to virtual assistant");
    } else if (hours >= 12 && hours < 16) {
        speak(" Good Afternoon, welcome to virtual assistant ");
    } else {
        speak(" Good Evening, welcome to virtual assistant ");
    }
 
}
// Trigger the wish when the page loads
window.addEventListener('load', () => {
    wishMe();
});


let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

// When speech recognition has a result
recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

// Start speech recognition when button is clicked
btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display="none"
    voice.style.display="block"
});


// Function to process commands
function takeCommand(message) {
    btn.style.display="flex"
    voice.style.display="none"
     message = message.toLowerCase(); // Ensure case insensitivity
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello Sir, how can I help you?");
    }
    else if (message.includes("who are you")) {
        speak("I am a virtual assistant, created by Mansi ");
    }
    else if(message.includes("open youtube")){
        speak("opening youtube...")
        window.open("https://www.youtube.com")
    }
    else if(message.includes("open google")){
        speak("opening google...")
        window.open("https://www.google.co.in")
    }
    
    else if(message.includes("open facebook")){
        speak("opening facebook...")
        window.open("https://www.facebook.com")
    }

    
    else if(message.includes("open instagram")){
        speak("opening instagram...")
        window.open("https://www.instagram.com")
    }

  

    else if (message.includes("open calculator")){
        speak("opening calculator...")
        window.open("calculator://")
    }

    else if (message.includes("open whatsapp")){
        speak("opening whatsapp...")
        window.open("whatsapp://")
    }

    else if (message.includes("time")) {
        let time = new Date().toLocaleTimeString(undefined, {
            hour: 'numeric',
            minute: 'numeric',
            hour12: false // Change to 'true' for 12-hour format
        });
        speak(time);
    }

    else if (message.includes("date")){
        let date=new Date().toLocaleString(undefined,{day:"numeric",month:"short"})
        speak(date)
     }


     else {
        let finalText = "this is what I found on the internet regarding " + (message.replace("ainey", "") || message.replace("anee", ""));
        
        // Speak the finalText variable
        speak(finalText);
        
        // Open a Google search with the modified message
        window.open(`https://www.google.com/search?q=${message.replace("anee", "")}`, "_blank");
    }
    

}

