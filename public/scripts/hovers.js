// Function to set the colour of the primary nav when the sub nav is hovered over
function listHovers() {

  on('#js-menu-list', 'mouseover', '.nested-menu', function(e) {

    if( window.innerWidth > 768) {
      addClass(this.parentElement, 'hovering');
    }


  });

  on('#js-menu-list', 'mouseout', '.nested-menu', function(e) {

    if( window.innerWidth > 768) {
      removeClass(this.parentElement, 'hovering');
    }

  });
}