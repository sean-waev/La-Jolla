(function ($) {
	var ua = window.navigator.userAgent;
	var isIE = /MSIE|Trident/.test(ua);

	if ( !isIE ) {
		//IE specific code goes here
		"use strict";
	}

	const body = document.body;
	const scrollUp = "scroll-up";
	const scrollDown = "scroll-down";
	let lastScroll = 100;

	window.addEventListener("scroll", () => {
	  	const currentScroll = window.pageYOffset;
	  	if (currentScroll <= 0) 
	  	{
	    	body.classList.remove(scrollUp);
	    	return;
	  	}

	  	if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) 
	  	{
	    	// down
	    	body.classList.remove(scrollUp);
	    	body.classList.add(scrollDown);
	  	} 
	  	else if ( currentScroll < lastScroll && body.classList.contains(scrollDown) ) 
	  	{
	    	// up
	    	body.classList.remove(scrollDown);
	    	body.classList.add(scrollUp);
	  	}

	  	lastScroll = currentScroll;
	});

	$('.navbar-toggle').sidr({
		name: 'sidr-main',
		side: 'right',
		source: '#sidr',
		displace: false,
		renaming: false,
	});

	$('.navbar-toggle.in').on('click', function(e){
		e.preventDefault();
		$.sidr('close', 'sidr-main');
	});

	$(window).scroll(function(){
		if($("body").scrollTop() > 0 || $("html").scrollTop() > 0) {
			$.sidr('close', 'sidr-main');
		}
	});

   	$('.navbar-nav .dropdown-toggle').click(function(){
        $(this).parent().parent().toggleClass('show');
    });

    $('.navbar-nav li a').on('click', function(event) {
       	if (this.hash !== '') {
         	event.preventDefault();

         	const hash = this.hash;

         	$('html, body').animate({
             	scrollTop: $(hash).offset().top
           	}, 1000, "easeInOutExpo");
	        
	        return false;
       	}

       	$('.navbar-nav li a').removeClass('active');

       	$(this).addClass('active');
    });

	function setGutterHeight(){
		var header = document.querySelector('.header'),
			  gutter = document.querySelector('.header-gutter');
		if (gutter) {
			gutter.style.height = header.offsetHeight + 'px';
		}
	}
	window.onload = setGutterHeight;
	window.onresize = setGutterHeight;

	$('.scrollDown').click(function() {
	    var target = $('#primary');
	    var space = $(this).data('space');

	    if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top - space
	        }, 1000);
	    }
	});

    var rellax = new Rellax('.rellax');

	function stickyKit() {
	    var reset_scroll;

	    $(function() {
	        return $("[data-sticky_column]").stick_in_parent({
	            parent: "[data-sticky_parent]",
	            offset_top: 120,
	            bottoming: true,
	        });
	    });

	    reset_scroll = function() {
	        var scroller;
	        scroller = $("body,html");
	        scroller.stop(true);

	        if ($(window).scrollTop() !== 0) {
	            scroller.animate({
	                scrollTop: 0
	            }, "fast");
	        }
	        return scroller;
	    };

	    window.scroll_it = function() {
	        var max;
	        max = $(document).height() - $(window).height();

	        return reset_scroll().animate({
	            scrollTop: max
	        }, max * 3).delay(100).animate({
	            scrollTop: 0
	        }, max * 3);
	    };

	    window.scroll_it_wobble = function() {
	        var max, third;
	        max = $(document).height() - $(window).height();
	        third = Math.floor(max / 3);

	        return reset_scroll().animate({
	            scrollTop: third * 2
	        }, max * 3).delay(100).animate({
	            scrollTop: third
	        }, max * 3).delay(100).animate({
	            scrollTop: max
	        }, max * 3).delay(100).animate({
	            scrollTop: 0
	        }, max * 3);
	    };

	    $(window).on("load", (function(_this) {
	        return function(e) {
	            return $(document.body).trigger("sticky_kit:recalc");
	        };
	    })(this));

	    $(window).on("resize", (function(_this) {
	        return function(e) {
	            return $(document.body).trigger("sticky_kit:recalc");
	        };
	    })(this));
	}

	var window_width = $(window).width();

	if (window_width < 992) {
	    $(document.body).trigger("sticky_kit:detach");
	} else {
	    stickyKit();
	}

	$( window ).resize(function() {
	    window_width = $( window ).width();
	    if (window_width < 992) {
	        $(document.body).trigger("sticky_kit:detach");
	    } else {
	        stickyKit();
	    }
	});

	/*** Image to SVG */
	$('img.svg').each(function(){
	    var $img = $(this);
	    var imgID = $img.attr('id');
	    var imgClass = $img.attr('class');
	    var imgURL = $img.attr('src');
	
	    $.get(imgURL, function(data) {
	        var $svg = $(data).find('svg');
	
	        if(typeof imgID !== 'undefined') {
	            $svg = $svg.attr('id', imgID);
	        }
	        if(typeof imgClass !== 'undefined') {
	            $svg = $svg.attr('class', imgClass+' replaced-svg');
	        }
	
	        $svg = $svg.removeAttr('xmlns:a');
	        
	        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
	            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
	        }
	
	        $img.replaceWith($svg); 
	
	    }, 'xml');
	});

    try{Typekit.load({ async: true });}catch(e){};

	var BrowserDetect = {
	    init: function () {
	        this.browser = this.searchString(this.dataBrowser) || "Other";
	        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
	    },
	    searchString: function (data) {
	        for (var i = 0; i < data.length; i++) {
	            var dataString = data[i].string;
	            this.versionSearchString = data[i].subString;

	            if (dataString.indexOf(data[i].subString) !== -1) {
	                return data[i].identity;
	            }
	        }
	    },
	    searchVersion: function (dataString) {
	        var index = dataString.indexOf(this.versionSearchString);
	        if (index === -1) {
	            return;
	        }

	        var rv = dataString.indexOf("rv:");
	        if (this.versionSearchString === "Trident" && rv !== -1) {
	            return parseFloat(dataString.substring(rv + 3));
	        } else {
	            return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
	        }
	    },

	    dataBrowser: [
	        {string: navigator.userAgent, subString: "Edge", identity: "MSEdge"},
	        {string: navigator.userAgent, subString: "MSIE", identity: "Explorer"},
	        {string: navigator.userAgent, subString: "Trident", identity: "Explorer"},
	        {string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
	        {string: navigator.userAgent, subString: "Opera", identity: "Opera"},  
	        {string: navigator.userAgent, subString: "OPR", identity: "Opera"},  

	        {string: navigator.userAgent, subString: "Chrome", identity: "Chrome"}, 
	        {string: navigator.userAgent, subString: "Safari", identity: "Safari"}       
	    ]
	};
	
	BrowserDetect.init();
	document.body.classList.add( BrowserDetect.browser ); 

	var dataBlog = {
		paged: 1, 
		append: false,
		formDataBlog: null,
		action: 'blogfilter',
	};

	function isNumber(num) {
		return !Number.isNaN(parseFloat(num));
	}

    function queryAjaxBlog( dataBlog = null ) {
	  	$.ajax({
	  	 	data: dataBlog,
	  	 	type: 'POST',
	  	 	//async: false,
	  	 	dataType: 'html',
	  	 	url: ajax.ajaxurl,
	  	 	beforeSend: function() 
	  	 	{
	  	 		$.LoadingOverlay("show");
	  	 	},
	  	 	success: function(resp)
	  	 	{
	  	 		if ( resp ) 
	  	 		{
	  	 			var jsonData = JSON.parse(resp);
	  	 			console.log(jsonData);

	  	 			if( dataBlog.append ) 
	  	 			{
	  	 			    $('#loadAjaxBlog').append(jsonData.posts);
	  	 			} 
	  	 			else 
	  	 			{
	  	 				$('#loadAjaxBlog').html(jsonData.posts);
	  	 			}

  	 				$('.pagination-wrapper').html(jsonData.pagination);

  	 				$.LoadingOverlay("hide");
	  	 		}
	  	 	},
	  	 	error: function( jqXHR, textStatus, errorThrown) 
	  	 	{
	  	 		console.log( jqXHR, textStatus, errorThrown);
	  	 	}
	  	});
  	}

	$('#blogFormFilter').on("change", function(e){
		e.preventDefault();
		var formDataBlog = $(this).serialize();
		dataBlog.formDataBlog = formDataBlog;
		dataBlog.append = false;
		dataBlog.paged = 1;
		queryAjaxBlog(dataBlog);
	});
	
	$('#blogFormFilter').on("submit", function(e){
		e.preventDefault();
		var formDataBlog = $(this).serialize();
		dataBlog.formDataBlog = formDataBlog;
		dataBlog.append = false;
		dataBlog.paged = 1;
		queryAjaxBlog(dataBlog);
	});

	$('body').on('click', '.pagination-wrapper .arrow', function (e) {
	    e.preventDefault();
	    var that = this;

	    var formDataBlog = $('#blogFormFilter').serialize();
	    dataBlog.formDataBlog = formDataBlog;
	    dataBlog.append = false;
	    dataBlog.paged = $(that).data('page');
	    queryAjaxBlog(dataBlog);
	});

	// Archive Page
	$( window ).load(function() {
	  	$('#transactionsFormFilter button[type="submit"]').click();
	});

}(jQuery));
