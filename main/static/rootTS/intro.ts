/**
 * Home Page TS
 * @author Parker Middleton	
 */

// intro text
let messages = ["Hello!", "Thanks for checking out my website"
	, "Please chose your viewing preference!"];
let recruiterMessages = ["Thanks for your time!", "Below is a condensed version of my online portfolio", "Enjoy!"]

//variable typing speeds to mimic natual cadence of typing
const typing_speeds = [50, 20, 43, 66, 100, 5, 10, 33, 90];
const deleting_speeds = [5, 19, 6, 10, 22];

// For annimations, assigned later
let typingEl: HTMLElement | null

// pause after typing before deleting
const pauseTime = 1500;

//Card Elements
const navbar = document.getElementById("navbar");
const welcomeCard = document.getElementById("welcome-card");
const aboutCard = document.getElementById("about-card");
const projectDisplayCard = document.getElementById("project-display-card");
const welcomeTitle = document.getElementById("welcome-title"); // Used as insertion point
const ceSection = document.getElementById("ce-section");
const dtpSection = document.getElementById("dtp-section");
const ctaFooter = document.getElementById("cta-footer-card");


//For storing choice of website role
let UX: string = ""

//For creating a session
const SET_MODE_URL = '/set-view-mode/';

// Start typing when page loads
window.addEventListener("DOMContentLoaded", async () => {

	//Get the current role
	const body = document.body;
	let currentViewMode: string | null = body.dataset.viewMode || null;
	const needsIntro = !currentViewMode;
	let promptContainer: HTMLElement | null = null;
	console.log("current view mode: " + currentViewMode);
	console.log("needs intro? : " + needsIntro);

	const welcome = document.getElementById("welcome-title");
	const name_ = document.getElementById("welcome-name");
	const content = document.getElementById("welcome-contents");

	/**
	 * Needs intro signifies an initial load where the current role is "null"
	 * Otherwise its just a reload when a user is already logged in
	 * Recruiter or Casual
	 */
	if (needsIntro) {
		// 1. Create and insert the dynamic elements into the DOM
		promptContainer = createPromptContainer();
		if (promptContainer) {
			onInitialPageLoad();
			await playMessages();
			currentViewMode = UX;
		} else {
			// If promptContainer failed to create, we can't run the intro.
			currentViewMode = currentViewMode || "Casual";
		}

		// Regardless of whether intro ran or not, apply the final view mode
		const finalMode = currentViewMode || "Casual";

		// Since the prompt container is gone, reveal the static elements that were hidden
		// Only show these elements if the intro was needed and completed
		if (finalMode === "Recruiter") {
			DisplayRecruiterViews();
			await playRecruiterMessages();
			if (promptContainer) {
				promptContainer.remove();
			}

			if (welcome) welcome.hidden = false;
			if (name_) name_.hidden = false;
			if (content) content.hidden = false;

		} else {
			if (promptContainer) {
				promptContainer.remove();
			}
			if (welcome) welcome.hidden = false;
			if (name_) name_.hidden = false;
			if (content) content.hidden = false;
			DisplayCasualViews();
		}
	}
	else if (currentViewMode == "Recruiter") {
		DisplayRecruiterViews();
	}
	else {
		DisplayCasualViews();
	}
	if (welcome) welcome.hidden = false;
	if (name_) name_.hidden = false;
	if (content) content.hidden = false;






});



/**
 * Creates, inserts, and manages the entire UX prompt container (typing text and buttons).
 * * @returns {HTMLElement | null} The created container element.
 */
function createPromptContainer(): HTMLElement | null {
	if (!welcomeCard || !welcomeTitle) {
		console.error("Welcome card or title not found. Cannot create prompt container.");
		return null;
	}

	//Create the parent container: #UX-prompt-container
	const promptContainer = document.createElement("div");
	promptContainer.id = "UX-prompt-container";

	// 2. Create the typing area: #welcome-text
	const welcomeTextH2 = document.createElement("h2");
	welcomeTextH2.id = "welcome-text";

	typingEl = document.createElement("span");
	typingEl.id = "typing-text";



	// 3. Create the buttons container: #Choose-UX
	const chooseUXDiv = document.createElement("div");
	chooseUXDiv.id = "Choose-UX";

	// Assemble the typing elements
	welcomeTextH2.appendChild(typingEl);

	// Assemble the prompt container
	promptContainer.appendChild(welcomeTextH2);
	promptContainer.appendChild(chooseUXDiv);

	// Insert the new container right after the main title
	welcomeCard.insertBefore(promptContainer, welcomeTitle);

	return promptContainer;
}



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
	if (ceSection) {
		ceSection.classList.add("isHidden");
	}
	if (dtpSection) {
		dtpSection.classList.add("isHidden");
	}
	if (ctaFooter) {
		ctaFooter.classList.add("isHidden");
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
	if (ceSection) {
		ceSection.classList.add("isHidden");
	}
	if (dtpSection) {
		dtpSection.classList.remove("isHidden");
	}
	if (ctaFooter) {
		ctaFooter.classList.remove("isHidden");
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
	if (ceSection) {
		ceSection.classList.remove("isHidden");
	}
	if (dtpSection) {
		dtpSection.classList.add("isHidden");
	}
	if (ctaFooter) {
		ctaFooter.classList.remove("isHidden");
	}

	const standardModeSwitcher = document.getElementById("switch-to-standard-button");

	if (standardModeSwitcher) {
		standardModeSwitcher.addEventListener('click', async () => {
			let standard: string = "Casual";
			try {

				const response = await fetch(SET_MODE_URL, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ mode: standard })
				});

				if (response.ok) {
					console.log("Successful switch to Standard, reloading page");
					window.location.href = window.location.pathname + '#';
					window.location.reload();

				} else {
					console.log("Failed to save the new view mode. Status: " + response.status);
				}

			} catch (error) {
				console.error("Network or fetch error occured during view mode switch: ", error);
			}
		})
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
		const cleanupAndResolve = async (value: string) => {
			if (ChooseUX) {
				try {
					await fetch(SET_MODE_URL, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ mode: value })
					});
				} catch (error) {
					console.error("FAiled to save view mode to Django session:", error);
				}
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
		if (phrase == "Please chose your viewing preference!") {
			UX = await displayViewerOptions();
			console.log('Viewing Mode:', UX);

			if (UX == "Casual") {
				if (typingEl)
					typingEl.innerHTML = "";
				return;
			}
		}
		await new Promise(res => setTimeout(res, pauseTime));
		await delete_word();
	}
}

async function playRecruiterMessages(): Promise<void> {
	for (let phrase of recruiterMessages) {
		await type(phrase);
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

