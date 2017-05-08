(function() {
  function addClass(elt, className) {
    elt.className += ' ' + className;
  }

  function removeClass(elt, className) {
    elt.className = elt.className.replace(className, '').replace('  ', ' ');
  }
  
  function toggleClass(elt, className) {
    if(!elt || !className) return;

    var classFound = elt.className.indexOf(className) !== -1;
    if(classFound) {
      removeClass(elt, className);
    } else {
      addClass(elt, className);
    }
  }

  function toggleNav() {
    var navItems = document.getElementById('nav-items');
    toggleClass(navItems, 'nav__items--fullscreen');
    toggleClass(document.body, 'modal-open');
  }

  var hamburger = document.getElementById('hamburger');
  hamburger.onclick = function(evt){
    var navItems = document.getElementById('nav-items');
    toggleNav();
  } 

  var cross = document.getElementById('cross');
  cross.onclick = function(evt) {
    var navItems = document.getElementById('nav-items');
    toggleNav();
  }
})();