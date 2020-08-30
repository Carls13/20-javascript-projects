const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable/Enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: 'a5d91d2413044a13aec99eb977a7d7bf',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get jokes from Joke API
async function getJoke() {
    let myJoke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const { setup, delivery, joke } = data;
        if (setup) {
            myJoke = `${setup} ... ${delivery}`
        } else {
            myJoke = joke; 
        }
        // Audio out the joke
        tellMe(myJoke);

        // Disable button
        toggleButton();
    } catch (error) {
        // Catch errors
        console.log('Joke Api Error', error);
    }
}

// Button click event
button.addEventListener('click', getJoke);

// Audio listeners
audioElement.addEventListener('ended', toggleButton);