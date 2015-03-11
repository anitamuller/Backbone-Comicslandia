var app = app || {};


app.Router = Backbone.Router.extend({

    routes:{

        ''                  : 'login',
        'login'             : 'login',
        'home'              : 'home',       
        'register'          : 'register',
        'myProfile'         : 'seeUserProfile',
        'manageUsers'       : 'manageUsersAdmin',
        'manageComics'      : 'manageComicsAdmin',
        'borrowComics'      : 'borrowComics'

    },

    login : function () { 
        var view = localStorage.getItem("view");

        if (view === "login" || view === null ){
            
            app.formLogin.render();

            app.errorLogin = app.errorLogin || "";

            if (app.errorLogin != ""){
                $('#error-login').html(app.errorLogin);
                $('#error-login').addClass("alert alert-danger");
                $('#error-login').show();
            }
            
            app.router.navigate("login",{Trigger: true});  

        } else{
            //Se procede a renderizar la vista correspondiente según lo actualizado
            //en localStorage
                    
            if (view === "home"){
                this.home();
            } else if (view === "register"){
                this.register();
            } else if (view === "seeUserProfile"){
                this.seeUserProfile();
            } else if (view === "manageUsersAdmin"){
                this.manageUsersAdmin();
            } else if (view === "manageComicsAdmin"){
                this.manageComicsAdmin();
            } else if (view === "borrowComics"){
                this.borrowComics();
            }
        };
       
     },
    
    

    register : function () { 
        app.formRegister.render();
        app.errorRegister = app.errorRegister || "";

        if (app.errorRegister != ""){
            $('#error-register').html(app.errorRegister);
            if (app.successRegister){
                $('#error-register').addClass("alert alert-success");
            }else{
                $('#error-register').addClass("alert alert-danger");
            }
            $('#error-register').show();
            app.successRegister = false;
        }

        localStorage.setItem("view", "register");
        app.router.navigate("register",{Trigger: true});  
        
    },

    home : function () {  
        var user_logged = localStorage.getItem("session");
        //Si hay un usuario logueado se procede a renderizar la vista, sino
        //se ejecuta la vista login
        if (user_logged != ""){
            app.home.render();
            localStorage.setItem("view", "home");
            app.router.navigate("home",{Trigger: true});  
        } else {
            this.login();
            localStorage.setItem("view", "login");

        }      
        
        
     },
    
    seeUserProfile:function () { 
        //Si hay un usuario logueado se procede a renderizar la vista, sino
        //se ejecuta la vista login
        var user_logged = localStorage.getItem("session");
        if (user_logged != ""){
            app.profileUser.render();
            localStorage.setItem("view", "seeUserProfile");
            app.router.navigate("myProfile",{Trigger: true});  
        } else {
            this.login();
            localStorage.setItem("view", "login");

        }      
       
    },

    manageUsersAdmin: function(){
        //Si hay un usuario logueado se procede a renderizar la vista, sino
        //se ejecuta la vista login
        var user_logged = localStorage.getItem("session");
        if (user_logged != ""){
            var role_user = JSON.parse(user_logged);
            var role = role_user.role;

            //Si el usuario es administrador
            if (role === "admin"){
                app.manageAllUsers.render();
                localStorage.setItem("view", "manageUsersAdmin");
                app.router.navigate("manageUsers",{Trigger: true});  
            } else{
                //Si el usuario no es administrador, se lo redirecciona a home
                this.home();
                localStorage.setItem("view", "home");
            }
              
        } else {
            this.login();
            localStorage.setItem("view", "login");

        }      
          
       
    },

    manageComicsAdmin: function(){
        //Si hay un usuario logueado se procede a renderizar la vista, sino
        //se ejecuta la vista login
        var user_logged = localStorage.getItem("session");
        if (user_logged != ""){
            var role_user = JSON.parse(user_logged);
            var role = role_user.role;

            //Si el usuario es administrador
            if (role === "admin"){
                app.manageAllComics.render();
                localStorage.setItem("view", "manageComicsAdmin");
                app.router.navigate("manageComics",{Trigger: true});   
            } else {
                //Si el usuario no es administrador, se lo redirecciona a home
                this.home();
                localStorage.setItem("view", "home");
            }
        } else {
            this.login();
            localStorage.setItem("view", "login");

        } 
       
    },

    borrowComics: function(){
        //Si hay un usuario logueado se procede a renderizar la vista, sino
        //se ejecuta la vista login
        var user_logged = localStorage.getItem("session");
        if (user_logged != ""){
            app.borrowComics.render();
            localStorage.setItem("view", "borrowComics");
            app.router.navigate("borrowComics",{Trigger: true});  
        } else {
            this.login();
            localStorage.setItem("view", "login");

        } 

    }

});



app.router = app.router || new app.Router();
Backbone.history.start();