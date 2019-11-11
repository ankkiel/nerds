var openPopup = document.querySelector(".map-information__button");
var popup = document.querySelector(".popup");
var closePopup = document.querySelector(".popup__close");
var formPopup = document.querySelector(".popup__form");
var namePopup = document.querySelector("[name=name]");
var emailPopup = document.querySelector("[name=email]");
var inputPopup = document.querySelectorAll(".popup__input, .popup__textarea");

var isStorageSupport = true;
var storage = "";

try {
  storage = localStorage.getItem("name");
} catch (err) {
  isStorageSupport = false;
}
window.addEventListener("keydown", evt => {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popup.classList.contains("popup--open")) {
      popup.classList.remove("popup--open");
    }
  }
});
openPopup.addEventListener("click", evt => {
  evt.preventDefault();
  popup.classList.add("popup--open");
  popup.classList.add("popup--open--animation");
  setTimeout(() => {
    popup.classList.remove("popup--open--animation");
  }, 800);

  if (storage) {
    namePopup.value = storage;
  } else if (!storage) {
    namePopup.focus();
  } else {
    emailPopup.focus();
  }
});
closePopup.addEventListener("click", evt => {
  evt.preventDefault();
  popup.classList.remove("popup--open");
});
formPopup.addEventListener("submit", evt => {
  if (!namePopup.value || !inputPopup.value) {
    evt.preventDefault();
    popup.classList.add("popup--error");
    setTimeout(() => {
      popup.classList.remove("popup--error");
    }, 800);
  } else {
    if (isStorageSupport) {
      localStorage.setItem("name", namePopup.value);
    }
  }

});
ymaps.ready(function () {
  var myMap = new ymaps.Map("map", {
      center: [59.938872, 30.322617],
      zoom: 18,
      controls: [],
      type: "yandex#map",

    }, {
      searchControlProvider: "yandex#search"
    },
    {
      suppressMapOpenBlock: true,
    }),

    // Создаём макет содержимого.
    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
      `<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>`
    ),

    myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {
      hintContent: `191186, Санкт-Петербург,
          ул. Б. Конюшенная, д. 19/8`
    }, {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: "default#image",
      // Своё изображение иконки метки.
      iconImageHref: "img/map-marker.png",
      // Размеры метки.
      iconImageSize: [231, 190],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-85, -190]
    })
  myMap.behaviors
    .disable(["rightMouseButtonMagnifier", "scrollZoom"])
  myMap.geoObjects
    .add(myPlacemark)
});
