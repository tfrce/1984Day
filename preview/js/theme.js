$(function () {
    $(window).scroll(function() {
        if ($(".navbar").offset().top>30) {
            $(".navbar-inner").addClass("sticky");
        }
        else {
            $(".navbar-inner").removeClass("sticky");
        }
    });

    // Flex
    if ($(".flexslider").length) {
        $('.flexslider').flexslider();
    }
    
    servicesCircle.initialize();

    staticHeader.initialize();

    portfolioItem.initialize();
    social.initialize();

});

var portfolioItem = {
    initialize: function () {
        var $container = $("#portfolio_tem .left_box");
        var $bigPics = $container.find(".big img");
        var $thumbs = $container.find(".thumbs .thumb");

        $bigPics.hide().eq(0).show();

        $thumbs.click(function (e) {
            e.preventDefault();
            var index = $thumbs.index(this);
            $bigPics.fadeOut();
            $bigPics.eq(index).fadeIn();
        });
    }
}

var staticHeader = {
    initialize: function () {
        if ($(".navbar-static-top").length) {
            $("body").css("padding-top", 0);
        }
    }
}

var servicesCircle = {
    initialize: function () {
        var $container = $(".services_circles");
        var $texts = $container.find(".description .text");
        var $circles = $container.find(".areas .circle");

        $circles.click(function () {
            var index = $circles.index(this);
            $texts.fadeOut();
            $texts.eq(index).fadeIn();
            $circles.removeClass("active");
            $(this).addClass("active");
        });
    }
}


var social = {
    initialize: function () {
        $.getJSON('http://share-cached.taskforce.is/?type=facebook', function(data) {
            var count = data.data[0].total_count;
            $('.facebook-button').attr('count', count);
        })
        $.getJSON('http://share-cached.taskforce.is/?type=twitter', function(data) {
            var count = data.count;
            $('.twitter-button').attr('count', count);
        })
        $.getJSON('http://share-cached.taskforce.is/?type=googleplus', function(data) {
            var count = data.count;
            $('.google-button').attr('count', count);
        })
        var eventId = $('[data-event-id]').attr('data-event-id');
        $.getJSON('http://share.taskforce.is/?type=facebook-event&url=/'+eventId+'/attending?summary=true', function(data) {
            var count = data.summary.count;
            $('.attending').text('Join ' + count + ' people from your city in protest!');
        })
    }
}