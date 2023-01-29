'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// SELECTING ELEMENTS
//? selecting the entire document or webpage. we get access to the root node of the doc
const header = document.querySelector('.header');
// console.log(document.documentElement);
// console.log(document.head); // select the head of the html
// console.log(document.body); // select the body of the html

// const allSections = document.querySelectorAll('.section'); // classes matching section
// console.log(allSections);

// selecting IDs
// document.getElementById('section--1'); 
// selects all tags i.e button, article, section, span, etc and returns an HTMLCOLLECTION
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// getbyClassName also returns a html collection like tagname and updates the DOM automicatically like tagname unlike nodelist
// console.log(document.getElementsByClassName('btn'));


// CREATING AND INSERTING ELEMENTS

// .insertAdjacentElement('stick to using this to create element on the DOM often if you need to build it manually');

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookie for improved analytics.';
message.innerHTML = 'We use cookie for improved analytics. <button class="btn btn--close-cookie">Got it!</button>';

//? prepend adds the element as the FIRST CHILD
// header.prepend(message); // prepend is used to attach our created element to the dom

header.append(message);

//? to clone a DOM element or copy it, we use the cloneNode() method
// header.append(message.cloneNode(true)); // append() adds the element as the last child ina parent

//? to attach an element NOT AS A CHILD but as a SIBLING
// header.before(message); // attach before the element
header.after(message); // attach after the element

//? deleting an element programtically from the DOM
document.querySelector('.btn--close-cookie').addEventListener('click', function () {
  // new way of deleting
  message.remove();

  // old way
  // message.parentElement.removeChild(message);
});

//? SMOOTH SCROLL
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  //? OLD WAY OF DOING SMOOTH SCROLL 

  // ?get coordinates of the section we are scrolling to
  // const s1coords = section1.getBoundingClientRect(section1);
  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect()); // target refers to the parent declaring th code in this case btnScrollTo

  //? get current page scroll position
  // console.log('current Scroll X/Y', window.scrollX, window.scrollY);

  //? get viewport width and height
  // console.log('what you see is VP-w and VP-h', document.documentElement.clientHeight, document.documentElement.clientWidth);

  //? Scrolling to elements
  // window.scrollTo(s1coords.left + window.scrollX, s1coords.top + window.scrollY); // the first is the left and top gotten from the getBoudingClientRect
  // using window now makes it relative to the top of the browser page
  //? the current postion + current scroll

  // window.scrollTo({
  //   left: s1coords.left + window.scrollX, 
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth'
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});


//? LECTURES 
// STYLES, ATTRIBUTES, AND CLASSES

// STYLES 
// styles applied from JS are applied as inline
message.style.backgroundColor = '#37383d';

//? YOU CAN GET THE STYLES OF AN ELEMENT DYNAMICALLY. Using getComputedStyles() function -- then from the huge object, you can check for whay you want get
// the getComputedStyle are as they appear on the webpage even if they are not declared in the CSS. The browser computes the styles
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

// remeber, the Number.parseFloat() takes a string and converts to a number
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';


// using CSS custom properties to set page styles using JS - the :root in css refers to the document in JS
//? we can setProperty just like we do in CSS
// document.documentElement.style.setProperty('--color-primary', 'red');

//? ATTRIBUTES -- attributes as u knw are what are in html elements. img as an attr of src, alt, class, id etc
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.id);
// console.log(logo.className);
// console.log(logo.src);

// this returns absolute path
// console.log(logo.src);
// this returns relative path
// console.log(logo.getAttribute('src'));

// You can set a new value for an attribute of an element
// logo.alt = 'a new logo';
// console.log(logo.alt);

// you can also read an attribute not of the standard passed randomly to an element using the getAttribute()
// console.log(logo.getAttribute('data-test'));  // returns 'test-attr' as the value


// SetAttribute also allow us to create a new attribute with value
// console.log(logo.setAttribute('company', 'a new attribute'));

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href); // returns the whole url -- absolute
// console.log(link.getAttribute('href')); // returns the value of href - relative


// DATA ATTRIBUTES
//? we use data attr alot when we work with the UI and need to store date in HTML
// data attributes as stored in a special number called dataset
// console.log(logo.dataset.test);


// Classes
// logo.classList.add('c', 'a');
// logo.classList.remove('c', 'a');
// logo.classList.toggle('c', 'a');
// logo.classList.contains('c', 'a'); // not includes as seen in arrays


//? Types of event Handlers
const h1 = document.querySelector('h1');
//? mouse enter works like the HOVER property in css
// h1.addEventListener('mouseenter', function (e) {
//   alert('You are reading the heading! You just hovered');
// });

// old way to add event
// h1.onmouseenter = function(e) {
//   alert('You are reading the heading! You just hovered');
// }

//? how to cancel event listener
//? if you want eventlistener to run just once, below is the approach. Adding it to the function to resuse then it runs just once and removed
const alertH1 = function (e) {
  alert('You are reading the heading! You just hovered');
  h1.removeEventListener('mouseenter', alertH1); 
}
h1.addEventListener('mouseenter', alertH1);
//? to remove event listener we need to export the function
