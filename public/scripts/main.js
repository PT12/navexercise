// Function to get the json that has all the menu items
function getData() {
  var request = new XMLHttpRequest();
  request.open('GET', '/api/nav.json', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      var navList = JSON.parse(request.responseText);

      addMenuItem(navList.items);

    } else {
      // We reached our target server, but it returned an error
      console.log('error retrieving data from server');
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
    console.log('error in connecting');
  };

  request.send();
}


// Function that adds a menu item for each object within the json file
function addMenuItem(data) {

  //  Get the ul the li's will be appended to
  var menuList = document.getElementsByClassName('menu-list')[0];

  // Iterate over the json object
  for ( var key in data) {

    //Create the li that will be added to ul and give it a class name
    var menuItem = document.createElement('li');
    menuItem.className = 'nav-item';

    var nestedItem = document.createElement('ul');
    nestedItem.className = 'nested-menu';

    // Add the link to the li and then append the whole li to the ul
    menuItem.innerHTML = '<a href=" ' + data[key].url + ' ">' + data[key].label + '</a>';

    if( data[key].hasOwnProperty('items') ) {

      for (item in data[key].items) {

        // Add a chevron on mobile for the list elements with a sub navigation
        menuItem.querySelector('a').className = 'chevron';

        nestedItem.innerHTML += '<li><a href=" ' + data[key].items[item].url +  '">' + data[key].items[item].label + '</a></li>';

        menuItem.appendChild(nestedItem);
      }
      
    }

    menuList.appendChild(menuItem);
  }
}

// Function to add a mask - a mask is added only when there is a subnavigation or in mobile layout
function addMask() {

  var nestedMenu = document.getElementsByClassName('nested-menu');
  var overlay = document.getElementById('js-overlay');

  // this function is only called, when a list item with 'nav-item' class is called - this prevents the sub nav items from firing this function

  on('#js-menu-list', 'click', '.nav-item', function(e) {

      // Hide all other dropdowns

      var lists = document.getElementById('js-menu-list').getElementsByClassName('nav-item');

      for (var i = 0; i < lists.length; i++) {

        if(hasClass(lists[i], 'show') && lists[i] != this) {

          removeClass( lists[i], 'show' );
        }

        if(hasClass(lists[i].querySelector('a'), 'chevron')) {
          removeClass(lists[i].querySelector('a'), 'chevron-open');
        }

      }

      // Remove the overlay and then reapply it when a list item is clicked
      if (window.innerWidth > 768) {
        removeClass(overlay, 'show');
      }      

      toggleClass(this, 'show');

      if( hasClass(this, 'show') ) { 

        // If there is a nested menu show the overlay and switch the chevron on mobile - css has display none for chevron on desktop

        if(hasClass(this.querySelector('a'), 'chevron') && !hasClass(overlay, 'show')) {
          addClass(overlay, 'show');
        }

        if( this.querySelector('.nested-menu') ) {
          toggleClass(this.querySelector('a'), 'chevron-open'); 
        }

      }      

  });

}

// Load functions once all assets have finished loading
window.onload = function() {
  getData();
  events();
  addMask();
  listHovers();
}