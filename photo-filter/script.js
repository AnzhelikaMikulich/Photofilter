const fullscreen = document.querySelector('.openfullscreen');
const pictures  = document.querySelector('img ');
const base = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;
const next = document.querySelector('.btn-next');
const load = document.querySelector('#btnInput')


// кнопка fullscreen
fullscreen.addEventListener('click', changeScreen);

function changeScreen() {
	if (document.fullscreenElement === null) {
		document.documentElement.requestFullscreen();
	} else if (document.fullscreenEnabled) {
		document.exitFullscreen();
	}
}

//Загрузка стартового изображения из файлов приложения согласно времени суток
function viewStartImage() {  
  const date = new Date();
  const hour = date.getHours();
  if (hour >= 6 && hour < 12) {
    timesDay = './assets/img/morning.jpg';
} else if (hour >= 12 && hour < 18) {
    timesDay = './assets/img/day.jpg';
} else if (hour >= 18 && hour < 24) {
    timesDay = './assets/img/evening.jpg';
} else if (hour >= 0 && hour < 6) {
    timesDay = './assets/img/night.jpg';
}; 
    pictures.src = timesDay ;
}
viewStartImage()

// Загрузка изображения Next согласно времени суток

function viewBgImage(src) {  
  const img = new Image();
  img.src = src;
  img.onload = () => {      
    pictures.src = src;
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

// загрузка стороннего изображения по кнопке Load picture

load.addEventListener("change", function(e) {
  const file = load.files[0];
  console.log(file)
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.addEventListener("load", () => {
    pictures.src = reader.result;
    load.value = "";
  });
});

//сохранение изображения по кнопке Save picture
const save = document.querySelector('.btn-save');
save.addEventListener('click',createCanvas)

function createCanvas(){
  const canvas = document.createElement('canvas');
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous'); 
    img.src = pictures.src;
    img.addEventListener("load", ()=> {
      canvas.width = pictures.width;
    canvas.height = pictures.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL("image/png");
    let link = document.createElement("a");
    link.download = "image.png";
    link.href = dataURL;
    link.click();
    link.delete;
    } )
  
}
