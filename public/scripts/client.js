/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// A page can't be manipulated safely until the document is "ready."
$(document).ready(function () {
  // Form submission using JQuery
  $(".tweet-form").on("submit", function (event) {
    event.preventDefault();
    const value = $("#tweet-text").val();

    // Validation
    $(".error-message").empty();

    if (value.trim().length > 140) {
      $(".error-message")
        .append(
          '<article class="error-element"><i class="fas fa-exclamation-triangle"></i><span>Too Long! Must Be 140 Characters or Less!</span><i class="fas fa-exclamation-triangle"></i></article>'
        )
        .slideDown();
      return;
    }
    if (value.trim().length === 0) {
      $(".error-message")
        .append(
          '<article class="error-element"><i class="fas fa-exclamation-triangle"></i><span>Tweet Cannot Be Empty!</span><i class="fas fa-exclamation-triangle"></i></article>'
        )
        .slideDown();
      return;
    } else {
      $(".error-message").slideUp(".error-message");
    }
    // Ajax post request
    $.ajax({
      method: "POST",
      url: "http://localhost:8080/tweets",
      data: $(this).serialize(),
    })
      .done(() => {
        console.log("Posted Successfully");
        loadTweets();
        $("#tweet-text").val("");
        $(".counter").replaceWith(
          `<output name="counter" class="counter" style="color: black" for="tweet-text">140</output>`
        );
      })
      .fail((error) => console.log("Failed", error));
  });

  const loadTweets = function () {
    $.ajax({
      method: "GET",
      url: "http://localhost:8080/tweets",
    })
      .done((res) => renderTweets(res))
      .fail((error) => console.log("Failed", error));
  };

  loadTweets();

  const renderTweets = function (tweets) {
    $(".tweet-section").empty();
    for (let tweet in tweets) {
      $(".tweet-section").append(createTweetElement(tweets[tweet]));
    }
  };

  const createTweetElement = function (tweet) {
    let $tweet = $(`<article class="tweet-container">
    <header>
    <span><img id= "tweet-avatar" src="${tweet.user.avatars}"/></span>
    <span id="tweet-name">${tweet.user.name}</span>
    <span id="tweet-handle">${tweet.user.handle}</span>
    </header>
    <p class="tweet-content">${escape(tweet.content.text)}</p>
    <footer class="tweet-footer">
      <span>${timeago.format(tweet.created_at)}</span>
      <span>
        <i class="fas fa-flag tweet-icons"></i>
        <i class="fas fa-retweet tweet-icons"></i>
        <i class="fas fa-heart tweet-icons"></i>
      </span>
    </footer>
  </article>`);

    return $tweet;
  };

  // Prevent XSS attacks
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
});
