const audioElement = document.querySelector("audio");
audioElement.addEventListener("loadeddata", function() {
    audioElement.loop = true;
    audioElement.play();
});
audioElement.addEventListener("ended", function() {
  audioElement.removeEventListener("ended", arguments.callee);
});