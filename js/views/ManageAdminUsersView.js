var app = app || {}

app.ManageAdminUsersView = Backbone.View.extend({

    el: '#content',

    events: {
        'click #admin-btn-logout'      : 'logoutUser',
        'click #admin-btn-user'        : 'seeUserProfile',
        'click #admin-btn-home'        : 'home'
    },

    render: function () {
        var user_logged = localStorage.getItem("session");
        var user_logged_home = JSON.parse(user_logged);
		app.usersList.loadCollectionUsers();
        var template = _.template($('#manageUsersTemplate').html(), { users_collection: app.usersList.models , user_active: user_logged_home});
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

    home: function(){
        localStorage.setItem("view", "home");
        app.router.home();

    }

});

app.manageAllUsers = new app.ManageAdminUsersView();

