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
  // debugger
};

$.UsersSearch.prototype.handleInput = function(){
      // debugger
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
  $.each(result, function(index, user) {
    var anchor = $("<a>");
    var url = "/users/" + user.id;
    anchor.attr("href", url).html(user.username);
    var li = $("<li>").append(anchor);
    li.appendTo(this.$ul);
  }.bind(this));
};
