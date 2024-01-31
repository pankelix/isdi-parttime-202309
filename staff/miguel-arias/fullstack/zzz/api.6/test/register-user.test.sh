source colors.sh

echo -e "${blue}TEST register-user${reset}"

echo
echo -e "${green}CASE success on correct credentials${reset}"

 curl 'http://localhost:8000/users' \
 -H 'Content-Type: application/json' \
 -d '{ "name": "Ma Zorca", "email": "ma@zorca.com", "password": "123123123" }' \
 -v

#  este objeto va a terminar en el body
# -H sirve para decirle de que tipo es el dato que le envío (en este caso json)
# -d son los datos
# -v para que me devuelva la verborrea

# > POST /users HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Content-Type: application/json
# > Content-Length: 72

# < HTTP/1.1 201 Created
# < X-Powered-By: Express
# < Access-Control-Allow-Origin: *
# < Access-Control-Allow-Headers: *
# < Access-Control-Allow-Methods: *
# < Date: Fri, 29 Dec 2023 18:25:20 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5
# < Content-Length: 0

echo
echo -e "${tomato}CASE failure on existing user${reset}"

 curl 'http://localhost:8000/users' \
 -H 'Content-Type: application/json' \
 -d '{ "name": "Ma Zorca", "email": "ma@zorca.com", "password": "123123123" }' \
 -v

# > POST /users HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Content-Type: application/json
# > Content-Length: 72

# < HTTP/1.1 409 Conflict
# < X-Powered-By: Express
# < Access-Control-Allow-Origin: *
# < Access-Control-Allow-Headers: *
# < Access-Control-Allow-Methods: *
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 58
# < ETag: W/"3a-BkTRoMg3lQUZlpFvLO97n1a0SLg"
# < Date: Fri, 29 Dec 2023 18:27:16 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

# {"error":"DuplicityError","message":"user already exists"}