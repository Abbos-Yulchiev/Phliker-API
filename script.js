

let modalId = $('#image-gallery');

$(document).ready(function(){

    // loadGallery(true, 'a.thumbnail');

    $("#search").click(function(){
        const flikerKey = "8e2a8e709dc448d1a96e1632e16fcb69"
        const flikerSecret = "3d7c65cd5549f058"

        var input = $("#input").val();
        if(input!=""){

            // Clearing images;
            $(".imageDiv").html('')

            $.getJSON("https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=" + flikerKey +"&tags=" +
                    input +"&format=json&nojsoncallback=1_&per_page=20&page=0",
                        
                function(result){ 

                    var total = "All images: " + result.photos.total;
                    $("#all").text(total)
                    
                    $.each(result.photos.photo, function(i, data){

                    var imgUrl = "https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg";
        
                    imgUrl = imgUrl.replace("{farm-id}", data.farm);
                    imgUrl = imgUrl.replace("{server-id}", data.server);
                    imgUrl = imgUrl.replace("{id}", data.id);
                    imgUrl = imgUrl.replace("{secret}", data.secret);
                    imgUrl = imgUrl.replace("{size-suffix}", "n");
                    
                    var imgTag = "<img class='img-thumbnail' src=\"{imgUrl}\"  data-id=\"{id}\"  data-farm=\"{farm-id}\" data-server=\"{server-id}\" data-secret=\"{secret-id}\" data-title=\"{title}\">"; 
                    imgTag = imgTag.replace("{farm-id}", data.farm);
                    imgTag = imgTag.replace("{server-id}", data.server);
                    imgTag = imgTag.replace("{id}", data.id);
                    imgTag = imgTag.replace("{secret-id}", data.secret);
                    imgTag = imgTag.replace("{title}", data.title);
                    imgTag = imgTag.replace("{imgUrl}", imgUrl);

                    var title = data.title;

                    var a = "<a class='thumbnail' href='#' data-image-id='' data-toggle='modal' data-title=" + title + " data-image='" + imgUrl + "' data-target='#image-gallery'>"

                    // console.log(data);
                    // console.log(imgUrl)
                    // console.log(imgTag)
                    console.log(result)
                    var images = "<div class='col-lg-3 col-md-4 col-xs-6'>" + a + imgTag + "</div>"

                    // console.log(images);

                    if(i>=0){
                        $(".imageDiv").append(images)
                    }
                });
            }); 
        }
        else{
            alert("Please enter an item's name for search")
        }
        return  input;
    });

    var obj = 2;
    $("#add-img").click(function(){
        
        const flikerKey = "8e2a8e709dc448d1a96e1632e16fcb69"
        const flikerSecret = "3d7c65cd5549f058"
        
        var input = $("#input").val();
        $.getJSON("https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=" + flikerKey +"&tags=" +
                input +"&format=json&nojsoncallback=1_&per_page20&page=" + (obj++),
            function(result){

                $.each(result.photos.photo, function(i, data){

                var imgUrl = "https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg"
                
                imgUrl = imgUrl.replace("{farm-id}", data.farm);
                imgUrl = imgUrl.replace("{server-id}", data.server);
                imgUrl = imgUrl.replace("{id}", data.id);
                imgUrl = imgUrl.replace("{secret}", data.secret);
                imgUrl = imgUrl.replace("{size-suffix}", "n");
                
                var imgTag = "<img class='img-thumbnail' src=\"{imgUrl}\"  data-id=\"{id}\"  data-farm=\"{farm-id}\" data-server=\"{server-id}\" data-secret=\"{secret-id}\" data-title=\"{title}\">"; 
                imgTag = imgTag.replace("{farm-id}", data.farm);
                imgTag = imgTag.replace("{server-id}", data.server);
                imgTag = imgTag.replace("{id}", data.id);
                imgTag = imgTag.replace("{secret-id}", data.secret);
                imgTag = imgTag.replace("{title}", data.title);

                var title = data.title;

                imgTag = imgTag.replace("{imgUrl}", imgUrl);
                var a = "<a class='thumbnail' href='#' data-image-id='' data-toggle='modal' data-title=" + title + " data-image=" + imgUrl + " data-target='#image-gallery'>"
                
                var images = "<div class='col-lg-3 col-md-4 col-xs-6'>" + a + imgTag + "</div>"
                
                if(i!=(-1)){
                    $(".imageDiv").append(a)
                    $(".imageDiv").append(images)

                }
            });
        });
    });
    
    $(document).on('click','img',function(){

        var modalBg = $(".modal-bg")
        var modal = $(".modal")
        

        var id = $(this).data('id');
        var farm = $(this).data('farm');
        var server = $(this).data('server');
        var secret = $(this).data('secret');
        var title = $(this).data('title');

        var imgLink = "https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg";

        imgLink = imgLink.replace("{farm-id}", farm);
        imgLink = imgLink.replace("{server-id}", server);
        imgLink = imgLink.replace("{id}", id);
        imgLink = imgLink.replace("{secret}", secret);
        imgLink = imgLink.replace("{size-suffix}", "n");

        loadGallery(true, 'a.thumbnail', title);    
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });

    //Click event to scroll to top
    $('.scrollToTop').click(function () {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });
});

function disableButtons(counter_max, counter_current) {
    $('#show-previous-image, #show-next-image').show();

    if (counter_max === counter_current) {
      $('#show-next-image').hide();

    } else if (counter_current === 1) {
      $('#show-previous-image').hide();
    }
}

function loadGallery(setIDs, setClickAttr) {

    let current_image, selector, counter = 0;

    $('#show-next-image, #show-previous-image').click(function () {

        if ($(this).attr('id') === 'show-previous-image') {
            current_image--;
        } else {
            current_image++;
        }
        selector = $('[data-image-id="' + current_image + '"]');
        updateGallery(selector);
    });

    function updateGallery(selector) {

        let $sel = selector;
        current_image = $sel.data('image-id');
        $('#image-gallery-title').text($sel.data('title'));
        $('#image-gallery-image').attr('src', $sel.data('image'));

        disableButtons(counter, $sel.data('image-id'));
    }
    if (setIDs == true) {
        $('[data-image-id]').each(function () {
            counter++;
            $(this).attr('data-image-id', counter);
      });
    }
    $(setClickAttr).on('click', function() {
      updateGallery($(this));
    });
}

// build key actions
$(document).keydown(function (e) {
    switch (e.which) {
      case 37: // left
        if ((modalId.data('bs.modal') || {})._isShown && $('#show-previous-image').is(":visible")) {
          $('#show-previous-image')
            .click();
        }
        break;

      case 39: // right
        if ((modalId.data('bs.modal') || {})._isShown && $('#show-next-image').is(":visible")) {
          $('#show-next-image')
            .click();
        }
        break;

      default:
        return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

// // https://farm66.staticflickr.com/65535/50864918071_af39a8ab0b.jpg 
// // data-id="50864918071"  data-farm="66" data-server="65535" data-secret="af39a8ab0b
// ------- this type isn't worrkin on my laptop --------

    // $("img").click(function(){
    //     var id = $(this).data('id');
    //     var farm = $(this).data('farm');
    //     console.log("id : " + id +", farm:  " + farm);
    // });