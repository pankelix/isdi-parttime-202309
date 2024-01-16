.test.js -> en la carpeta logic -> node --inspect-brk ./archivo
.test.html -> open with live server, recargar y mirar network
.test.sh -> con el server abierto -> ./archivo

npm run start
npm run watch
npm run inspect

# API

## Register user

* Request: POST /users "Content-Type: application/json" { name, email, password }
* Response: 201 <!-- creado -->
* Response (error): 400|409|500 "Content-Type: application/json" { error, message }

## Authenticate user

* Request: POST /users/auth "Content-Type: application/json" { email, password }
* Response: 200 <!-- OK --> "Content-Type: application/json" userId
* Response (error): 400|500 <!-- not found --> "Content-Type: application/json" { error, message }

## Retrieve user

* Request: GET /users "Authorization: Bearer userId"
* Response: 200 "Content-Type: application/json" { name }
* Response (error): 400 "Content-Type: application/json" { error, message }

## Create post

* Request: POST /posts "Authorization: Bearer userId" "Content-Type: application/json" { image, text }
* Response: 201
* Response (error): 400 "Content-Type: application/json { error, message }

## Toggle like post

* Request: PATCH /posts/postId/likes "Authorization: Bearer userId"
* Response: 204 <!-- ok but no content -->
* Response (error): 400|404|406|500 "Content-Type: application/json" { error, message }

## Retrieve posts

* Request: GET /posts "Authorization: Bearer userId"
* Response: 200 "Content-Type: application/json" { post }
* Response (error): 400 "Content-Type: application/json" { error, message }

## Toggle fav post

* Request: PATCH /posts/userId/favs "Authorization: Bearer postId"
* Response: 204
* Response (error): 404|406|500 "Content-Type: application/json" { error, message }

## Change user email

* Request: PATCH /users/:userId/email "Content-Type: application/json" { newEmail, newEmailConfirm, password }
* Response: 204
* Response (error): 401|404|406|500 "Content-Type: application/json" { error, message }

## Change user password

* Request: PATCH /users/:userId/password "Content-Type: application/json" { password, newPassword, newPasswordConfirm }
* Response: 204
* Response (error): 401|404|406|500 "Content-Type: application/json" { error, message }

## Delete post

* Request: POST /posts/:postId/delete "Authorization: Bearer userId"
* Response: 204
* Response(error): 404|406|500 "Content-Type: application/json" { error, message }