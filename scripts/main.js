'use strict';

const page = document.querySelector('.page');
const burger = document.querySelector('.burger');
const menu = document.querySelector('.header__menu');
const fixItems = document.querySelectorAll('.right-fix-padding');
const navLinks = document.querySelectorAll('[data-goto]');
const header = document.querySelector('.header');
const heroImg = document.querySelector('.hero__img');
const animOpacityItems = document.querySelectorAll('.anim-opacity');

document.addEventListener('DOMContentLoaded', showInk);
window.addEventListener('load', () => {
  showCountsAnim();
});
window.addEventListener('scroll', () => {
  scrollAnim();
});
function scrollAnim() {
  const animItems = document.querySelectorAll('.scroll-anim');
  for (const item of animItems) {
    if (isInView(item, 0.35)) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  }
}

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

function showInk() {
  heroImg.classList.add('active');
  heroImg.addEventListener('load', () => {
    heroImg.style.display = 'block';
  })
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
function showCountsAnim() {
  function initCounts(countsItems) {
    const counts = countsItems ? countsItems : document.querySelectorAll('[data-counter]');
    [...counts].forEach(item => countAnimate(item));
  }
  function countAnimate(count) {
    let startTimestamp = null;
    const duraction = parseInt(count.dataset.counter) ? parseInt(count.dataset.counter) : 1000;
    const startValue = parseInt(count.innerHTML);
    const startPosition = 0;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duraction, 1);
      count.innerHTML = Math.floor(progress * (startPosition + startValue));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  const options = { threshold: 0.5 };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetElem = entry.target;
        const countersIntems = targetElem.querySelectorAll('[data-counter]');
        if (countersIntems.length) {
          initCounts(countersIntems);
        }
      }
    });
  }, options);

  const countsSections = document.querySelectorAll('.digits');
  [...countsSections].forEach(section => observer.observe(section));
}
function isInView(elem, persent=0.35) {
  const rect = elem.getBoundingClientRect();
  const elemHeight = elem.offsetHeight;
  const visiblePart = elemHeight * persent;
  
  return rect.bottom > 0 && rect.top < (
    window.innerHeight - visiblePart || document.documentElement.clientHeight - visiblePart);
}
