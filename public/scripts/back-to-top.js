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
      top = self.scrollTop();

    if (!button.is(":visible")) {
      button.show();
    }
    if (top === 0) {
      button.hide();
    }
  });
});
