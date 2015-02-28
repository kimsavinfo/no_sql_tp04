// =================================
//  Generate edge and find people living in Winterfell
//
// Example to insert a value in the edge:
// INSERT {"_from":"town/Winterfell", "_to":"gameOfThrone/Eddard_Stark"} IN town_edge
// =================================

// Generate links in town_edge ...
FOR characters IN gameOfThrone
	LET characterLocationClean = TRIM(characters.loc),
	characterLatitude = SUBSTRING(characterLocationClean, 0, FIND_FIRST(characterLocationClean, ",") ),
	characterLongitude = SUBSTRING(characterLocationClean, FIND_FIRST(characterLocationClean, ",") + 1 )
	FILTER characters.loc != null
	SORT characters.name
	FOR town IN town
		LET townLocationClean = TRIM(town.loc),
		townLatitude = SUBSTRING(townLocationClean, 0, FIND_FIRST(townLocationClean, ",") ),
		townLongitude = SUBSTRING(townLocationClean, FIND_FIRST(townLocationClean, ",") + 1 )
		FILTER  ROUND(characterLatitude) == ROUND(townLatitude)
	INSERT 
	{
		"_from" : CONCAT("town/", town._key),
		"_to": CONCAT("gameOfThrone/", characters._key)
	}
	INTO town_edge

// ... then find people living in Winterfell
FOR town IN town
	FILTER town.name == "Winterfell"
	FOR link IN town_edge
		FILTER link._from == CONCAT("town/", town._key)
		FOR character IN gameOfThrone
			FILTER character._key == SUBSTRING(link._to, FIND_FIRST(link._to, "/") + 1 )
		RETURN
		{
			"character name" : character.name,
			"character _key" : character._key,
			"character gender" : character.gender,
			"character loc" : character.loc
		}

// --- Find character's town before generating edge ---
FOR characters IN gameOfThrone
	LET characterLocationClean = TRIM(characters.loc),
	characterLatitude = SUBSTRING(characterLocationClean, 0, FIND_FIRST(characterLocationClean, ",") ),
	characterLongitude = SUBSTRING(characterLocationClean, FIND_FIRST(characterLocationClean, ",") + 1 )
	FILTER characters.loc != null
	SORT characters.name
	FOR town IN town
		LET townLocationClean = TRIM(town.loc),
		townLatitude = SUBSTRING(townLocationClean, 0, FIND_FIRST(townLocationClean, ",") ),
		townLongitude = SUBSTRING(townLocationClean, FIND_FIRST(townLocationClean, ",") + 1 )
		FILTER  ROUND(characterLatitude) == ROUND(townLatitude)
	RETURN
	{
		"character name" : characters.name,
		"character latitude" : characterLatitude,
		"character longitude" : characterLongitude,
		"town " : town.name,
		"town latitude" : townLatitude,
		"town longitude" : townLongitude
	}