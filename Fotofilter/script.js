const fullscreen = document.querySelector('.openfullscreen');
const pictures = document.querySelector('img ');
const base = './assets/img/unstored/';
const images = [
	'city1.jpg',
	'city2.jpg',
	'city3.jpg',
  'city4.jpg',
	'city5.jpg',
	'city6.jpg',
	'city7.jpg',
	'city8.jpg',
	'city9.jpg',
	'city10.jpg',
	'city11.jpg',
	'city12.jpg',
	'city13.jpg',
	'city14.jpg',
	'city15.jpg',
	'city16.jpg',
	'city17.jpg',
	'city18.jpg',
];
let i = 0;
const next = document.querySelector('.btn-next');
const loadBtn = document.querySelector('.btn-load');
const load = document.querySelector('#btnInput');
const save = document.querySelector('.btn-save');
const reset = document.querySelector('.btn-reset');
const button = document.querySelectorAll('.btn');
const inputRange = document.querySelectorAll('label');
const inputs = document.querySelectorAll('.filters input');
const outputs = document.querySelectorAll(' output');


// fullscreen
fullscreen.addEventListener('click', changeScreen);

function changeScreen() {
	if (document.fullscreenElement === null) {
		document.documentElement.requestFullscreen();
	} else if (document.fullscreenEnabled) {
		document.exitFullscreen();
	}
}
//применение стилей к активной кнопке

button.forEach((el) => {
	el.addEventListener('click', (e) => {
		next.classList.remove('btn-active');
		loadBtn.classList.remove('btn-active');
		save.classList.remove('btn-active');
		reset.classList.remove('btn-active');
		el.classList.add('btn-active');
	});
});

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
	}
	pictures.src = timesDay;
}
viewStartImage();

// Загрузка изображения Next 
function viewBgImage(src) {
	const img = new Image();
	img.src = src;
	img.onload = () => {
		pictures.src = src;
	};
}

function getImage() {
	const index = i % images.length;
	const imageSrc = base + images[index];
	viewBgImage(imageSrc);
	i++;
	next.disabled = true;
	setTimeout(function () {
		next.disabled = false;
	}, 1000);
}
next.addEventListener('click', getImage);

// загрузка стороннего изображения по кнопке Load picture

load.addEventListener('change', function (e) {
	const file = load.files[0];
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.addEventListener('load', () => {
		pictures.src = reader.result;
		load.value = '';
	});
});

//сохранение изображения по кнопке Save picture

save.addEventListener('click', createCanvas);

function createCanvas() {
	const canvas = document.createElement('canvas');
	const img = new Image();
	img.setAttribute('crossOrigin', 'anonymous');
	img.src = pictures.src;
	img.addEventListener('load', () => {
		canvas.width = pictures.naturalWidth;
		canvas.height = pictures.naturalHeight;
		const ctx = canvas.getContext('2d');
    const coefficient = pictures.naturalHeight / pictures.height;
    ctx.filter = `blur(${inputs[0].value * coefficient}px) invert(${inputs[1].value}%) sepia(${inputs[2].value}%) saturate(${inputs[3].value}%) hue-rotate(${inputs[4].value}deg)`;
		ctx.drawImage(img, 0, 0);
		const dataURL = canvas.toDataURL('image/png');
		let link = document.createElement('a');
		link.download = 'image.png';
		link.href = dataURL;
		link.click();
		link.delete;
	});
}

//работа с Input-range и фильтрами

inputRange.forEach((element) => {
	const input = element.querySelector('input');
	const output = element.querySelector('output');

	input.addEventListener('input', (e) => {
		console.log(e.target);
		let value = e.target.value;
		const unit = e.target.dataset.sizing;
		output.value = value + unit;
		console.log(output.value);

		document.documentElement.style.setProperty(`--${e.target.name}`, output.value);
	});
});

//сброс стилей Reset button

reset.addEventListener('click',resetStyles );

function resetStyles(){
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = inputs[i].getAttribute('value')
    console.log(inputs[i].name)
    outputs[i].value = outputs[i].getAttribute('value')
    document.documentElement.style.removeProperty(`--${inputs[i].name}`)
  }
}


