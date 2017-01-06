module.exports = {
	collections:{},
	wake:function(){
		this.collections.user = [];
		this.collections.restaurant = [];
		this.collections.vote = [];
	},
	insertFakeData:function(){
		this.insert('user',{login:'pedro', pass:'abc'});
		this.insert('user',{login:'paulo', pass:'123'});
		this.insert('user',{login:'maria', pass:'xxx'});
		
		this.insert('restaurant',{name:'Dog morte lenta', address:'Rua Alipio Valdir, 1234'});
		this.insert('restaurant',{name:'Espetinho de gato', address:'Rua Conde Chihuahua, 78'});
	},
	insert:function(collection, object){
		object.id = this.collections[collection].length;
		this.collections[collection].push(object);
	},
	select:function(collection, selectBy, value){
		var coll = this.collections[collection];
        var result = [];
		for(var x=0 ; x<coll.length; x++){
			if(coll[x][selectBy] === value){
				result.push(coll[x])
			}
		}
		
		return result;
	},
	selectAll:function(collection){
		return this.collections[collection];
	}
}