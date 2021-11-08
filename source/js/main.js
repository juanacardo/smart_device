'use strict';
var inputErrorColor = '#ff0001';
var inputErrorMessage = 'Пожалуйста, введите 10 цифр';

var page = document.querySelector('.page');
var popup = document.querySelector('.popup');
var popupOpenButton = document.querySelector('#popup-open-button');
var popupCloseButton = document.querySelector('#popup-close-button');
var popupOverlay = document.querySelector('.popup-overlay');
var popupForm = document.querySelector('#popup-form');
var popupName = document.querySelector('#popup-name');
var popupTel = document.querySelector('#popup-tel');
var popupQuestion = document.querySelector('#popup-question');

var feedbackForm = document.querySelector('#feedback-form');
var feedbackName = document.querySelector('#feedback-name');
var feedbackTel = document.querySelector('#feedback-tel');
var feedbackQuestion = document.querySelector('#feedback-question');

var spollerButtons = document.querySelectorAll('.spoller__button');
var spollers = document.querySelectorAll('.spoller__item');

// // Сохранение в Local Storage

var saveInLocalStorage = function (input) {
  localStorage.setItem(input.name, input.value);
};

// Функция визульного отображения ошибки валидации
var setError = function (input) {
  input.style.borderColor = inputErrorColor;
};

var removeError = function (input) {
  input.setCustomValidity('');
  input.style.borderColor = '';
};

// Валидация формы
var onTelInput = function (input) {
  var inputValue = input.value;
  var re = /^(\d{10})$/;
  if (re.test(inputValue) === false) {
    input.setCustomValidity(inputErrorMessage);
    setError(input);
  } else {
    removeError(input);
  }
  if (input.value === '') {
    removeError(input);
  }
  input.reportValidity();
};

var validatePopupTel = function () {
  onTelInput(popupTel);
};

// Modal
var showModal = function () {
  popup.classList.remove('popup--closed');
  popupOverlay.classList.remove('popup-overlay--closed');
  page.classList.add('blocked');
  popupName.focus();
};

var hideModal = function () {
  popup.classList.add('popup--closed');
  popupOverlay.classList.add('popup-overlay--closed');
  page.classList.remove('blocked');
};

var onPopupFormEscKeydown = function (evt) {
  if (evt.keyCode === 27) {
    hideModal();
  }
};

var openModal = function () {
  showModal();
  popupCloseButton.addEventListener('click', hideModal);
  page.addEventListener('keydown', onPopupFormEscKeydown);
  popupOverlay.addEventListener('click', hideModal);
  popupTel.addEventListener('input', validatePopupTel);
};

popupOpenButton.addEventListener('click', openModal);

function closeModal() {
  popupCloseButton.removeEventListener('click', hideModal);
  page.removeEventListener('keydown', onPopupFormEscKeydown);
  popupOverlay.removeEventListener('click', hideModal);
  popupTel.removeEventListener('input', validatePopupTel);
  saveInLocalStorage(popupName);
  saveInLocalStorage(popupTel);
  saveInLocalStorage(popupQuestion);
}

popupForm.addEventListener('submit', closeModal);

// Feedback form
var validateFeedbackTel = function () {
  onTelInput(feedbackTel);
};

var submitFeedback = function () {
  saveInLocalStorage(feedbackName);
  saveInLocalStorage(feedbackTel);
  saveInLocalStorage(feedbackQuestion);
};

feedbackForm.addEventListener('submit', submitFeedback);
feedbackTel.addEventListener('input', validateFeedbackTel);

// Spoller
spollers.forEach(function (spoller) {
  spoller.classList.remove('spoller__item--nojs');
});

spollerButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    var spoller = button.closest('.spoller__item');

    if (spoller.classList.contains('spoller__item--opened')) {
      spoller.classList.remove('spoller__item--opened');
    } else {
      spollers.forEach(function (item) {
        item.classList.remove('spoller__item--opened');
      });
      spoller.classList.add('spoller__item--opened');
    }
  });
});

// Tel Mask
var telInputs = document.querySelectorAll('input[data-tel-input]');
var getInputNumberValue = function (input) {
  return input.value.replace(/\D/g, '');
};

var onTelInputMask = function (e) {
  var input = e.target;
  var inputNumberValue = getInputNumberValue(input);
  var formattedInputValue = '';
  if (!inputNumberValue) {
    input.value = '';
    return;
  }
  if (inputNumberValue[0] === '9') {
    inputNumberValue = '7' + inputNumberValue;
  }
  var firstSymbols = '+7';
  formattedInputValue = firstSymbols + '';
  if (inputNumberValue.lenght > 1) {
    formattedInputValue += ' (' + inputNumberValue.substring(1, 4);
  }
  input.value = formattedInputValue;
};

telInputs.forEach(function (input) {
  input.addEventListener('input', onTelInputMask);
});
