
// initiate left nav. Page level initialization is also needed. 
var activateNav = function(navLink){

	// $('.sub-nav').hide();
	// $('.nav-header').removeClass('active-header');
	
	$('#' + navLink + '-link').addClass('active-header');
    $('#' + navLink + '-nav .sub-nav').show();
    // $('body').scrollspy({ target: '#'+ navLink + '-nav' });
    

};

$(function(){
    
    // initiate scroll spy
    $('body').scrollspy({ target: '.left-nav' });
    
    // smooth scrolling to target when clicked on left nav sub menu
    $('.sidebar-offcanvas a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
    });

    // Mobile menu 
    $("#nav-toggle").on( "click", function(e) {
        e.preventDefault();

        var state = parseInt($('#content').css('left'),10) > 200;
        
        $('#left-nav').animate({'left':(state ? -220: 0)}, 'fast');        
        $('#content').animate({'left': (state ? 0 : 220)}, 'fast');
        $('.top-nav').animate({'margin-left': (state ? 0 : 220)}, 'fast');

    });

    // off canvas menu 
    $('[data-toggle="offcanvas"]').click(function () {
        $('.row-offcanvas').toggleClass('active')
    });

    // Initialize bootstrap tooltip and popover
    $("[rel='tooltip']").tooltip();
    $("[data-toggle='popover']").popover();

    // Enabling Popover
    $(".ui-tooling-btn").popover({
        html : true, 
        content: function() {
          return $('.ui-tooling-btnHiddenContent').html();
        },
        title: function() {
          return $('.ui-tooling-btnHiddenTitle').html();
        }
    });

    // layouts person interaction 
    $(".layout-personas").find(".circle").click(function(){

        var circle = $(".layout-personas").find(".circle");
        circle.removeClass("active");
        $(this).addClass("active");
        console.log('test');

    });


    $(".code-snippet").each(function(){

        var preMarkup = "<a href='#' class='circle code-toggle'><span class='code-open'>&lt; / &gt;</span> <span class='code-close hyicon-remove'></span></a><hr><span class='caption'>code snippet</span>";

        // var postMarkup = "</div>"

        $(this).parent().prepend(preMarkup);
        // $(this).parent().append(postMarkup);

    });

    // code snippet toggle
    $('.code-toggle').click(function(e){

        e.preventDefault();
        $(this).toggleClass('open-circle');
        $(this).parent().find('.code-snippet').slideToggle();
        $(this).find('.code-open, .code-close').toggle();

    });


    // Super nav
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('.navbar-super').outerHeight();

    $(window).scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();
        
        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta)
            return;
        
        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            $('.navbar-super').css('top', '-60px');
        } else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {
                $('.navbar-super').css('top', '0px');
            }
        }
        
        lastScrollTop = st;
    }


});