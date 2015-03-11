var app = app || {}

app.UserView = Backbone.View.extend({

    el: '#content',

    events: {
        'click #btn-logout'      : 'logoutUser',
        'click #btn-home'        : 'home'
    },

    render: function () {
        var user_logged = localStorage.getItem("session");
        var user_logged_home = JSON.parse(user_logged);
        var template = _.template($('#userTemplate').html(), { comics_collection: app.comicsList.models,
        users_collection: app.usersList.models , user_active: user_logged_home});
        this.$el.html(template); 
               
    },

    logoutUser: function(){
        localStorage.setItem("session", "");
        localStorage.setItem("view", "login");
        app.router.login();
    },

    home: function(){
        localStorage.setItem("view", "home");
        app.router.home();

    }

});

app.profileUser = new app.UserView();