// Détruire la base 
use got
db.dropDatabase()

#// Importer les personnages de Game of Thrones depuis le fichier json fourni
use got
load('data_game_of_throne.json')
db.characters.save(gameOfThroneCharacters)
show collections

// Vérifier le nombre total : 54 personnages
db.characters.count()
// Afficher les personnages dans l ordre alphabétique
db.characters.find().sort({name : 1})

// ============== MAPREDUCE ==============
// Trier par genre
map = function() {
	emit(this.gender, 1);
};
reduce = function(key, values) {
	return Array.sum(values);
};
db.characters.mapReduce(map, reduce, {
	out: "gender_count_mapreduce"
});
db.gender_count.find()

// Trier les personnes par famille
map = function() {
	emit(this._key.split('_').pop(), this.name+", ")
};
reduce = function(key, this.name) {
	return values;
};
db.characters.mapReduce(map, reduce, {
	out: "family_count_mapreduce"
});
db.family_count.find()


// ============== AGGREGATION PIPELINE ==============
// Trier par genre
db.characters.aggregate([
	{ $group : {_id : "$gender", total : { $sum : 1 } } }
])