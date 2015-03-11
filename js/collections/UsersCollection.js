var app = app || {}

//Colección que mantiene los usuarios del sistema
app.UsersCollection = Backbone.Collection.extend({

    model: app.UserModel,
    url: './json/users.json',

    initialize: function(){
    	//fetch es asincronica, y loadCollectionComics y save
    	//deben ejecutarse posteriormente al fetch
        this.fetch({  
				success: function () {
					app.usersList.loadCollectionUsers();
					app.usersList.save();
				}
		});
    },

    registerNewUser: function ( data ) {
        //Primero se verifica si existe el usuario en la coleccion users
        
        var exist_user = app.usersList.find(function(model) { return model.get('username') == data.username; });
        	//Si el usuario no existe, lo agrego a la coleccion
        	if ($.isEmptyObject(exist_user)){
				var newUser = new app.UserModel({id: data.username, username: data.username, password: data.password, role: "user"});
				app.usersList.add(newUser);
                this.save();
				
            	return true;
			}
			else {
				// Ya existe un usuario con tal username
				return false;
			}
			
		
    },
	
	//Funcion encargada de actualizar la coleccion en base a lo guardado en localStorage
	loadCollectionUsers : function(){
 		var data = localStorage.getItem("users");
 		if (data) {
 			data = JSON.parse(data);
 			
 			for (var i = 0; i < data.length; i++) {
 				this.create(data[i]);
 				
 			}
		}
	},

	//Funcion encargada de guardar en localStorage la coleccion de Backbone
    save: function(){
    	localStorage.setItem("users", JSON.stringify(this.toJSON()));
       
    }


});



