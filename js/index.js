$(document).on("mousemove", function(e) {
  $(".pupil").each(function() {
    var x = e.pageX, // Page x
        y = e.pageY; // Page y
    var pupil = {
      x: $(this).offset().left,
      y: $(this).offset().top,
      h: $(this).height(),
      w: $(this).width(),
      r: $(this).width() / 2
    }
    var parent = $(this).parent();
    var eye = {
      x: $(parent).offset().left,
      y: $(parent).offset().top,
      h: $(parent).height(),
      w: $(parent).width(),
      r: $(parent).width() / 2
    }
    var left = (pupil.x < x) ? 5 : -5;
    var top = (pupil.y < y) ? 5 : -5;
    var margin_left = -15 + left,
        top = 10 + top;
    $(this).css({
      "margin-left": margin_left + "px",
      "top": top + "px"
    })
  });
});
var centerEyes = function() {
  $(".pupil").each(function() {
    var margin_left = -15,
        top = 10;
    $(this).css({
      "margin-left": margin_left + "px",
      "top": top + "px"
    })
  });
}
var centering = setInterval(centerEyes, 15000);
