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
header.before(message); // attach before the element
// header.after(message); // attach after the element


//? deleting an element programtically from the DOM
document.querySelector('.btn--close-cookie').addEventListener('click', function() {
  // new way of deleting
  message.remove();

  // old way
  // message.parentElement.removeChild(message);
});
