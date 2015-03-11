var app = app || {}

//Colección que mantiene los comics del sistema
app.ComicsCollection = Backbone.Collection.extend({
	
    model: app.ComicModel,
    url: './json/comics.json',

    initialize: function(){
    	//fetch es asincronica, y loadCollectionComics y save
    	//deben ejecutarse posteriormente al fetch
    	this.fetch({  
				success: function () {
				app.comicsList.loadCollectionComics();
				app.comicsList.save();
				}
		});

    },

    
	
	loadCollectionComics: function(){
		//Obtengo los comics de localStorage y actualizo la coleccion comicsList
	    var localComics = "./json/comics.json";
		var idsComics = localStorage.getItem(localComics).split(",");
		for (var i = 0; i < idsComics.length ; i++){
			var comic =  localStorage.getItem(localComics+ "" + idsComics[i])
			var comicmodel = new app.ComicModel(JSON.parse(comic));
			this.add(comicmodel);
		}

		//Guardo en localStorage la coleccion comics
		localStorage.setItem("comics", JSON.stringify(this.toJSON()));
	},
	
	save: function(){
        localStorage.setItem("comics", JSON.stringify(this.toJSON()));
    }

  });
