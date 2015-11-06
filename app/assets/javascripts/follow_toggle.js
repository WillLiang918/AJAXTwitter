$.FollowToggle = function (el, options) {
  this.$el = $(el);
  this.userId = this.$el.data("user-id") || options.userId;
  this.followState = this.$el.data("initial-follow-state") || options.followState;
  this.render();
  this.handleClick();
};

$.FollowToggle.prototype.render = function () {
  if (this.followState === "followed") {
    this.$el.prop("disabled", false);
    this.$el.html("Unfollow!");
  } else if (this.followState === "unfollowed") {
    this.$el.prop("disabled", false);
    this.$el.html("Follow!");
  } else if (this.followState === "following" ||
            this.followState === "unfollowing") {
    this.$el.prop("disabled", true);
  }
};

$.fn.followToggle = function (options) {
  return this.each(function () {
    new $.FollowToggle(this, options);
  });
};

$(function () {
  $("button.follow-toggle").followToggle();
});

$.FollowToggle.prototype.handleClick = function() {
  this.$el.on("click", function(e) {
    e.preventDefault();

    var verb;

    if (this.followState === "followed") {
      this.followState = "unfollowing";
      this.render();
      verb = "DELETE";
    } else if (this.followState === "unfollowed") {
      this.followState = "following";
      this.render();
      verb = "POST";
    }

    $.ajax({
      url: "/users/" + this.userId + "/follow",
      type: verb,
      dataType: "json",
      success: function() {
        if (this.followState === "unfollowing") {
          this.followState = "unfollowed";
        } else if (this.followState === "following") {
          this.followState = "followed";
        }
        this.render();
      }.bind(this)
    });
  }.bind(this));
};
