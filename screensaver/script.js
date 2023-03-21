const audio = new Audio('static/laser.mp3');
const xInterval = 7000;
const yInterval = 15000;
audio.play();
setInterval(() => audio.play(), xInterval);
setInterval(() => audio.play(), yInterval);
