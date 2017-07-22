var auto;
var index = 0;
// create an array that holds the 6 images:
var slides = [
    $("#img-0"),
    $("#img-1"),
    $("#img-2"),
    $("#img-3"),
    $("#img-4"),
    $("#img-5")
];

function nextSlide() {
    // disable button to avoid triggering the same event twice:
    $("#next").prop("disabled", true);
    if (index === 5) {
        // if on last image, enable button again and do nothing:
        $("#next").prop("disabled", false);
    }
    else {
        // hide current image and show next:
        slides[index].fadeOut(500, function () {
            index++;
            slides[index].fadeIn(500, function () {
                $("#next").prop("disabled", false);     // enable button again
            });
            $("#slide-number").html(index + 1 + " / 6");
        });
    }
}

function previousSlide() {
    // disable button to avoid triggering the same event twice:
    $("#previous").prop("disabled", true);
    if (index === 0) {
        // if on first image, enable button again and do nothing:
        $("#previous").prop("disabled", false);
    }
    else {
        // hide current image and show previous:
        slides[index].fadeOut(500, function () {
            index--;
            slides[index].fadeIn(500, function () {
                $("#previous").prop("disabled", false);     // enable button again
            });
            $("#slide-number").html(index + 1 + " / 6");
        });
    }
}

function autoSlideShow() {
    // change button settings:
    $("#play").html("&#10074;&#10074;").attr("onclick", "pauseSlideShow()");
    // set interval:
    auto = setInterval(function () {
        // disable buttons to avoid triggering two different events:
        $("#previous, #next").prop("disabled", true);
        if (index === 5) {      // show popup after last image
            clearInterval(auto);
            $("#popup").show();
        }
        else {
            // hide current image and show next:
            slides[index].fadeOut(500, function () {
                index++;
                slides[index].fadeIn(500, function () {
                    $("#previous, #next").prop("disabled", false);  // enable buttons again
                });
                $("#slide-number").html(index + 1 + " / 6");
            });
        }
    }, 3500);   // 0.5s more for the fading animation
}

function pauseSlideShow() {
    clearInterval(auto);
    $("#play").html(" &#9658;").attr("onclick", "autoSlideShow()");
}

function repeatSlideShow() {
    $('#popup').hide();
    // go back to start:
    slides[5].fadeOut(500, function () {
        slides[0].fadeIn(500);
        index = 0;
        $("#slide-number").html("1 / 6");
        autoSlideShow();
    });
}

function stopSlideShow() {
    $('#popup').hide();
    $("#play").html(" &#9658;").attr("onclick", "autoSlideShow()");
    $("#previous, #next").prop("disabled", false);
}