/***************** Waypoints ******************/

$(document).ready(function() {

	$('.wp1').waypoint(function() {
		$('.wp1').addClass('animated fadeInLeft');
	}, {
		offset: '75%'
	});
	$('.wp2').waypoint(function() {
		$('.wp2').addClass('animated fadeInUp');
	}, {
		offset: '75%'
	});
	$('.wp3').waypoint(function() {
		$('.wp3').addClass('animated fadeInDown');
	}, {
		offset: '55%'
	});
	$('.wp4').waypoint(function() {
		$('.wp4').addClass('animated fadeInDown');
	}, {
		offset: '75%'
	});
	$('.wp5').waypoint(function() {
		$('.wp5').addClass('animated fadeInUp');
	}, {
		offset: '75%'
	});
	$('.wp6').waypoint(function() {
		$('.wp6').addClass('animated fadeInDown');
	}, {
		offset: '75%'
	});

});

/***************** Slide-In Nav ******************/

$(window).load(function() {

	$('.nav_slide_button').click(function() {
		$('.pull').slideToggle();
	});

});

/***************** Smooth Scrolling ******************/

$(function() {

	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 2000);
				return false;
			}
		}
	});

});

/***************** Nav Transformicon ******************/

document.querySelector("#nav-toggle").addEventListener("click", function() {
	this.classList.toggle("active");
});

/***************** Overlays ******************/

$(document).ready(function(){
    if (Modernizr.touch) {
        // show the close overlay button
        $(".close-overlay").removeClass("hidden");
        // handle the adding of hover class when clicked
        $(".img").click(function(e){
            if (!$(this).hasClass("hover")) {
                $(this).addClass("hover");
            }
        });
        // handle the closing of the overlay
        $(".close-overlay").click(function(e){
            e.preventDefault();
            e.stopPropagation();
            if ($(this).closest(".img").hasClass("hover")) {
                $(this).closest(".img").removeClass("hover");
            }
        });
    } else {
        // handle the mouseenter functionality
        $(".img").mouseenter(function(){
            $(this).addClass("hover");
        })
        // handle the mouseleave functionality
        .mouseleave(function(){
            $(this).removeClass("hover");
        });
    }
});

/***************** Flexsliders ******************/

$(window).load(function() {

	$('#portfolioSlider').flexslider({
		animation: "slide",
		directionNav: false,
		controlNav: true,
		touch: false,
		pauseOnHover: true,
		start: function() {
			$.waypoints('refresh');
		}
	});

	$('#servicesSlider').flexslider({
		animation: "slide",
		directionNav: false,
		controlNav: true,
		touch: true,
		pauseOnHover: true,
		start: function() {
			$.waypoints('refresh');
		}
	});

	$('#teamSlider').flexslider({
		animation: "slide",
		directionNav: false,
		controlNav: true,
		touch: true,
		pauseOnHover: true,
		start: function() {
			$.waypoints('refresh');
		}
	});
});
/***************** Susbscribe Submit ******************/
$.postForm = function() {
    var $mail = $('#mail').val();
    $.ajax({
        type: "POST",
        url: '/subscribe',
        contentType: "application/json;charset=utf-8",
        dataType: "text json",
        data: {mail:$mail},
        success: function(data) {
            $('#subsub').after("<p class='subscribe_success'>" + data.msg + "</p>");
        }, error: function(httpRequest, textStatus) {
            $('#subsub').after("<p class='subscribe_success'>" + textStatus + "</p>");
        }
    });
}

$(document).ready(function() {
    $(function(){
        $('#mail').blur(function(){
            var $parent = $(this).parent();
            $parent.find(".formtips").remove();
            $parent.find(".subscribe_success").remove();
            var msg = "";
            if(this.value == "" || (this.value != "" && !/.+@.+\.[a-zA-Z]{2,4}$/.test(this.value) ) ){
                msg = "Invalid email address!";
                $parent.append("<p class='formtips onError'>" + msg + "</p>");
            } else {
               $(document).keydown(function(e) {
                    if(e.keyCode == 13) {
                        $parent.find(".formtips").remove();
                        $parent.find(".subscribe_success").remove();
                        $.postForm();
                    }
                });
                $('#subsub').click(function() {
                    $parent.find(".formtips").remove();
                    $parent.find(".subscribe_success").remove();
                    $.postForm();
                });
            }
        });
    });
});

//$(document).ready(function() {
//    $(function(){
//        $('#mail').focus(function(){
//            var $parent = $(this).parent();
//            $parent.find(".formtips").remove();
//            $parent.find(".subscribe_success").remove();
//            var msg = "";
//            if(this.value == "" || (this.value != "" && !/.+@.+\.[a-zA-Z]{2,4}$/.test(this.value) ) ){
//                msg = "Invalid email address!";
//                $parent.append("<p class='formtips onError'>" + msg + "</p>");
//            } 
//            else {
//                $(".formtips").remove();
//                $(".subscribe_success").remove();
//            }
//                //else {
//            //   $('#mail').keydown(function(e) {
//            //        if(e.keyCode == 13) {
//            //            $parent.find(".formtips").remove();
//            //            $parent.find(".subscribe_success").remove();
//            //            $.postForm();
//            //        }
//            //    });
//            //    $('#subsub').click(function() {
//            //        $parent.find(".formtips").remove();
//            //        $parent.find(".subscribe_success").remove();
//            //        $.postForm();
//            //    });
//            //}
//        });
//    });
//});
