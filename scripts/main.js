'use strict';

const page = document.querySelector('.page');
const burger = document.querySelector('.burger');
const menu = document.querySelector('.header__menu');

burger.addEventListener('click', () => {
  page.classList.toggle('lock');
  burger.classList.toggle('active');
  menu.classList.toggle('active');
});
