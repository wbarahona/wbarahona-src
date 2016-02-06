'use strict';

var listeners       = {};

var $sidemenu           = $('.nav-bar li a');
var $sectionContainer   = $('.section-content');

//
// Declare here all listener
// ------------------------------------------------------------------
    listeners.setupSideMenu = function () {
        $sidemenu.each(function (index) {
            var $thisSideMenu           = $(this);

            $thisSideMenu.click(function (e) {
                e.preventDefault();
                var sectionID           = $thisSideMenu.attr('href');
                $sectionContainer.stop(1,1).fadeOut(200);
                $(sectionID).fadeIn(500);
            });
        });
    };

//
// Init all thangs here
// ------------------------------------------------------------------
    listeners.init          = function () {
        listeners.setupSideMenu();
    };


module.exports = listeners;
