let twitter = document.querySelector(".X-icon");
let github = document.querySelector(".github-icon");
let linkedin = document.querySelector(".linkedin-icon");
let projectVisit = document.querySelectorAll(".visit");
let contactform = document.querySelector(".submit");
let showmore = document.querySelector("#show-more-btn");
let hiddenGrids = document.querySelectorAll(".work-grid3.hidden, .work-grid4.hidden, .work-grid5.hidden");
let contact = document.querySelector("#contact");

contact.addEventListener("click", (e)=>{
    location.href = "#contacts";
    console.log(e);
})


twitter.addEventListener("click", (e)=>{
    open("https://x.com/ashokemaity_", "_blank");
    console.log(e);
});

github.addEventListener("click", (e)=>{
    open("https://github.com/ashoke-maity", "_blank");
    console.log(e);
});

linkedin.addEventListener("click", (e)=>{
    open("https://www.linkedin.com/in/ashokemaity", "_blank");
    console.log(e);
});


projectVisit.forEach((button) => {
    button.addEventListener('click', (e) => {
        open("https://github.com/ashoke-maity", "_blank");
        console.log(e);
    });
});



document.addEventListener("DOMContentLoaded", () => {
    showmore.addEventListener("click", (e) => {
        console.log("Show more button clicked");

        // Loop through all hidden grids and toggle their visibility
        hiddenGrids.forEach(hiddenGrid => {
            if (hiddenGrid.classList.contains("hidden")) {
                hiddenGrid.classList.remove("hidden");
                hiddenGrid.style.display = "grid";  // Show each grid
            } else {
                hiddenGrid.classList.add("hidden");
                hiddenGrid.style.display = "none";  // Hide each grid
            }
        });

        // Change the button text based on the state of the grids
        if (showmore.textContent === "Show More") {
            showmore.textContent = "Show Less";
        } else {
            showmore.textContent = "Show More";
        }
    });
});


/* video pause and thumbnail showing effect*/
document.querySelectorAll("video").forEach(video => {
    video.addEventListener("play", () => {
        // When one video is played, ensure all videos keep their thumbnails
        document.querySelectorAll("video").forEach(otherVideo => {
            if (otherVideo !== video) {
                otherVideo.pause();
            }
        });
    });

    video.addEventListener("pause", () => {
        // Show the poster of the paused video
        video.load(); // Reload to show the poster correctly
    });

    // Ensure all videos show their poster when the page loads
    video.load(); // Initially show all posters
});



// Flag to differentiate between click-based navigation and scroll-based updates
let isClickScrolling = false;

// Set active navlink on click
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', function (e) {
        // Remove 'active' class from all links
        document.querySelectorAll('.nav__link').forEach(nav => {
            nav.classList.remove('active');
        });

        // Add 'active' class to the clicked link
        this.classList.add('active');

        // Store the clicked section in localStorage
        localStorage.setItem('activeSection', this.getAttribute('href'));

        // Smooth scroll to the section
        const targetId = this.getAttribute('href');

        // Handle the 'Home' tab click
        if (targetId === '#home') {
            isClickScrolling = true; // Set flag for click-based scrolling
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            // Reset the flag after scrolling to home section
            setTimeout(() => {
                isClickScrolling = false;
            }, 1000); // Adjust this to match your scroll animation duration
        } else {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault(); // Prevent default anchor click behavior

                // Set flag to indicate user-initiated scroll
                isClickScrolling = true;

                // Smooth scroll to target section
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });

                // Reset the flag after the scroll is done (timeout should match scroll duration)
                setTimeout(() => {
                    isClickScrolling = false;
                }, 1000); // Adjust this to match your scroll animation duration
            }
        }
    });
});

// Highlight active section on scroll
window.addEventListener('scroll', () => {
    if (isClickScrolling) {
        return; // Skip scroll-based updates while user is clicking on navlink
    }

    const sections = document.querySelectorAll('section');
    const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150; // Adjust for fixed navbar height
        const sectionHeight = section.clientHeight;

        // Check if the scroll position is within the current section
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const id = section.getAttribute('id');
            document.querySelector('.nav__link.active')?.classList.remove('active');
            document.querySelector(`.nav__link[href="#${id}"]`).classList.add('active');

            // Store the active section in localStorage while scrolling
            localStorage.setItem('activeSection', `#${id}`);
        }
    });

    // Handle the case when at the top of the page (for the home section)
    if (scrollPosition === 0) {
        document.querySelector('.nav__link.active')?.classList.remove('active');
        document.querySelector('.nav__link[href="#home"]').classList.add('active');
        localStorage.setItem('activeSection', '#home'); // Store 'home' section when at the top
    }
});

// Restore active navlink on page reload
window.addEventListener('load', () => {
    const activeSection = localStorage.getItem('activeSection');

    if (activeSection) {
        // Remove 'active' class from all links
        document.querySelectorAll('.nav__link').forEach(nav => {
            nav.classList.remove('active');
        });

        // Add 'active' class to the stored section's link
        document.querySelector(`.nav__link[href="${activeSection}"]`)?.classList.add('active');

        // Scroll to the active section smoothly after page reload
        if (activeSection !== '#home') {
            const targetSection = document.querySelector(activeSection);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    }
});
