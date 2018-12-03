# node-js-sqlite
Simple NodeJS Rest API with CRUD routes.
Using SQLite database

## How to Install
```sh
$ cd node-js-sqlite
$ npm install 
$ npm run dev
```

It will be running on port 4300

------------

## How to use

### POST
* **Add new music:**
```
http://localhost:4300/api/music
```
Sending a JSON body:
```javascript
{
	"name": "ExampleMusicName",
	"musicurl": "Example music description"
}
```
or an array of musics:
```javascript
[
	{...},{...}
]
```

---------------------------------------------

### PUT
* **Update a music:**
```
http://localhost:4300/api/music
```
Sending a JSON body: **ID is the only MANDATORY**
```javascript
{
	"id": "1",
	"name": "ExampleMusicName",
	"musicurl": "Example music description"
}
```
or an array of musics:
```javascript
[
	{...},{...}
]
```

---------------------------------------------

### DELETE
* **Delete a music:**
```
http://localhost:4300/api/music
```
Sending a JSON body: **ID is the only MANDATORY**
```javascript
{
	"id": "1",
	"name": "ExampleMusicName",
	"musicurl": "Example music description"
}
```
or an array of musics:
```javascript
[
	{...},{...}
]
```

---------------------------------------------

### GET
* **Load musics by ID:**
```
http://localhost:4300/api/music/id/$id
```
example: http://localhost:4300/api/music/id/15
_____

* **Load all musics:**
```
http://localhost:4300/api/music/
```
______

* **Load musics by any attribute and value:** 
```
http://localhost:4300/api/music/$attribute/$name
```
example: 
- http://localhost:4300/api/music/name/Suntone
$attribute = ['name', 'price', 'currency', 'description']
(this is not checked values, wrong parameters will return a DB error.)
_____

* **Load all musics sorting by attribute** 
```
http://localhost:4300/api/music/sort/$attribute
```
example: 
- http://localhost:4300/api/music/sort/price
- http://localhost:4300/api/music/sort/name

$attribute = ['name', 'price', 'currency', 'description']
(this is not checked values, wrong parameters will return a DB error)
____


### Node version
The Node version used was 6.9.3