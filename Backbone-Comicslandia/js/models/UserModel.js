var app = app || {}

app.UserModel = Backbone.Model.extend({
        
    defaults: {
            username: '',
            password: '',
            role: ''
        },

    initialize: function() {
        	//console.log("The user named '" + this.get("username") + "' has been created");
    },

    validate: function(attrs) {
        if(! /^([a-zA-Z0-9]{1,})$/.test(attrs.username)){
            return "username error";
        }
        if(! /^([a-zA-Z0-9]{7,})$/.test(attrs.password)){
            return "password error";
        }
    }

});

