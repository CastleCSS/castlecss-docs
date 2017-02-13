'use strict';

var $ = require('jquery');

var InitEvents = function () {
	navOpen();

	window.onscroll = function(e) {
    	offSetManager();
	}
};
	
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

function navOpen() {
	$('.nav-label, .open-documentation').on('click', function(e) {
		$('.nav-container').toggleClass('nav-container-active');
		e.preventDefault();
	});
}

module.exports = {
	InitEvents: InitEvents
};