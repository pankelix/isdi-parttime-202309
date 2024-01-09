# API

## Register user

* Request: POST /users "Content-Type: application/json" { name, email, password }
* Response (error): 400|409|500 "Content-Type: application/json" { error, message }
* Response: 201 <!-- creado -->

## Authenticate user

* Request: POST /users/auth "Content-Type: application/json" { email, password }
* Response (error): 400|500 <!-- not found --> "Content-Type: application/json" { error, message }
* Response: 200 <!-- OK --> "Content-Type: application/json" userId

## Retrieve user

* Request: GET /users "Authorization: Bearer userId"
* Response (error): 400 "Content-Type: application/json" { error, message }
* Response: 200 "Content-Type: application/json" { name }

## Retrieve posts

* Requests: GET /posts "Authorization: Bearer userId"
* Response (error): 400 "Content-Type: application/json" { error, message }
* Response: 200 "Content-Type: application/json" [{ id, author: { id, name }, image, text, likes, liked, fav }]

## Create post

* Request: POST /posts "Authorization: Bearer userId" "Content-Type: application/json" { image, text }
* Response (error): 400 "Content-Type: application/json { error, message }
* Response: 201

## Toggle like post

* Request: PATCH /posts/postId/likes "Authorization: Bearer userId"
* Response (error): 400|404|406|500 "Content-Type: application/json" { error, message }
* Response: 204 <!-- ok but no content -->

## Toggle fav post

* Request: PATCH /posts/postId/favs "Authorization: Bearer userId"
* Response (error): 400|404|406|500 "Content-Type: application/json" { error, message }
* Response: 204 <!-- ok but no content -->
