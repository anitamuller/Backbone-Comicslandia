var app = app || {}

app.RegisterView = Backbone.View.extend({

    el: '#content',

    template: $('#registerTemplate').html(),

    events: {
        'click #btn-redirect-login'      : 'login',
        'keyup #epeat-password-register' : 'enter',
        'click #btn-register-user'		 : 'register'
    },

    render: function () {
        this.$el.html( this.template );
    },

    login: function () {
        localStorage.setItem("view", "login");
        app.errorLogin = "";
        app.router.login();
    },

    register: function () {
        
        var user = {
            username : $('#username-register').val(),
            password : $('#password-register').val(),
            repeat_password : $('#repeat-password-register').val()
        };

        if(this.validate(user)) {
            var register = app.usersList.registerNewUser(user);

            if(register){
                app.errorRegister = "Registered successfully!\nPlease log in below";
                app.successRegister = true;
                
            } else {
                this.registerError();
            }
        }
    },

    validate: function (user) {
        if((user.username).length == 0 || (user.password).length == 0 || (user.repeat_password).length == 0){
            
            app.errorRegister = "Please, complete all the fields";
            return false;
        };
        if ((user.password).length < 7) {
            
            app.errorRegister = "Your password must have at least 7 characters. Please choose a longer one";
            this.clearPasswordsFields();
            return false;
        };
        if(! (/^([a-zA-Z0-9]{1,})$/.test(user.username))) {
            
            app.errorRegister = "Neither your username, nor your password, can contain special characters.\nPlease choose another one";
            this.clearUsernameField();
            return false;
        };
        if(! (/^([a-zA-Z0-9]{7,})$/.test(user.password))) {
            
            app.errorRegister = "Neither your username, nor your password, can contain special characters.\nPlease choose another one";
            this.clearPasswordsFields();
            return false;
        };
        if (user.password != user.repeat_password) {
            
            app.errorRegister = "Passwords mismatch! Try Again";
            this.clearPasswordsFields();
            return false;
        }
        return true;
    },

    clearUsernameField: function () {
        $('#username-register').val('');
        $('#username-register').focus();
    },

    clearPasswordsFields: function () {
        $('#password-register').val('');
        $('#repeat-password-register').val('');
        $('#password-register').focus();
    },

    registerError: function () {
        
        app.errorRegister = "There's already an user with that username.\nPlease try again";
        this.clearUsernameField();
    },

    enter: function (e) {
        if (e.keyCode == 13) {
            this.register();
        }
    }

});

app.formRegister = new app.RegisterView();