/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];
// This function can be responsible for taking in an array of tweet objects and then appending each one to the #tweets-container. In order to do this, the renderTweets will need to leverage the createTweetElement function you wrote earlier by passing the tweet object to it, then using the returned jQuery object by appending it to the #tweets-container section.
$(document).ready(function () {
  const renderTweets = function (tweets) {
    for (let tweet in tweets) {
      $(".container").append(createTweetElement(tweets[tweet]));
    }
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  };

  // define a function createTweetElement that takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet.

  const createTweetElement = function (tweet) {
    let $tweet = $(`<article class="tweet-container">
    <header class="tweet-header">
      <span id="tweet-name"><img id= "tweet-avatar" src="${
        tweet.user.avatars
      }" /> ${tweet.user.name}</span>
      <span id="tweet-handle">${tweet.user.handle}</span>
    </header>
    <p class="tweet-content">${tweet.content.text}</p>
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

  renderTweets(data);
});
