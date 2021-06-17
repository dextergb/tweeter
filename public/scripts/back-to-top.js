$(document).ready(function () {
  const button = $(".back-to-top");

  button.on("click", function (event) {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      500
    );
    event.preventDefault();
  });

  $(window).on("scroll", function () {
    const self = $(this),
      height = self.height(),
      top = self.scrollTop();

    if (top > height) {
      if (!button.is(":visible")) {
        button.show();
      }
    } else {
      button.hide();
    }
  });
});
