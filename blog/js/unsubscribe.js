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

/***************** Susbscribe Submit ******************/
$.postForm = function() {
    var $mail = $('#mail').val();
    $.ajax({
        type: "POST",
        url: '/unsubscribe',
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
            if(this.value == "" || (this.value != "" && !/.+@.+\.[a-zA-Z]{2,4}$/.test(this.value) ) ) {
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
                    $('#mail').parent.find(".formtips").remove();
                    $('#mail').parent.find(".subscribe_success").remove();
                    $.postForm();
                });
            }
        });
    });
});
