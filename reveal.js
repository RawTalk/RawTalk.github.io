function reveal(el) {el.classList.add('reveal');}
function hide(el) {el.classList.remove('reveal');}
function isHidden(el) {return !el.classList.contains('reveal');}

// set scroll reveal sequence for element class array
function revealSequence(elArray, delay) {
  for (var i=0; i<elArray.length; i++) {
    setTimeout(function(x) {
      return function() {reveal(elArray[x]);};
    }(i), delay*i);
  }
}

// bool: should we reveal el or not reveal el
function shouldReveal(el, screenFactor) {
  return isHidden(el) && this.scrollY > el.offsetTop - innerHeight*screenFactor;
}

// define scroll reveal elements (uses $ function in main.js)
const associates__item = classArray('associates__item');

window.onscroll = onScroll;

function onScroll() {

    if (shouldReveal(associates__item[0], 5/6)) {
        revealSequence(associates__item, 100);
    }

}
onScroll()