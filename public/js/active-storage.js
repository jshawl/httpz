var ActiveStorage = (function(){

  var ActiveStorage = function( kind ){ 
    this.kind = kind;
  }

  var propify = function( self, data ){
    for( var prop in data ){
      self[prop] = data[prop]; 
    }
    return self;     
  }

  var where = function( collection, predicate ){
    var i = 0, len = collection.length
    var foundCollection = []
    for ( ; i < len; i++ ){
      var model = collection[i] 
      for( var prop in predicate ){
        if( predicate[prop] == model[prop] ){
	  foundCollection.push( model )
	}
      }
    }
    return foundCollection
  }

  var find = function( collection, predicate ){
    return where( collection, predicate )[0] 
  }

  var map = function( collection, callback){
    var i = 0, len = collection.length
    var results = []
    for( ; i < len; i++ ){
      var model = collection[i]
      model = callback( model )
      results.push( model )
    }
    return results
  }

  var filter = function( collection, condition ){
    var i = 0, len = collection.length
    var results = []
    for( ; i < len; i++ ){
      var model = collection[i]
      if( condition( model ) ){
        results.push( model ) 
      }
    }
    return results
  }

  ActiveStorage.prototype = {
    all: function(){
      if( localStorage.getItem( this.kind ) ){
	return JSON.parse( localStorage.getItem( this.kind ) ); 
      } else {
	return [];
      }     
    },
    new: function( data ){
      return propify( this, data );
    },
    save: function(){
      var all = this.all();
      if( !this.id ){
	this.id = all.length + 1;
	all.push( this );
      } else {
	all[this.id - 1] = this;
      }
      localStorage.setItem(this.kind, JSON.stringify( all ));
      return this;
    },
    create: function( data ){
      this.new( data );
      this.id = false;
      return this.save();
    },
    update: function( data ){
      return propify( this, data ).save();
    },
    find: function( id ){
      var obj = find( this.all(), {id: id} );
      if( obj ){
	return propify( this, obj );
      } else {
	return undefined;
      }
    },
    findBy: function( predicate ){
      var obj = find( this.all(), predicate ); 
      if( obj ){
	return propify( this, obj );
      } else {
	return undefined;
      }
    },
    where: function( predicate ){
      var all = where( this.all(), predicate );
      var self = this;
      return map( all, function( o ){
        return propify( self, o ); 
      });
    },
    destroy: function(){
      var self = this;
      var all = filter( self.all(), function( o ){
	return o.id != self.id; 
      });
      localStorage.setItem( self.kind, JSON.stringify( all ) );
    },
    destroyAll: function(){
      localStorage.setItem( this.kind, "[]" );
    }
  };
  return ActiveStorage;
})();