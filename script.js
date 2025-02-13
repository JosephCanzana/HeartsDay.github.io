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
    window.noClickCounter = 0;
    questionContainer.innerText = "Let's spend Hearts day together?"

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
        "./images/thinkAgain.gif", "./images/flowerSquirtle.gif", "./images/Snow.gif",
        "./images/squirtleLittle.gif", "./images/twoSquirtle.gif", "./images/eatingSquirtle.gif",
        "./images/youSure.gif", "./images/StumpingSquirtle.gif", "./images/runningCrying.gif",
        "./images/SquirtleHeavyCry.gif", "./images/layingCrying.gif"
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
    const bibleVerse = document.getElementById('bibleVerse');
    const verseText = document.getElementById('verseText');
    const verseRef = document.getElementById('verseRef');

    const verses = [
        { text: "We love because He first loved us.", ref: "1 John 4:19" },
        { text: "Let all that you do be done in love.", ref: "1 Corinthians 16:14" },
        { text: "Above all, love each other deeply.", ref: "1 Peter 4:8" },
        { text: "God is love.", ref: "1 John 4:8" },
        { text: "Do everything in love.", ref: "1 Corinthians 16:14" },
        { text: "My command is this: Love each other as I have loved you.", ref: "John 15:12" },
        { text: "Be completely humble and gentle; be patient, bearing with one another in love.", ref: "Ephesians 4:2" },
        { text: "And now these three remain: faith, hope and love. But the greatest of these is love.", ref: "1 Corinthians 13:13" },
        { text: "Hatred stirs up conflict, but love covers over all wrongs.", ref: "Proverbs 10:12" }
    ];

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
    if(noClickCounter == 0){ 
        questionContainer.innerText = "Wow, no hesitation? Thankss!!!🎉😄";
    }else if (noClickCounter <= 3){
        questionContainer.innerText = "Oh, a little hesitation? It's okay! Thanks!😏";
    }else if(noClickCounter > 3 && noClickCounter <= 6){
        questionContainer.innerText = "You think you we're just forced... Thanks though 😅";
    }else if(noClickCounter > 6 && noClickCounter < 9 ){
        questionContainer.innerText = "I'm starting to take this personally... 🥺";
    }else{
        questionContainer.innerText = "Thank you for \"willingly\" saying Yes! 🎉";
    }

    // Show a random Bible verse
    const verse = verses[Math.floor(Math.random() * verses.length)];
    verseText.innerText = verse.text;
    verseRef.innerText = verse.ref;
});