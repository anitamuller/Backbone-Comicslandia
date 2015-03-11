var app = app || {}

app.BorrowComicsView = Backbone.View.extend({

    el: '#content',

    events: {
        'click #borrow-btn-logout'      : 'logoutUser',
        'click #borrow-btn-user'        : 'seeUserProfile',
        'click #borrow-btn-home'        : 'home'
    },

    render: function () {
        var user_logged = localStorage.getItem("session");
        var user_logged_home = JSON.parse(user_logged);
        app.comicsList.loadCollectionComics();
        var template = _.template($('#borrowComicsTemplate').html(), { comics_collection: app.comicsList.models,
        users_collection: app.usersList.models , user_active: user_logged_home});
        this.$el.html(template); 
               
    },

    logoutUser: function(){
        localStorage.setItem("session", "");
        localStorage.setItem("view", "login");
        app.router.login();
    },

    seeUserProfile: function(){
        localStorage.setItem("view", "seeUserProfile");
        app.router.seeUserProfile();
    },

    home: function(){
        localStorage.setItem("view", "home");
        app.router.home();

    }

});

app.borrowComics = new app.BorrowComicsView();