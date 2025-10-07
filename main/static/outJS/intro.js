/**
 * Home Page TS
 * @author Parker Middleton
 */
// intro text
let messages = ["Hi! Thanks for checking out my website!",
    "Please chose your viewing preference!"];
//variable typing speeds to mimic natual cadence of typing
const typing_speeds = [50, 20, 43, 66, 100, 5, 10, 33, 90];
const deleting_speeds = [5, 19, 6, 10, 22];
// pause after typing before deleting
const pauseTime = 1500;
//For animations
const typingEl = document.getElementById("typing-text");
//Card Elements
const navbar = document.getElementById("navbar");
const aboutCard = document.getElementById("about-card");
const projectDisplayCard = document.getElementById("project-display-card");
const resumeCard = document.getElementById("resume-card");
//For storing choice of website role
let UX = "";
//For creating a session
const SET_MODE_URL = '/set-view-mode/';
// Start typing when page loads
window.addEventListener("DOMContentLoaded", async () => {
    //Get the current role
    const body = document.body;
    let currentViewMode = body.dataset.viewMode || null;
    const needsIntro = !currentViewMode;
    console.log("current role: ", currentViewMode);
    /**
     * If no role is set, then we have no session data.
     * Therefore play the opening monologue
     */
    if (needsIntro) {
        onInitialPageLoad();
        //Initially hide about card and nav.
        await playMessages();
        currentViewMode = UX;
    }
    //Display Welcome Card Data
    const welcomeTitle = document.getElementById("welcome-title");
    if (welcomeTitle) {
        welcomeTitle.hidden = false;
    }
    const welcomeName = document.getElementById("welcome-name");
    if (welcomeName) {
        welcomeName.hidden = false;
    }
    const welcomeContents = document.getElementById("welcome-contents");
    if (welcomeContents) {
        welcomeContents.hidden = false;
    }
    if (currentViewMode == "Recruiter") {
        DisplayRecruiterViews();
    }
    else {
        DisplayCasualViews();
    }
});
/**
 * Disable everything until the user has picked which view they'd like
 */
function onInitialPageLoad() {
    if (navbar) {
        navbar.classList.add("isHidden");
    }
    if (aboutCard) {
        aboutCard.classList.add("isHidden");
    }
    if (projectDisplayCard) {
        projectDisplayCard.classList.add("isHidden");
    }
    if (resumeCard) {
        resumeCard.classList.add("isHidden");
    }
}
/**
 * Toggles cards hidden=False that are available for casual viewers
 */
function DisplayCasualViews() {
    if (navbar) {
        navbar.classList.remove("isHidden");
    }
    if (aboutCard) {
        aboutCard.classList.remove("isHidden");
    }
    if (projectDisplayCard) {
        projectDisplayCard.classList.add("isHidden");
    }
    if (resumeCard) {
        resumeCard.classList.add("isHidden");
    }
}
/**
 * Toggles cards hidden=False that are tailored to recruiters
 */
function DisplayRecruiterViews() {
    if (navbar) {
        navbar.classList.add("isHidden");
    }
    if (aboutCard) {
        aboutCard.classList.remove("isHidden");
    }
    if (projectDisplayCard) {
        projectDisplayCard.classList.remove("isHidden");
    }
    if (resumeCard) {
        resumeCard.classList.remove("isHidden");
    }
}
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
    //Append elements to the parent
    if (ChooseUX) {
        ChooseUX.appendChild(RecruiterButton);
        ChooseUX.appendChild(CasualButton);
    }
    return new Promise((resolve) => {
        //Cleans up buttons then returns the resolve after click.
        const cleanupAndResolve = async (value) => {
            if (ChooseUX) {
                try {
                    await fetch(SET_MODE_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ mode: value })
                    });
                }
                catch (error) {
                    console.error("FAiled to save view mode to Django session:", error);
                }
                ChooseUX.removeChild(RecruiterButton);
                ChooseUX.removeChild(CasualButton);
                resolve(value);
            }
        };
        // Button Event Listeners
        RecruiterButton.addEventListener('click', () => {
            console.log("Recruiter Button Clicked!");
            cleanupAndResolve(RecruiterButton.value);
        }, { once: true });
        CasualButton.addEventListener('click', () => {
            console.log("Casual Button Clicked!");
            cleanupAndResolve(CasualButton.value);
        }, { once: true });
    });
}
/**
 * Plays the entirety of the opening monologue
 */
async function playMessages() {
    for (let phrase of messages) {
        await type(phrase);
        if (phrase == "Please chose your viewing preference!") {
            UX = await displayViewerOptions();
            console.log('Viewing Mode:', UX);
            if (typingEl)
                typingEl.innerHTML = "";
            return;
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