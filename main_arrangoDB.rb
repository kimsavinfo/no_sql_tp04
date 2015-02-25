arangosh

# RETURN LENGTH((
# 	FOR character IN gameOfThrone 
# 		FILTER character.name == "Sansa Stark"
# 	RETURN character
# ))

FOR character IN gameOfThrone 
	FILTER character.name == "Sansa Stark"
RETURN 
{
	"name" : character.name,
	"_key" : character._key,
	"father" : 
	(
		FOR link IN familly 
			FILTER link._to == CONCAT("gameOfThrone/", character._key)
		RETURN 
		{
			FOR father IN gameOfThrone 
				FILTER father._key == SUBSTITUTE("gameOfThrone/", link._from)
		}
    )
}
