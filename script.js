document.addEventListener("click", function() {
    const video = document.getElementById("backgroundVideo");
    video.muted = false; // Unmute after user clicks
});

document.addEventListener('DOMContentLoaded', function() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    const startButton = document.getElementById('startButton');
    const questionContainer = document.getElementById('questionContainer');
    const gifContainer = document.querySelector('.gif');
    const buttonContainer = document.querySelector('.button-container');

    backgroundMusic.muted = false;

    startButton.addEventListener('click', function() {
        backgroundMusic.play();
        startButton.style.display = 'none';
        questionContainer.style.display = 'block';
        gifContainer.style.display = 'block';
        buttonContainer.style.display = 'flex';
    });

    function playMusic() {
        backgroundMusic.play();
        document.removeEventListener('click', playMusic);
        document.removeEventListener('touchstart', playMusic);
    }

    document.addEventListener('click', playMusic);
    document.addEventListener('touchstart', playMusic);
});

document.getElementById('randomButton').addEventListener('click', function() {
    const button = this;
    const body = document.body;
    const gif = document.querySelector('.gif img');
    const gifContainer = document.querySelector('.gif');
    const questionContainer = document.querySelector('.question-container');
    const yesButton = document.getElementById('yesButton');
    const videoContainer = document.querySelector('.video-container');
    const noVideo = document.getElementById('noVideo');
    const buttonContainer = document.querySelector('.button-container');

    const maxX = body.clientWidth - button.offsetWidth;
    const maxY = body.clientHeight - button.offsetHeight;

    let randomX, randomY;

    // Function to check if the button overlaps with an element
    function isOverlapping(element) {
        const buttonRect = button.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        return !(buttonRect.right < elementRect.left ||
                 buttonRect.left > elementRect.right ||
                 buttonRect.bottom < elementRect.top ||
                 buttonRect.top > elementRect.bottom);
    }

    do {
        randomX = Math.floor(Math.random() * maxX);
        randomY = Math.floor(Math.random() * maxY);
        button.style.position = 'absolute';
        button.style.left = randomX + 'px';
        button.style.top = randomY + 'px';
    } while (isOverlapping(gif) || isOverlapping(questionContainer) || isOverlapping(yesButton));

    // Array of "No" messages
    const noMessages = [
        "Are you sure? 😢", "Think again! 🤔", "Don't be so cold! 🥶",
        "Maybe just a little? 🥺", "Why not? 🤨", "Give it another thought! 🤯",
        "Just one yes? 🥹","Don't be that person... 😒", "I'm running out of ways to convince you! 😵",
        "Fine, but you're missing out! 👀", "Okay, I give up! 😩"
    ];

    // Counter to limit message changes
    if (typeof window.counter === 'undefined') {
        window.counter = 0;
    }

    if (window.counter < noMessages.length) {
        button.innerText = noMessages[window.counter]; // Change button text
        if (window.counter === noMessages.length - 1) {
            body.style.backgroundColor = 'yellow'; // Change background color to yellow
        }
        window.counter++;
    } else {
        // Hide the GIF, show the video, and update the question text
        backgroundMusic.muted = true;
        gifContainer.style.display = 'none';
        videoContainer.style.display = 'block';
        questionContainer.innerText = "😜 I will 'Never gonna give you up 🤌'";
        buttonContainer.style.display = 'none';
        noVideo.play();
    }

    // Increase the size of the "Yes" button
    const currentWidth = yesButton.offsetWidth;
    const currentHeight = yesButton.offsetHeight;
    yesButton.style.width = (currentWidth + 10) + 'px';
    yesButton.style.height = (currentHeight + 10) + 'px';

    // Array of GIF file paths
    const gifPaths = [
        "images/thinkAgain.gif", "images/flowerSquirtle.gif", "images/Snow.gif",
        "images/squirtleLittle.gif", "images/twoSquirtle.gif", "images/eatingSquirtle.gif",
        "images/youSure.gif", "images/StumpingSquirtle.gif", "images/runningCrying.gif",
        "images/SquirtleHeavyCry.gif", "images/layingCrying.gif"
    ];

    // Counter to keep track of the current GIF index
    if (typeof window.gifCounter === 'undefined') {
        window.gifCounter = 0;
    }

    // Change the GIF in order
    gif.src = gifPaths[window.gifCounter];
    window.gifCounter = (window.gifCounter + 1) % gifPaths.length; // Loop back to the start if at the end
});

document.getElementById('yesButton').addEventListener('click', function() {
    const questionContainer = document.getElementById('questionContainer');
    const gif = document.querySelector('.gif img');
    const buttonContainer = document.querySelector('.button-container');

    // Set the text and GIF for the "Yes" response
    questionContainer.innerText = "Thank you for saying Yes! 🎉";
    gif.src = "images/happySquirtle.gif"; // Change this to the path of your "Yes" GIF

    // Hide the buttons
    buttonContainer.style.display = 'none';
});