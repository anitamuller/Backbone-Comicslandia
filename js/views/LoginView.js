var app = app || {}

app.LoginView = Backbone.View.extend({

    el: '#content',

    template: $('#loginTemplate').html(),

    events: {
    	'keyup #user-password'  : 'enter',
        'click #btn-login'      : 'login',
        'click #btn-register'   : 'register'
    },

    render: function () {
        this.$el.html( this.template );
    },

    login: function () {
    	
        var user = {
            username : $('#user-username').val(),
            password : $('#user-password').val()
        };

        if (this.validate(user)) {
        	var exist_user = app.usersList.find(function(model) { return model.get('username') == user.username; });
        	
        	//Si el usuario no existe 
        	if ($.isEmptyObject(exist_user)){
        		this.loginError("Username invalid.\nPlease, try again!");
        	} else{
        		//Si el usuario existe y coinciden username y password con un usuario registrado
        		if (exist_user.get("password") === user.password){
        			localStorage.setItem("session", JSON.stringify(exist_user));
                    localStorage.setItem("view", "home");
                    app.router.home();
        		} else{
        			this.loginError("Password invalid.\nPlease, try again!");
                    
        		}
        	}
 
        }
    },

    validate: function (data) {
        if((data.username).length == 0 || (data.password).length == 0){
            
            app.errorLogin = "Please, complete the fields Username and Password.";
            $('#error-login').html("Please, complete the fields Username and Password.");
            return false;
        };
        return true;
    },

    loginError: function (msg) {
        
        app.errorLogin = msg;
        $('#error-login').html(msg);
        $('#error-login').addClass("alert alert-danger");
        $('#error-login').show();

        $('#user-username').val("");
        $('#user-password').val("");
        $('#user-username').focus();
    },

    logout: function() {
        localStorage.setItem("session", "");
        app.router.login();
        
    },

    register: function () {
        app.errorRegister = "";
	    app.router.register();
    },

    enter: function (e) {
        if (e.keyCode == 13) {
            this.login();
        }
    }

});

app.formLogin = new app.LoginView();

