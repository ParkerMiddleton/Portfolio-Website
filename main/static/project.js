const urls = JSON.parse(
  document.getElementById('codeURLS').textContent
);

let filenames = [];
let filecode = [];


const fetchPromises = urls.map(url => {
  filenames.push(url.split("/").pop());
  return fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.text();
    });
});

Promise.all(fetchPromises)
  .then(codeArray => {
    codeArray.forEach(code => {
      filecode.push(code);
    });

    const nameListElement = document.getElementById("code-name-list");
    filenames.forEach(function (element, index) {
      nameListElement.innerHTML += `<li><div class="code-title" id="code-title-${index}">${element}</div></li>`;
      nameListElement.addEventListener("click", function (event) {
        const target = event.target;

        if (target.classList.contains("code-title")) {
          const index = target.id.split("-").pop();

          const codeEl = document.getElementById("GHCode");
          codeEl.textContent = filecode[index];
          Prism.highlightElement(codeElement);
        }


      });
    });

    // Optionally display the first file:
    const codeElement = document.getElementById("GHCode");
    codeElement.textContent = filecode[0];
    Prism.highlightElement(codeElement);


  })
  .catch(error => {
    document.getElementById("GHCode").textContent = "Failed to load code.";
    console.error("Error fetching code:", error);
  });



document.addEventListener("DOMContentLoaded", () => {
	const track = document.getElementById("design-carousel-track");
	const slides = document.querySelectorAll(".design-carousel-slide");
	let currentSlide = 0;

	function updateCarousel() {
		const offset = -currentSlide * 100;
		track.style.transform = `translateX(${offset}%)`;
	}

	window.nextSlide = function () {
		currentSlide = (currentSlide + 1) % slides.length;
		updateCarousel();
	};

	window.prevSlide = function () {
		currentSlide = (currentSlide - 1 + slides.length) % slides.length;
		updateCarousel();
	};
});