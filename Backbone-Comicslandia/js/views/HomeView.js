var app = app || {}

app.HomeView = Backbone.View.extend({

    el: '#content',

    events: {
        'click #btn-logout'      : 'logoutUser',
        'click #btn-user'        : 'seeUserProfile',
        'click #manage-users'    : 'manageUsersAdmin',
        'click #manage-comics'   : 'manageComicsAdmin',
        'click #borrow-comics'   : 'borrowComics'

    },

    render: function () {
        var user_logged = localStorage.getItem("session");
        var user_logged_home = JSON.parse(user_logged);

        app.comicsList.loadCollectionComics();
        var template = _.template($('#homeTemplate').html(), { comics_collection: app.comicsList.models, users_collection: app.usersList.models , user_active: user_logged_home});
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

    manageUsersAdmin: function(){
        localStorage.setItem("view", "manageUsersAdmin");
        app.router.manageUsersAdmin();
    },

    manageComicsAdmin: function(){
        localStorage.setItem("view", "manageComicsAdmin");
        app.router.manageComicsAdmin();
    },

    borrowComics: function(){
        localStorage.setItem("view", "borrowComics");
        app.router.borrowComics();
    }

});

app.home = new app.HomeView();

