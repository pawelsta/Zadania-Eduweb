(function() {

if(!window.localStorage) return;

	function LocalDB(name) {
		this._dbName = name;
	}

	LocalDB.prototype.save = function(key, obj) {
		
		window.localStorage.setItem(this._dbName + "." + key, JSON.stringify(obj));
	
	};
	
	LocalDB.prototype.get = function(key) {
		
		var data = window.localStorage.getItem(this._dbName + "." + key);
	
		return JSON.parse(data);
		
	};
	
	window.LocalDB = LocalDB;

})();