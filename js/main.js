jQuery(function($) {

    var updateArrows = function(){
        $('.instagram-right').removeClass('disabled');
        $('.instagram-left').removeClass('disabled');
        var curIndex = $('.instagram-carousel.active').data('index');
        updateArrows.nbrOfItems = updateArrows.nbrOfItems || $('.instagram-carousel').length -1;

        curIndex === updateArrows.nbrOfItems && $('.instagram-right').addClass('disabled');
        curIndex === 0 && $('.instagram-left').addClass('disabled');
    }
    $('.instagram-carousel').on('click', function(e){
        scrollTo = $('body').scrollTop();
       $('body').addClass('noscroll');
       $('body').css('position', 'fixed');
        $('.instagram-col-1, .instagram-col-2').removeClass('active');
        $(this).addClass('active');
        showModal($(this));
        updateArrows();
    });

    $('body').on('click', '.instagram-right, .instagram-left', function(e){
        if($(this).hasClass('disabled')) return;
        var curIndex = $('.instagram-carousel.active').data('index');
        var nextItemIndex = parseInt(curIndex+1);
        if($(this).hasClass('instagram-left')){
            nextItemIndex-=2;
        }
        var nextItem = $('.instagram-carousel[data-index='+nextItemIndex+']');
       // console.log(nextItemIndex);
        if(nextItem.length > 0){
            $('.instagram-col-1, .instagram-col-2').removeClass('active');
            $('body').find('.instagram-wrapper').remove();
            showModal($(nextItem.get(0)));
            nextItem.first().addClass('active');
        }
        updateArrows();
    });

    var modalHtml = '';
    showModal = function(that){
     //   console.log(that);
        var username = that.data('username'),
        location = that.data('location'),
        imagetext = that.data('imagetext'),
        likes =  that.data('likes'),
        imagepath = that.data('imagepath'),
        instagramUrl = that.data('url');
        postURL =  that.data('posturl');

        maxHeight = $(window).height()-100;

        if ($('.instagram-wrapper').length === 0) {
            if(typeof imagepath !== 'undefined') {
                modalHtml = "<div class='instagram-wrapper'>";
                modalHtml += "<div class='instagram-modal'><span class='instagram-left'><span class='icons icon-arrow-left6'></span></span><span class='instagram-right'><span class='icons icon-arrow-right6'></span></span>";
                modalHtml += "<div class='container'>";
                modalHtml += "<span class='icons iconscircle-cross close-icon'></span>";
                modalHtml += "<div class='instagram-scrollbox' style='max-height:"+maxHeight+"px'><div class='instagram-modal-image'>";
                modalHtml += "<img src='"+imagepath+"' alt='Instagram image'>";
                modalHtml += "</div>";
                modalHtml += "<div class='instagram-modal-text'>";
                modalHtml += "<span class='instagram-modal-username'><a href='"+postURL+"'>"+username+"</a> </span>"
                modalHtml += "<span class='instagram-modal-location'>"+location+"</span>";
                modalHtml += "<span class='instagram-item-modal-likes'>";
                modalHtml += "<span class='icons icon-heart'></span>";
                modalHtml += "<a href='"+postURL+"'>"+likes+"</a>";
                modalHtml += "</span>";
                modalHtml += "<span class='instagram-modal-imagetext'>";
                modalHtml += "<p>"+imagetext+"</p>";
                modalHtml += "</span></div></div></div></div></div>";
                $('body').append(modalHtml).fadeIn(2500);
            }
        }
    };

    $('body').on( 'click','.instagram-wrapper', function(e) {
        if($(e.target).hasClass('.instagram-wrapper')){
            removeModal();
        }
    });
    $('body').on('click', '.instagram-modal .iconscircle-cross', function(e){
        removeModal();
    });

     var removeModal = function(){
        $('body').find('.instagram-wrapper').remove();
        $('body').removeClass('noscroll');
        $('body').css('position', 'static');
        $('body').animate({scrollTop: scrollTo}, 0);
    };

    // Avoid break on small devices
    var instagramScrollMaxHeight = function() {
        if ($('.instagram-scrollbox').length) {
            maxHeight = $(window).height()-100;
            $('.instagram-scrollbox').css('max-height',maxHeight+'px');
        }
    }
    $(window).resize(function() { // set event on resize
        clearTimeout(this.id);
        this.id = setTimeout(instagramScrollMaxHeight, 100);
    });
    document.onkeydown = function(evt) {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
            removeModal();
        }
    };

});
