// =================================
//  Find family links
// =================================

//  Find parents
FOR kid IN gameOfThrone 
	FILTER kid.name == "Sansa Stark"
	FOR link IN family_edge 
		FILTER link._to == CONCAT("gameOfThrone/", kid._key)
		FOR parent IN gameOfThrone
			FILTER parent._key == SUBSTRING(link._from, (FIND_LAST(link._from, "/") + 1) )
			SORT parent.name
		RETURN
		{
			"parent name" : parent.name,
			"parent key" : parent._key,
			"parent gender" : parent.gender
		}

//  Find the father
FOR kid IN gameOfThrone 
	FILTER kid.name == "Sansa Stark"
	FOR link IN family_edge 
		FILTER link._to == CONCAT("gameOfThrone/", kid._key)
		FOR father IN gameOfThrone
			FILTER father._key == SUBSTRING(link._from, (FIND_LAST(link._from, "/") + 1) )
			AND father.gender == "m"
		RETURN
		{
			"parent name" : father.name,
			"parent key" : father._key
		}

//  Find the mother
FOR kid IN gameOfThrone 
	FILTER kid.name == "Sansa Stark"
	FOR link IN family_edge 
		FILTER link._to == CONCAT("gameOfThrone/", kid._key)
		FOR father IN gameOfThrone
			FILTER father._key == SUBSTRING(link._from, (FIND_LAST(link._from, "/") + 1) )
			AND father.gender == "f"
		RETURN
		{
			"parent name" : father.name,
			"parent key" : father._key
		}

//  Find the kids
FOR parent IN gameOfThrone
	FILTER parent.name == "Eddard Stark"
	AND parent.gender == "m"
	FOR link IN family_edge 
		FILTER link._from == CONCAT("gameOfThrone/", parent._key)
		FOR kid IN gameOfThrone
			FILTER kid._key == SUBSTRING(link._to, (FIND_LAST(link._to, "/") + 1) )
			SORT kid.name
		RETURN
		{
			"kid name" : kid.name,
			"kid key" : kid._key,
			"kid gender" : kid.gender
		}

//  Find the daughters
FOR parent IN gameOfThrone
	FILTER parent.name == "Eddard Stark"
	AND parent.gender == "m"
	FOR link IN family_edge 
		FILTER link._from == CONCAT("gameOfThrone/", parent._key)
		FOR kid IN gameOfThrone
			FILTER kid._key == SUBSTRING(link._to, (FIND_LAST(link._to, "/") + 1) )
			AND kid.gender == "f"
			SORT kid.name
		RETURN
		{
			"kid name" : kid.name,
			"kid key" : kid._key,
			"kid gender" : kid.gender
		}

//  Find the sons
FOR parent IN gameOfThrone
	FILTER parent.name == "Eddard Stark"
	AND parent.gender == "m"
	FOR link IN family_edge 
		FILTER link._from == CONCAT("gameOfThrone/", parent._key)
		FOR kid IN gameOfThrone
			FILTER kid._key == SUBSTRING(link._to, (FIND_LAST(link._to, "/") + 1) )
			AND kid.gender == "m"
			SORT kid.name
		RETURN
		{
			"kid name" : kid.name,
			"kid key" : kid._key,
			"kid gender" : kid.gender
		}

//  Find the brothers and sisters
FOR kid IN gameOfThrone 
	FILTER kid.name == "Sansa Stark"
	FOR parentLink IN family_edge 
		FILTER parentLink._to == CONCAT("gameOfThrone/", kid._key)
		FOR siblingsLink IN family_edge
			FILTER siblingsLink._from == parentLink._from
			FOR siblings IN gameOfThrone
				FILTER siblings._key == SUBSTRING(siblingsLink._to, (FIND_LAST(siblingsLink._to, "/") + 1) )
				AND siblings._key != kid._key
				SORT siblings.name
			RETURN
			{
				"sibling name" : siblings.name,
				"sibling key" : siblings._key,
				"sibling gender" : siblings.gender
			}

//  Find sisters
FOR kid IN gameOfThrone 
	FILTER kid.name == "Sansa Stark"
	FOR parentLink IN family_edge 
		FILTER parentLink._to == CONCAT("gameOfThrone/", kid._key)
		FOR siblingsLink IN family_edge
			FILTER siblingsLink._from == parentLink._from
			FOR siblings IN gameOfThrone
				FILTER siblings._key == SUBSTRING(siblingsLink._to, (FIND_LAST(siblingsLink._to, "/") + 1) )
				AND siblings.gender == "f"
				AND siblings._key != kid._key
				SORT siblings.name
			RETURN
			{
				"sibling name" : siblings.name,
				"sibling key" : siblings._key,
				"sibling gender" : siblings.gender
			}

//  Find brothers
FOR kid IN gameOfThrone 
	FILTER kid.name == "Sansa Stark"
	FOR parentLink IN family_edge 
		FILTER parentLink._to == CONCAT("gameOfThrone/", kid._key)
		FOR siblingsLink IN family_edge
			FILTER siblingsLink._from == parentLink._from
			FOR siblings IN gameOfThrone
				FILTER siblings._key == SUBSTRING(siblingsLink._to, (FIND_LAST(siblingsLink._to, "/") + 1) )
				AND siblings.gender == "m"
				AND siblings._key != kid._key
				SORT siblings.name
			RETURN
			{
				"sibling name" : siblings.name,
				"sibling key" : siblings._key,
				"sibling gender" : siblings.gender
			}

//  Find grand-parents
FOR kid IN gameOfThrone 
	FILTER kid.name == "Sansa Stark"
	FOR parentLink IN family_edge 
		FILTER parentLink._to == CONCAT("gameOfThrone/", kid._key)
		FOR grandParentLink IN family_edge
			FILTER grandParentLink._to == parentLink._from
			FOR grandParent IN gameOfThrone
				FILTER grandParent._key == SUBSTRING(grandParentLink._to, (FIND_LAST(grandParentLink._to, "/") + 1) )
				SORT grandParent.name
			RETURN
			{
				"grand-parent name" : grandParent.name,
				"grand-parent key" : grandParent._key,
				"grand-parent gender" : grandParent.gender
			}
