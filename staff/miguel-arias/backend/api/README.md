# API

## Register user

Request: POST /users "Content-Type: application/json" { name, email, password }
Response: 201 <!-- creado -->
Response (error): 400 "Content-Type: application/json" { error, message }

## Authenticate user

Request: POST /users/auth "Content-Type: application/json" { email, password }
Response: 200 <!-- OK --> "Content-Type: application/json" userId
Response (error): 400 <!-- not found --> "Content-Type: application/json" { error, message }

## Retrieve user

Request: GET /users "Authorization: Bearer userId"
Response: 200 "Content-Type: application/json" { name }
Response (error): 400 "Content-Type: application/json" { error, message }

## Create post

Request: POST /posts "Authorization: Bearer userId" "Content-Type: application/json" { image, text }
Response: 201
Response (error): 400 "Content-Type: application/json { error, message }