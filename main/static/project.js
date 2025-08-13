document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Handle fetching and displaying code files ---
  const urls = JSON.parse(document.getElementById('codeURLS').textContent);

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
      filecode = codeArray; // directly assign

      const nameListElement = document.getElementById("code-name-list");

      // Build the list of clickable filenames
      filenames.forEach((filename, index) => {
        nameListElement.innerHTML += `<li><div class="code-title" data-index="${index}">${filename}</div></li>`;
      });

      const firstTitle = document.querySelector(".code-title");
      if (firstTitle) firstTitle.classList.add("active");


      // Event delegation: one listener on ul for clicks on .code-title divs
      nameListElement.addEventListener("click", function (event) {
        const target = event.target;

        if (target.classList.contains("code-title")) {

          const allTitles = nameListElement.querySelectorAll(".code-title");
          allTitles.forEach(title => title.classList.remove("active"));

          target.classList.add("active");

          const index = parseInt(target.getAttribute('data-index'), 10);
          const codeEl = document.getElementById("GHCode");
          codeEl.textContent = filecode[index];
          Prism.highlightElement(codeEl);
        }
      });

      // Display first file by default
      const codeElement = document.getElementById("GHCode");
      codeElement.textContent = filecode[0];
      Prism.highlightElement(codeElement);

    })
    .catch(error => {
      const codeEl = document.getElementById("GHCode");
      codeEl.textContent = "Failed to load code.";
      console.error("Error fetching code:", error);
    });


  // --- 2. Carousel setup ---
  const track = document.getElementById("design-carousel-track");
  const slides = Array.from(document.querySelectorAll(".design-carousel-slide"));
  const dotsContainer = document.querySelector(".design-carousel-dots");

  let currentSlide = 0;

  // Create dots dynamically based on number of slides
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('design-carousel-dot');
    if (index === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);

    dot.addEventListener('click', () => {
      moveToSlide(index);
    });
  });

  const dots = Array.from(dotsContainer.children);

  function moveToSlide(index) {
    if (index < 0) {
      index = slides.length - 1;
    } else if (index >= slides.length) {
      index = 0;
    }
    track.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');

    currentSlide = index;
  }

  window.nextSlide = function () {
    moveToSlide(currentSlide + 1);
  };

  window.prevSlide = function () {
    moveToSlide(currentSlide - 1);
  };

  moveToSlide(0);

  // key navigation for carousels 
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    else if (e.key === 'ArrowLeft') prevSlide();
  });


});
