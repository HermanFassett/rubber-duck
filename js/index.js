// Initialize interval to center eyes
var centering = setInterval(centerEyes, 15000), followMouse = true;

// Mouse move eye follow
$(document).on("mousemove", function(e) {
  // If mouse follow is enabled
  if (followMouse) mouseFollow(e);
});

// Follow mouse
var mouseFollow = function(e) {
  // On mouse move, clear interval
  clearInterval(centering);
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
  // Reset 15 second interval
  centering = setInterval(centerEyes, 15000);
}

// Zoom button
$(".zoom").each(function() {
  $(this).click(function() {
    // Get transform property (comes in form matrix())
    var transform = $(".duck").css("transform");
    // Regex
    var re = /matrix\(([\d\.]+)/;
    // Tacky lookbehind
    var scale = re.exec(transform);
    if (!scale) scale = .1; // Sometimes when too small null
    else scale = scale[1]; // (here's the tacky lookbehind part)
    // If zoom in button, increase scale by ~0.1
    if ($(this).hasClass("in")) scale = parseFloat(scale) + 0.1;
    // If zoom out, decrease by ~0.1
    else scale = parseFloat(scale) - 0.1;
    scale = parseInt(scale * 1000) / 1000; // Slight round off
    // Transform
    $(".duck").css("transform", "translate(-50%, -50%) scale(" + scale + ", " + scale + ")")
  });
});

// Toggle button
$(".toggle").click(function() {
  // Change follow mouse state
  followMouse = !followMouse;
  if ($(this).hasClass("fa-toggle-on")) {
    // Remove animations
    $(".eye").each(function() {
      $(this).css("animation", "none");
    });
    $(".pupil").each(function() {
      $(this).css("animation", "none");
    });
    // Remove link
    $("#body-link").removeAttr("href target");
    // Center eyes
    centerEyes();
    // Change icon
    $(this).removeClass("fa-toggle-on").addClass("fa-toggle-off");
  }
  else {
    // Add animations
    $(".eye").each(function() {
      $(this).css("animation", "eyes 5s infinite step-start 0s");
    });
    $(".pupil").each(function() {
      $(this).css("animation", "pupil 5s infinite step-start 0s");
    });
    // Add link
    $("#body-link").attr("href", "http://www.rubberduckdebugging.com/");
    $("#body-link").attr("target", "_blank");
    // Change icon
    $(this).removeClass("fa-toggle-off").addClass("fa-toggle-on");
  }
});
// Center Eye function
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
