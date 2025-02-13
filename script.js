document.addEventListener('DOMContentLoaded', function() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    const startButton = document.getElementById('startButton');
    const topText = document.getElementById('topText');
    const questionContainer = document.getElementById('questionContainer');
    const gifContainer = document.querySelector('.gif');
    const buttonContainer = document.querySelector('.button-container');
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const noVideo = document.getElementById('noVideo');
    const yesVideo = document.getElementById('yesVideo');
    const noCounter = document.getElementById('noCounter'); 

    backgroundMusic.muted = false;
    noCounter.hidden = true;

    startButton.addEventListener('click', function() {
        backgroundMusic.play();
        startButton.style.display = 'none';
        topText.style.display = 'block';
        questionContainer.style.display = 'block';
        gifContainer.style.display = 'block';
        buttonContainer.style.display = 'flex';
        noCounter.hidden = false;
    });

    function playMusic() {
        backgroundMusic.play();
        document.removeEventListener('click', playMusic);
        document.removeEventListener('touchstart', playMusic);
    }

    document.addEventListener('click', playMusic);
    document.addEventListener('touchstart', playMusic);
});

document.getElementById('noButton').addEventListener('click', function() {
    const button = this;
    const body = document.body;
    const gif = document.querySelector('.gif img');
    const gifContainer = document.querySelector('.gif');
    const questionContainer = document.querySelector('.question-container');
    const yesButton = document.getElementById('yesButton');
    const videoContainer = document.querySelector('.video-container');
    const noVideo = document.getElementById('noVideo');
    const buttonContainer = document.querySelector('.button-container');
    const noCounter = document.getElementById('noCounter'); 

    const borderMargin = 15; 
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
        randomX = Math.floor(Math.random() * (maxX - borderMargin * 2)) + borderMargin;
        randomY = Math.floor(Math.random() * (maxY - borderMargin * 2)) + borderMargin;
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
        button.innerText = noMessages[window.counter];
        window.counter++;
    } else {
        // Show "Because..." message before the final stage
        yesButtonSizeW = yesButton.style.width;
        yesButtonSizeH = yesButton.style.height;
        backgroundMusic.muted = true;
        questionContainer.style.display = 'none';
        gifContainer.style.display = 'none';
        noCounter.style.display = 'none';
        noButton.style.display = 'none';
        yesButton.style.display = 'none';
        topText.style.display ='none';

        const becauseContainer = document.getElementById('becauseContainer');
        const nextButton = document.getElementById('nextButton');

        becauseContainer.style.display = 'block';
        nextButton.style.display = 'block';

        nextButton.addEventListener('click', function() {
            becauseContainer.style.display = 'none';

            questionContainer.style.display = 'block';   
            topText.style.display = 'block'; 
            //buttonContainer.style.display = 'block'; 
            yesButton.style.height = yesButtonSizeH;
            yesButton.style.width = yesButtonSizeW;  
            yesButton.style.display = 'block'; 
            noButton.style.display = 'block';

            backgroundMusic.muted = true;
            
            videoContainer.style.display = 'block';
            questionContainer.innerText = "😜 I will \"Never gonna give you up\" 🤌";
            noButton.style.display = 'none';

            noVideo.style.display = 'block'; 
            noVideo.muted = false;
            noVideo.play();
        }, { once: true });
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
    window.gifCounter = (window.gifCounter + 1) % gifPaths.length; 

    // Increment and display the "No" counter
    if (typeof window.noClickCounter === 'undefined') {
        window.noClickCounter = 0;
    }
    window.noClickCounter++;
    if (noClickCounter <= 3){
        noCounter.innerText = `No Count: ${window.noClickCounter}`;
    }else if(noClickCounter > 3 && noClickCounter <= 6){
        noCounter.innerText = `Maybe? Count: ${window.noClickCounter}`;
    }else if(noClickCounter > 6 && noClickCounter < 9 ){
        noCounter.innerText = `Please? Count: ${window.noClickCounter}`;
    }else{
        noCounter.innerText = `I'm giving up: ${window.noClickCounter}`;
    }
});

document.getElementById('yesButton').addEventListener('click', function() {
    const questionContainer = document.getElementById('questionContainer');
    const gifContainer = document.querySelector('.gif');
    const buttonContainer = document.querySelector('.button-container');
    const noVideo = document.getElementById('noVideo');
    const yesVideo = document.getElementById('yesVideo');
    const yesResponse = document.querySelector('.yes-response'); 

    // Hide unnecessary elements
    buttonContainer.style.display = 'none';
    gifContainer.style.display = 'none';
    noVideo.pause();
    noVideo.currentTime = 0;
    noVideo.style.display = 'none'; 

    // Show the "Yes" response video
    backgroundMusic.muted = true;
    shareId.style.display = 'block';
    bibleVerse.style.display = 'block';
    yesResponse.style.display = 'block';
    yesVideo.style.display = 'block'; 
    yesVideo.muted = false; 
    yesVideo.play(); 

    // Update question text
    questionContainer.innerText = "Thank you for willingly saying Yes! 🎉";
});