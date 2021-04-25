






// кнопка fullscreen
const fullscreen = document.querySelector('.openfullscreen');
fullscreen.addEventListener('click', changeScreen);

function changeScreen() {
	if (document.fullscreenElement === null) {
		document.documentElement.requestFullscreen();
	} else if (document.fullscreenEnabled) {
		document.exitFullscreen();
	}
}
// Загрузка изображения согласно времени суток
const base = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;
const pictures  = document.querySelector('.container-pictures ');
const next = document.querySelector('.btn-next');

function viewBgImage(src) {  
  const img = new Image();
  img.src = src;
  img.onload = () => {      
    pictures.style.backgroundImage = `url(${src})`;
  }; 
}

function getImage() {
  const index = i % images.length;
  const date = new Date();
const hour = date.getHours();
let timesDay = '';

    if (hour >= 6 && hour < 12) {
        timesDay = 'morning/';
    } else if (hour >= 12 && hour < 18) {
        timesDay = 'day/';
    } else if (hour >= 18 && hour < 24) {
        timesDay = 'evening/';
    } else if (hour >= 0 && hour < 6) {
        timesDay = 'night/';
    };
  const imageSrc = base + timesDay + images[index];
  viewBgImage(imageSrc);
  i++;
  next.disabled = true;
  setTimeout(function() { next.disabled = false }, 1000);
} 
next.addEventListener('click', getImage);