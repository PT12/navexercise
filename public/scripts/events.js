// All the clicks events for the page
function events() {
  var html = document.querySelector('html');

  var openCanvas = document.getElementById('js-open-canvas');
  var closeCanvas = document.getElementById('js-close-canvas');
  var mainContent = document.getElementById('js-main-content');
  var overlay = document.getElementById('js-overlay');
  var lists = document.getElementById('js-menu-list').getElementsByClassName('nav-item');

  function hideDropDowns() {    

    for (var i = 0; i < lists.length; i++) {

      if(hasClass(lists[i].querySelector('a'), 'chevron')) {
        removeClass(lists[i].querySelector('a'), 'chevron-open');
      }

      removeClass( lists[i], 'show' );
    }
  }

  openCanvas.onclick = function(e) {
    e.preventDefault();

    addClass(html, 'open-menu');
    addClass(overlay, 'show');

    openCanvas.style.display = 'none';
    closeCanvas.style.display = 'block';

  }

  closeCanvas.onclick = function(e) {
    e.preventDefault();

    removeClass(html, 'open-menu');
    removeClass(overlay, 'show');

    openCanvas.style.display = '';
    closeCanvas.style.display = 'none';

  }

  mainContent.onclick = function(e) {
    e.preventDefault();

    openCanvas.style.display = '';
    closeCanvas.style.display = 'none';

    removeClass(html, 'open-menu');
  }

  overlay.onclick = function(e) {
    e.preventDefault();

    openCanvas.style.display = '';
    closeCanvas.style.display = 'none';

    // When the overlay is clicked, all the dropdowns should disappear and on mobile the chevrons should point upwards
    hideDropDowns();

    removeClass(html, 'open-menu');
    removeClass(overlay, 'show');
  }

  // Resize event to hide all dropdowns when the screen size is expanded
  window.onresize = function(e) {

    if (window.innerWidth > 768) {
        hideDropDowns();
      }   
  };

}