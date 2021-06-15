$(document).ready(function () {
  $("#tweet-text").on("input", function () {
    $(".counter")[0].innerHTML = 140 - this.value.length;
    if (this.value.length > 140) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "black");
    }
  });
});
