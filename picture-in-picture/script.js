const videoElement = document.getElementById("video");
const button = document.getElementById("button");

// Prompt user to select a media stream, pass to video element and play
async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        }
    } catch (error) {
        console.log(error);
    }
}

button.addEventListener('click', async () => {
    button.disabled = true;

    // Request picture in picture
    await videoElement.requestPictureInPicture();

    button.disabled = false;
})

selectMediaStream();