/**
 * TS specifically for project cards on the homepage for recruiters
 *  */ 

window.addEventListener("DOMContentLoaded", () => {
    const projectGrid = document.getElementById("project-grid");

	console.log("I got loaded");
    if (projectGrid) {
        projectGrid.addEventListener('click', (event: MouseEvent) => {
            
            const targetElement = event.target as HTMLElement;
            
            if (targetElement.classList.contains('details-link')) {
                // Allow the button's default action (navigation) to occur,
                // but stop the click event from "bubbling up" to the card's listener.
                event.stopPropagation();
                // We let the browser handle the button's default action (likely a link/form submit)
                return; 
            }

            // If it's NOT the button, proceed with the card toggle logic:
            const cardOverlay = targetElement.closest('.project-overlay');

            if (cardOverlay) {
                // Collapse any other open cards
                document.querySelectorAll('.project-overlay.is-expanded').forEach(
                    (otherCard) => {
                        if (otherCard !== cardOverlay) {
                            otherCard.classList.remove('is-expanded');
                        }
                    }
                );
                
                // Toggle the 'is-expanded' class on the clicked card
                cardOverlay.classList.toggle('is-expanded');
            }
        });
    }
});