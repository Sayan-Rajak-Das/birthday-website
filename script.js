// Countdown Timer
function startCountdown() {
    const countdownDate = new Date("2025-01-01T00:00:00").getTime();
    const countdownElement = document.getElementById("countdown");

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            clearInterval(interval);
            countdownElement.innerHTML = "🎉 It's your special day 🎉";
            countdownElement.classList.add("special-day-message"); // Add the special styling class
        }
    }, 1000);
}


// Show Wish Modal
function showWishModal() {
    $('#wishModal').modal('show');
}

// Toggle Music
function toggleMusic() {
    const music = document.getElementById("bg-music");
    const musicButton = document.getElementById("music-toggle");

    if (music.paused) {
        music.play();
        musicButton.textContent = "Turn Music Off";
    } else {
        music.pause();
        musicButton.textContent = "Turn Music On";
    }
}

// Move "No" Button Randomly on Hover (only on desktop)
function moveNoButton() {
    const noButton = document.getElementById("no-button");
    const container = noButton.parentElement;

    // Skip movement if on mobile
    if (window.innerWidth <= 768) {
        return;
    }

    // Get container dimensions
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    // Get button dimensions
    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;

    // Calculate a random position within the container boundaries
    const randomX = Math.floor(Math.random() * (containerWidth - buttonWidth));
    const randomY = Math.floor(Math.random() * (containerHeight - buttonHeight));

    // Set the button's new position
    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;
}

// Show Thank You Message with Slide-down Effect
function showThankYou() {
    const message = document.getElementById("message");
    message.textContent = "Thank you for being in my life. 💖✨\n" +
                      "You are the melody in my silence 🎶💫,\n" +
                      "the laughter in my heart's quiet spaces. 😊💖\n" +
                      "Every moment with you feels like magic 🌟🌈,\n" +
                      "and I'm endlessly grateful for you. 🥰🌸";
    message.classList.remove("slide-down"); // Reset animation
    void message.offsetWidth; // Trigger reflow to reset animation
    message.classList.add("slide-down"); // Apply animation
}

// Show Sad Message with Slide-down Effect
function showSadMessage() {
    const message = document.getElementById("message");
    message.textContent = "I'm sad to hear that. 😔💔\n" +
                          "But... remember, I'm always here for you. 🌸💫\n" +
                          "Even on the toughest days, you’re not alone. 🌧️☂️✨\n" +
                          "Take all the time you need, and know I'm by your side. 🌱💪❤️";
    message.classList.remove("slide-down"); // Reset animation
    void message.offsetWidth; // Trigger reflow to reset animation
    message.classList.add("slide-down"); // Apply animation
}

// Change "No" Button Text on Hover
function changeNoButtonText() {
    const noButton = document.getElementById("no-button");
    noButton.textContent = "Don't click me!😨";
}

function resetNoButtonText() {
    const noButton = document.getElementById("no-button");
    noButton.textContent = "No, I don’t";
}

// Change "Yes" Button Text on Hover
function changeYesButtonText() {
    const yesButton = document.getElementById("yes-button");
    yesButton.textContent = "You won't regret it! 🌞";
}

function resetYesButtonText() {
    const yesButton = document.getElementById("yes-button");
    yesButton.textContent = "Yes, I do";
}

// Start Countdown on Page Load
window.onload = startCountdown;

// Attach the move function and hover effects to the "No, I don’t" button
const noButton = document.getElementById("no-button");
noButton.addEventListener("mouseenter", moveNoButton);
noButton.addEventListener("mouseenter", changeNoButtonText);
noButton.addEventListener("mouseleave", resetNoButtonText);
noButton.addEventListener("click", showSadMessage);

// Attach hover effects to the "Yes, I do" button
const yesButton = document.getElementById("yes-button");
yesButton.addEventListener("mouseenter", changeYesButtonText);
yesButton.addEventListener("mouseleave", resetYesButtonText);
yesButton.addEventListener("click", showThankYou);


document.addEventListener("DOMContentLoaded", () => {
    const showFormButton = document.getElementById("show-form-button");
    const formContainer = document.getElementById("message-form-container");
    const promptContainer = document.querySelector(".prompt-container");
    const formStatusMessage = document.getElementById("form-status-message");
    const messageForm = document.getElementById("message-form");

    // Adjust the width and position of the form container to align with the prompt
    function adjustFormWidth() {
        if (promptContainer && formContainer) {
            const promptWidth = promptContainer.offsetWidth;
            formContainer.style.width = `${promptWidth}px`;
            // Remove margin-left adjustment for central alignment
            // formContainer.style.marginLeft = `${promptContainer.offsetLeft}px`;
        }
    }

    // Run adjustFormWidth on page load and on window resize
    adjustFormWidth();
    window.addEventListener("resize", adjustFormWidth);

    // Toggle form visibility with slide-down effect
    showFormButton.addEventListener("click", () => {
        formContainer.classList.toggle("active");
    });

    // Handle form submission using EmailJS
    messageForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Clear any previous message and show a sending message
        formStatusMessage.classList.remove("visible", "success", "error");
        formStatusMessage.textContent = "Sending...";

        // Send email via EmailJS
        emailjs.sendForm("Sayan_01", "template_ndrhr4i", messageForm)
            .then((response) => {
                console.log("SUCCESS!", response.status, response.text);
                // Display success message below the form
                formStatusMessage.textContent = "Message sent successfully! 🎉";
                formStatusMessage.classList.add("success", "visible");

                // Reset the form fields to their initial state
                messageForm.reset();
            })
            .catch((error) => {
                console.error("FAILED...", error);
                // Display error message below the form
                formStatusMessage.textContent = "Oops! Something went wrong. 😢";
                formStatusMessage.classList.add("error", "visible");
            });
    });
});

