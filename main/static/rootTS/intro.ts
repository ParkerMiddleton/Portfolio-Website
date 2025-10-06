/**
 * Home Page TS
 * @author Parker Middleton	
 */

// intro text
let messages = ["Who are you?"];

//variable typing speeds to mimic natual cadence of typing
const typing_speeds = [50, 20, 43, 66, 100, 5, 10, 33, 90];
const deleting_speeds = [5, 19, 6, 10, 22];

// pause after typing before deleting
const pauseTime = 1500;
//For animations
const typingEl = document.getElementById("typing-text");

//Card Elements
const navbar = document.getElementById("navbar");
const welcomeCard = document.getElementById("welcome-card");
const aboutCard = document.getElementById("about-card");
const projectDisplayCard = document.getElementById("project-display-card");
const resumeCard = document.getElementById("resume-card");


//What viewing mode the user has chosen
let UX: string = ""

// Start typing when page loads
window.addEventListener("DOMContentLoaded", async () => {

	onInitialPageLoad();

	const welcome = document.getElementById("welcome-title");
	const name_ = document.getElementById("welcome-name");
	const content = document.getElementById("welcome-contents");
	const messageBox = document.getElementById("welcome-text");

	//Initially hide about card and nav.
	await playMessages()

	if (messageBox)
		messageBox.hidden = true;
	if (welcome)
		welcome.hidden = false;
	if (name_)
		name_.hidden = false;
	if (content)
		content.hidden = false;

	if (UX == "Recruiter") {
		DisplayRecruiterViews();
	} else {
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
}

/**
 * Toggles cards hidden=False that are tailored to recruiters
 */
function DisplayRecruiterViews() {
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
async function displayViewerOptions(): Promise<string> {
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

	return new Promise<string>((resolve) => {

		//Cleans up buttons then returns the resolve after click.
		const cleanupAndResolve = (value: string) => {
			if (ChooseUX) {
				ChooseUX.removeChild(RecruiterButton);
				ChooseUX.removeChild(CasualButton);
				resolve(value)
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
async function playMessages(): Promise<void> {
	for (let phrase of messages) {
		await type(phrase);
		if (phrase == "Who are you?") {
			UX = await displayViewerOptions();
			console.log('Viewing Mode:', UX);
		}
		await new Promise(res => setTimeout(res, pauseTime));
		await delete_word();
	}
}

/**
 * Executes the typing animation on a phrase
 * @param phrase 
 */
async function type(phrase: string): Promise<void> {
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
async function delete_word(): Promise<void> {
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
function getRandomInt(min: number, max: number): number {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

