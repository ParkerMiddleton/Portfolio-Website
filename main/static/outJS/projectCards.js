/**
 * TS specifically for project cards on the homepage for recruiters
 *  */
window.addEventListener("DOMContentLoaded", () => {
    const projectGrid = document.getElementById("project-grid");
    if (projectGrid) {
        projectGrid.addEventListener('click', (event) => {
            const targetElement = event.target;
            if (targetElement.classList.contains('details-link')) {
                event.stopPropagation();
                return;
            }
            const cardOverlay = targetElement.closest('.project-overlay');
            if (cardOverlay) {
                document.querySelectorAll('.project-overlay.is-expanded').forEach((otherCard) => {
                    if (otherCard !== cardOverlay) {
                        otherCard.classList.remove('is-expanded');
                    }
                });
                cardOverlay.classList.toggle('is-expanded');
            }
        });
    }
});
export {};
//# sourceMappingURL=projectCards.js.map