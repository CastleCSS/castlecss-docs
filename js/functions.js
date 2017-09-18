'use strict';

// Require jQuery
var $ = require('jquery');

// Init events
var InitEvents = function () {
	navOpen();

	window.onscroll = function(e) {
    	offSetManager();
	}
};
	
// Sticky side menu for desktop
function offSetManager(){

    var yOffset = 110;
    var currYOffSet = window.pageYOffset;
    var menuHeight = $('.doc-menu').height();
	var windowHeight = $(window).height();

    if((yOffset < currYOffSet) && (menuHeight < windowHeight)) {
        $('.nav-wrap').addClass('fixed');
    } else if(yOffset > currYOffSet){
     	$('.nav-wrap').removeClass('fixed');
    }
}

// Open mobile nav menu
function navOpen() {
	$('.nav-label, .open-documentation').on('click', function(e) {
		$('.nav-container').toggleClass('nav-container-active');
		e.preventDefault();
	});
}

// Export module
module.exports = {
	InitEvents: InitEvents
};