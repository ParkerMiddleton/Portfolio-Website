/**
 * Home Page TS
 * @author Parker Middleton
 */
// intro animation
let messages = ["Hello!", "Thanks for checking out my website!", "Who are you?",];
//variable typing speeds to mimic natual cadence of typing
const typing_speeds = [50, 20, 43, 66, 100, 5, 10, 33, 90];
const deleting_speeds = [5, 19, 6, 10, 22];
// pause after typing before deleting
const pauseTime = 1500;
const typingEl = document.getElementById("typing-text");
//What viewing mode the user has chosen
let UX = "";
// Start typing when page loads
window.addEventListener("DOMContentLoaded", async () => {
    const welcome = document.getElementById("welcome-title");
    const name_ = document.getElementById("welcome-name");
    const content = document.getElementById("welcome-contents");
    const messageBox = document.getElementById("welcome-text");
    await playMessages();
    if (messageBox)
        messageBox.hidden = true;
    if (welcome)
        welcome.hidden = false;
    if (name_)
        name_.hidden = false;
    if (content)
        content.hidden = false;
});
/**
 * Displays two buttons determining the UX
 * One for recruiters
 * One of standard viewers.
 *
 * @returns (Promise) String associated with the chosen UX decision format
 */
async function displayViewerOptions() {
    //Grab the div for button layouts (parent element)
    const ChooseUX = document.getElementById("Choose-UX");
    //Create both buttons
    const RecruiterButton = document.createElement("button");
    const CasualButton = document.createElement("button");
    //Set their attributes
    RecruiterButton.id = "Recruiter-Button";
    RecruiterButton.type = "button";
    RecruiterButton.value = "Recruiter";
    RecruiterButton.innerHTML = "Recruiter";
    CasualButton.id = "Causal-Button";
    CasualButton.type = "button";
    CasualButton.value = "Casual";
    CasualButton.innerHTML = "Standard";
    // Return value, a string contained within the button.
    let ViewingMode = "";
    //Button Event Listeners
    RecruiterButton.addEventListener('click', (event) => {
        console.log("Recruiter Button Clicked!");
        ViewingMode = RecruiterButton.value;
    });
    CasualButton.addEventListener('click', (event) => {
        console.log("Casual Button Clicked!");
        ViewingMode = CasualButton.value;
    });
    //Append elements to the parent
    ChooseUX?.appendChild(RecruiterButton);
    ChooseUX?.appendChild(CasualButton);
    return ViewingMode;
}
//Plays the entirety of the opening monologue
async function playMessages() {
    for (let phrase of messages) {
        await type(phrase);
        if (phrase == "Who are you?") {
            UX = await displayViewerOptions();
        }
        await new Promise(res => setTimeout(res, pauseTime));
        await delete_word();
    }
}
/**
 * Executes the typing animation on a phrase
 * @param phrase
 */
async function type(phrase) {
    for (let i = 0; i < phrase.length; i++) {
        let randIndex = getRandomInt(0, typing_speeds.length - 1);
        if (typingEl) {
            typingEl.innerHTML += phrase.charAt(i);
        }
        await new Promise(res => setTimeout(res, typing_speeds[randIndex]));
    }
}
/**
 * Executes the deleting animation on a phrase
 */
async function delete_word() {
    if (typingEl) {
        while (typingEl.innerHTML.length > 0) {
            let randIndex = getRandomInt(0, deleting_speeds.length - 1);
            typingEl.innerHTML = typingEl.innerHTML.slice(0, -1);
            await new Promise(res => setTimeout(res, deleting_speeds[randIndex]));
        }
    }
}
/**
 * Gets a random integer between two integers
 *
 * @param min Min range inclusive
 * @param max Max range inclusiive
 *
 * @returns Number within range
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export {};
//# sourceMappingURL=intro.js.map