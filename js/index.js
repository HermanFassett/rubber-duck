// Initialize interval to center eyes
var centering = setInterval(centerEyes, 15000), followMouse = true, timeout, scale = 1;

// Load size
$(document).ready(function() {
  scale = parseFloat(localStorage.duckScale) || 1;
  $(".duck").css("transform", "translate(-50%, -50%) scale(" + scale + ", " + scale + ")")
});
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
  function zoomDuck(inp) {
    if ($(inp).hasClass("in")) scale += 0.1;
    // If zoom out, decrease by amount
    else if (scale > 0.1) scale -= 0.1;
    if (scale < 0) scale = 0;
    scale = parseInt(scale * 1000) / 1000;
    console.log(scale);
    // Transform
    $(".duck").css("transform", "translate(-50%, -50%) scale(" + scale + ", " + scale + ")")
  }
  $(this).click(function(e) {
    zoomDuck(this);
  });
  $(this).mousedown(function(event) {
    var self = this;
    timeout = setInterval(function() { zoomDuck(self) }, 100);
  });
  $(this).mouseup(function(event) {
    // Clear scaling interval
    clearInterval(timeout);
    // Save size
    localStorage.duckScale = scale;
    return false;
  })
});

// Toggle button
$(".toggle").click(function() {
  if ($(this).hasClass("fa-check-square-o")) {
    if ($(this).text().match(/blink/i)) {
      // Remove animations
      $(".eye").each(function() {
        $(this).css("animation", "none");
      });
      $(".pupil").each(function() {
        $(this).css("animation", "none");
      });
    }
    else if ($(this).text().match(/link/i)) {
      // Remove link
      $("#body-link").removeAttr("href target");
    }
    else {
      followMouse = false;
      // Center eyes
      centerEyes();
    }
    // Change icon
    $(this).removeClass("fa-check-square-o").addClass("fa-square-o");
  }
  else {
    if ($(this).text().match(/blink/i)) {
      // Add animations
      $(".eye").each(function() {
        $(this).css("animation", "eyes 5s infinite step-start 0s");
      });
      $(".pupil").each(function() {
        $(this).css("animation", "pupil 5s infinite step-start 0s");
      });
    }
    else if ($(this).text().match(/link/i)) {
      // Add link
      $("#body-link").attr("href", "http://www.rubberduckdebugging.com/");
      $("#body-link").attr("target", "_blank");
    }
    else followMouse = true;
    // Change icon
    $(this).removeClass("fa-square-o").addClass("fa-check-square-o");
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
