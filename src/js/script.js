const switcher = document.querySelector('#cbx'),
      more = document.querySelector('.more'),
      modal = document.querySelector('.modal'),
      videos = document.querySelectorAll('.videos__item');
let player;

function bindSlideToggle(trigger, boxBody, content, openClass) {
  let button = {
    'element': document.querySelector(trigger),
    'active': false
  };
  const box = document.querySelector(boxBody),
        boxContent = document.querySelector(content);

  button.element.addEventListener('click', () => {    //Слидим кликнули ли по объекту
    if (button.active === false) {    //Проверяем меню - активно или нет
        button.active = true;
        box.style.height = boxContent.clientHeight + 'px';    //clientHeight - Получаем высоту 
        box.classList.add(openClass);   //Узнаём какие есть классы.добавляем активный класс
    } else {
        button.active = false;
        box.style.height = 0 + 'px';     
            box.style.height = 0 + 'px';
        box.style.height = 0 + 'px';     
        box.classList.remove(openClass);    //Удаляем класс
    }
  });
}
bindSlideToggle('.hamburger', '[data-slide="nav"]', '.header__menu', 'slide-active');

function switchMode() {
  if (night === false){
    night = true;
    //document.body.style.backgroundColor = '#000';
    document.body.classList.add('night');
    document.querySelectorAll('.hamburger > line').forEach(item => {
      item.style.stroke = '#fff';
    });
    document.querySelectorAll('.videos__item-descr').forEach(item => {
      item.style.color = '#fff';
    });
    document.querySelectorAll('.videos__item-views').forEach(item => {
      item.style.color = '#fff';
    });
    document.querySelector('.header__item-descr').style.color = '#fff';
    document.querySelector('.logo > img').src ='logo/youtube_night.svg';
  } else {
    night = false;
    document.body.classList.remove('night');
    document.querySelectorAll('.hamburger > line').forEach(item => {
      item.style.stroke = '#000';
    });
    document.querySelectorAll('.videos__item-descr').forEach(item => {
      item.style.color = '#000';
    });
    document.querySelectorAll('.videos__item-views').forEach(item => {
      item.style.color = '#000';
    });
    document.querySelector('.header__item-descr').style.color = '#000';
    document.querySelector('.logo > img').src ='logo/youtube.svg';
  }
}

let night = false;
switcher.addEventListener('change', () => {
    switchMode();
});

const data = [
  ['img/thumb_3.webp', 'img/thumb_4.webp', 'img/thumb_5.webp'],
  ['#3 Верстка на flexbox CSS | Блок преимущества и галерея | Марафон верстки | Артем Исламов', 
       '#2 Установка spikmi и работа с ветками на Github | Марафон вёрстки Урок 2',
       '#1 Верстка реального заказа landing Page | Марафон вёрстки | Артём Исламов'],
  ['3,6 тыс. просмотров', '4,2 тыс. просмотров', '28 тыс. просмотров'],
  ['X9SmcY3lM-U', '7BvHoh0BrMw', 'mC8JW_aG2EM']
];

more.addEventListener('click', () => {
  const videosWrapper = document.querySelector('.videos__wrapper');
  more.remove(); //Удаляем кнопку при нажатии

  for (let i =0; i < data[0].length; i++){
    let card = document.createElement('a'); //Создаём новый элемент
    card.classList.add('videos__item', 'videos__item-active');
    card.setAttribute('data-url', data[3][i]);  //['X9SmcY3lM-U', '7BvHoh0BrMw', 'mC8JW_aG2EM']
    card.innerHTML = `
      <img src="${data[0][i]}" alt="thumb">
      <div class="videos__item-descr">
        ${data[1][i]}
      </div>
      <div class="videos__item-views">
        ${data[2][i]}
      </div>
    `;
    videosWrapper.appendChild(card);  //Добавляем в конец каждой карточки новую
    setTimeout(() => {
      card.classList.remove('videos__item-active');   //устанавливаем время появления карточек
    }, 10);
    bindNewModal(card);    
  }

  sliceTitle('.videos__item-descr', 80);
});

function sliceTitle(selector, count) {   //Подрезаем заголовок
  document.querySelectorAll(selector).forEach(item => {
    item.textContent.trim();  //Удаляет лишние пробелы

    if (item.textContent.length < count) {  //Кол-во символов < 100
      return;
    } else {
      const str = item.textContent.slice(0, count + 1) + "..."; // Обрезаем строку
      item.textContent = str;
    }
  });
}
sliceTitle('.videos__item-descr', 80);

function openModal(){
  modal.style.display = 'block';
}

function closeModal(){
  modal.style.display = 'none';
  player.stopVideo();
}

function bindModal(cards) {
  cards.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const id = item.getAttribute('data-url');
      loadVideo(id);
      openModal();
    });
  });
}
bindModal(videos);

function bindNewModal(cards) {
  cards.addEventListener('click', (e) => {  //Откр-ет модальное окно одной карточки
    e.preventDefault();
    const id = cards.getAttribute('data-url');
      loadVideo(id);
    openModal();
  });
}

modal.addEventListener('click', (e) => {
  if (!e.target.classList.contains('modal__body')) {  //Если кликаем не по модальному окну
    closeModal();
  }
});

function createVideo(){
  var tag = document.createElement('script');   //https://developers.google.com/youtube/iframe_api_reference?hl=ru

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  setTimeout(() => {                      //Делаем задержку
    player = new YT.Player('frame', {    //Создаём новый экземпляр плеера
      height: '100%',                      //Настройки
      width: '100%',
      videoId: 'M7lc1UVf-VE'
    });
  }, 300);
}

createVideo();

function loadVideo(id) {    //Загружаем новое видео по id
  player.loadVideoById({'videoId': `${id}`});
}