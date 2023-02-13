'use strict';

///////////////////////////////////////
// Modal window selector
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

// in-page smooth scroll selector
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const header = document.querySelector('.header');

// Tabs selector
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// menu selector
const nav = document.querySelector('.nav');

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
btnScrollTo.addEventListener('click', function () { // add (e) if you ever need the old code
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

//? Page Navigation
//? this process is not efficient if we need to handle more than 100 sections
// document.querySelectorAll('.nav__link').forEach(function(el) {
//   el.addEventListener('click', function(e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//   })
// });

//? The BEST way
// 1. Add event listener to common parent container (element)
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // console.log(e.target); // get where the clicks happens
  e.preventDefault();
  // Matching strategy - if the clicked element has the matching class we want in this case, the li > a link. If not, its ignored.
  if (e.target.classList.contains('nav__link')) {

    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});


//? Tabbed component

//using event delegation rule - 1. Attach event handler to common parent container. 2. Get where the click event comes from
tabsContainer.addEventListener('click', function (e) {
  // if(tab.target.classList.contains('operations__tab')) {
  //   console.log(this.getAttribute('data-tab'));
  // }
  const clicked = e.target.closest('.operations__tab'); // closest() looks for the closest parent matching the class we added which is the button itself

  //? A Guard clause --- an if statement that returns early if some condition is matched
  if (!clicked) return; // if nothing is clicked, we finish the function immediately
  // when we have 'null' returned, by clicking on elements not closest to the parent or matching the clicked, which is a FALSY value, then NOT FALSY will become TRUE

  // but if clicked does EXIST, then, the return will not be executed and the rest of the code will be executed which is the code below it
  //? its a more modern way of writing -- 
  // if (clicked) {
  //   clicked.classList.add('operations__tab--active');
  // }

  // remove active class from tab and content
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(con => con.classList.remove('operations__content--active'));


  // add the active class for tab and content
  clicked.classList.add('operations__tab--active');
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this; // this in this case is the opacity since we use bind 
  }
}

//? we can pass multiple arguements inside a handler functiion and passing it into a callback function using bind() method by just using one argument on the handler and bind to state multiple arguements to be called
// bind create a function on itself so we use it to pass arguments to eventlistener so, JS sees it like we are using a function
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));


// STICKY NAVIGATION
// this initial way of adding classes is not good way
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);
window.addEventListener('scroll', function () {
  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
//? LECTURES 
// STYLES, ATTRIBUTES, AND CLASSES

// STYLES 
// styles applied from JS are applied as inline
message.style.backgroundColor = '#37383d';

//? YOU CAN GET THE STYLES OF AN ELEMENT DYNAMICALLY. Using getComputedStyles() function -- then from the huge object, you can check for whay you want get
// the getComputedStyle are as they appear on the webpage even if they are not declared in the CSS. The browser computes the styles
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// remeber, the Number.parseFloat() takes a string and converts to a number
// message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';


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
// const h1 = document.querySelector('h1');
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
// const alertH1 = function (e) {
//   alert('You are reading the heading! You just hovered');
//   h1.removeEventListener('mouseenter', alertH1);
// }
// h1.addEventListener('mouseenter', alertH1);
//? to remove event listener we need to export the function


// JS EVENTS HAVE VERY IMMPORTANT - CAPTURING PHASE AND BUBBLING PHASE
// once an event listener is fired, the click for example goes from the root which is the document, head, body, the div, elemement clicked ----- this phase is called the CAPTURING PHASE
// ONCE ITS CLICKED ITS --- THE TARGER PHASE
// THEN, THE RETURN FROM THE EVENT IT passes through the parents elements back to te root this is called the BUBBLING PHASE
//? events can only be handled in the TARGET and BUBBLING PHASE but we can also set up handlers for the CAPTURING PHASE
//? when we see EVENT PROPAGATE, it means CAPTURING and BUBBLING

// rgb(255,255,255)
// const randomInit = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () => `rgb(${randomInit(0, 255)}, ${randomInit(0, 255)}, ${randomInit(0, 255)})`;
// console.log(randomColor(0, 255));


// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//       console.log(e.target, e.currentTarget);
// });

// document.querySelector('.nav__links').addEventListener('click', function () {
//   console.log('nav links clicked');
// });

// document.querySelector('.nav').addEventListener('click', function() {
//   console.log('nav clicked');
// });


//? DOM Traversing
// const h1 = document.querySelector('h1');

// Going downwards - selecting child element
// console.log(h1.querySelectorAll('.highlight')); // select any child of a parent

// When need to select DIRECT CHILD of a parent
// console.log(h1.childNodes);
// console.log(h1.children); // returns the child elements in a HTML collection
// console.log(h1.firstElementChild.style.color = 'white'); // select the FIRST CHILD ELEMENT
// console.log(h1.lastElementChild.style.backgroundColor = 'orange'); // select the LAST CHILD ELEMENT
//? Going upward -- selecting parents and parent element
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// h1.closest('header').style.backgroundColor = 'var(--color-secondary)'; // selects the closest parent element that matches the class added. CAN ALSO BE AN ELEMENT TAG
// h1.closest('h1').style.backgroundColor = 'var(--color-tertiary)'; // if the element checking for parent is itself the matching element closest to what is asked it returns itself

//? QUERYSELECTOR/ALL and CLOSEST are the same the difference is QUERY look for children element no matter how deep while CLOSEST looks for parent element no matter how far up the DOM tree

//? Selecting Siblings - Previous element and Next like a child in the middle of 3 kids
// console.log(h1.previousElementSibling); // returns null because it has non
// console.log(h1.nextElementSibling); // returns h4 as its the next sibling

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// GETTING ALL CHILDREN MEANS YOU FIRST GO THE PARENT ELEMENT THEN GET CHILDREN
// console.log(h1.parentElement.children); 
// [...h1.parentElement.children].forEach(function (el) {
//   if(el !== h1) el.style.transform = 'scale(0.5)';
// })
