# POKE API using Express

Pokemon API with basic routes:
* Express
* axios
* uuid
* fs
---
## URL
SERVER
```
http://localhost:3030
```
---

## Global Response

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
_Response (404 - Not Found)_
```
{
    "message": "URL not found"
}
```
---
## RESTful endpoints

### GET ALL POKEMON LIST (/pokemon)
Example
```
localhost:3030/pokemon
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "data": {
        "count": 1292,
        "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
        "previous": null,
        "results": [
            {
                "name": "bulbasaur",
                "url": "https://pokeapi.co/api/v2/pokemon/1/"
            },
            {
                "name": "ivysaur",
                "url": "https://pokeapi.co/api/v2/pokemon/2/"
            },
            {
                ... dan seterusnya
            }
        ]
    },
    "status": 200,
    "message": "Success"
}
```
---

### GET POKEMON DETAIL (/pokemon/:id)
Example
```
localhost:3030/pokemon/5
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "data": {
        "name": "charmeleon",
        "order": 6,
        "species": {
            "name": "charmeleon",
            "url": "https://pokeapi.co/api/v2/pokemon-species/5/"
        },
        "base_experience": 142,
        "forms": [
            {
                "name": "charmeleon",
                "url": "https://pokeapi.co/api/v2/pokemon-form/5/"
            }
        ],
        "abilities": [
            {
                "ability": {
                    "name": "blaze",
                    "url": "https://pokeapi.co/api/v2/ability/66/"
                },
                "is_hidden": false,
                "slot": 1
            }
        ]
    },
    "status": 200,
    "message": "Success get by id"
}
```
_Response (400)_
```
{
    "message": "Check again, Id must be a number"
}
```
_Response (404)_
```
{
    "message": "Pokemon not found"
}
```
---

### POST or CATCH RANDOM POKEMON (/pokemon)
Example
```
localhost:3030/pokemon
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "data": {
        "id": "9cc1efe5-8987-41c9-b7fa-f8961761ec9f",
        "name": "happiny"
    },
    "status": 200,
    "message": "Pokemon catch successfully!"
}
```
_Response (400)_
```
{
    "message": "Let's catch Pokemon again"
}
```
---

### GET MY POKEMON LIST (/my-pokemon)
Example
```
localhost:3030/my-pokemon
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "data": [
        {
            "id": "463facc1-1892-497e-ad70-16835d92c179",
            "name": "nuzleaf-13",
            "renameCount": 8
        },
        {
            "id": "7e6dbf86-d885-4a8e-91c6-7eb6735dedc4",
            "name": "wingull-1",
            "renameCount": 2
        },
        {
            "id": "dfe1f016-bc0d-424c-9946-3952ec513545",
            "name": "bruxish-1",
            "renameCount": 2
        }
    ],
    "status": 200,
    "message": "Success get your pokemon list."
}
```
---

### DELETE or RELEASE MY POKEMON LIST (/my-pokemon/:name)
Example
```
localhost:3030/my-pokemon/
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "status": 200,
    "message": "Release successful. Pokemon has been removed from your list."
}
```
_Response (400)_
```
{
    "message": "Release pokemon failed"
}
```
_Response (404)_
```
{
    "message": "Pokemon not in your list"
}
```
---

### RENAME POKEMON WITHOUT REQ BODY (/my-pokemon/rename/:id)
Example
```
localhost:3030/my-pokemon/rename/:id
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "newName": "manaphy-0",
    "message": "Success rename your pokemon"
}
```
_Response (404)_
```
{
    "message": "Pokemon not in your list"
}
```
---

### RENAME POKEMON WITH REQ BODY (/my-pokemon/rename/:id)
Example
```
localhost:3030/my-pokemon/rename/:id
```

_Request Header_
```
not needed
```

_Request Body_
```
{
    "renameFromBody": "manaphy using body"
}
```

_Response (200)_
```
{
    "newName": "manaphy using body-1",
    "message": "Success rename your pokemon"
}
```
_Response (404)_
```
{
    "message": "Pokemon not in your list"
}
```
---