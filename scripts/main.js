'use strict';

const page = document.querySelector('.page');
const burger = document.querySelector('.burger');
const menu = document.querySelector('.header__menu');
const fixItems = document.querySelectorAll('.right-fix-padding');
const navLinks = document.querySelectorAll('[data-goto]');
const header = document.querySelector('.header');


burger.addEventListener('click', () => {
  lockPage();
  burger.classList.toggle('active');
  menu.classList.toggle('active');
});

for (const link of navLinks) {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    [...navLinks].forEach(item => item.classList.remove('active'));
    e.target.classList.add('active');

    if (burger.classList.contains('active')) {
      burger.classList.remove('active');
      menu.classList.remove('active');
      lockPage();
    }

    window.scrollTo({
      top: getScrollToBlockValue(e.target),
      behavior: "smooth",
    });
  });
}

function setFixPadding(paddingRight) {
  [...fixItems].forEach(item => item.style.paddingRight = paddingRight);
}
function lockPage() {
  const paddingRight = window.innerWidth - document.documentElement.offsetWidth + 'px';
  setFixPadding(paddingRight);
  page.classList.toggle('lock');
}
function getScrollToBlockValue(link) {
  const block =  document.querySelector(link.dataset.goto);

  if (block) {
    const valueToBlock = block.getBoundingClientRect().top + window.scrollY - header.offsetHeight;
    return valueToBlock | 0;
  }
}
