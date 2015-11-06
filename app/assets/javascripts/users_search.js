$.UsersSearch = function(el) {
  this.$el = $(el);
  this.$ul = $(el).find("ul");
  this.input = $("#query");
  this.bindEvents();
};

$.fn.usersSearch = function () {
  return this.each(function () {
    new $.UsersSearch(this);
  });
};

$(function () {
  $("div.users-search").usersSearch();
});

$.UsersSearch.prototype.bindEvents = function() {
  this.input.keyup(function(){
    this.handleInput();
  }.bind(this));
};

$.UsersSearch.prototype.handleInput = function(){
  $.ajax({
    url: "/users/search",
    dataType: "json",
    data: {
      query: this.input.val()
    },
    success: function(result){
      this.renderResults(result);
    }.bind(this)
  });
};

$.UsersSearch.prototype.renderResults = function(result) {
  this.$ul.empty();

  var followedString;

  $.each(result, function(index, user) {
    followedString = user.followed ? "followed" : "unfollowed";
    var anchor = $("<a>");
    var url = "/users/" + user.id;
    anchor.attr("href", url).html(user.username);

    var button = $("<button>");
    var options = {
      userId: user.id,
      followState: followedString
    };
    button.followToggle(options);

    var li = $("<li>").append(anchor).append(button);

    li.appendTo(this.$ul);
  }.bind(this));
};
