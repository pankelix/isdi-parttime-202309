source colors.sh

echo -e "${blue}TEST change user password${reset}"

echo
echo -e "${green}CASE success on correct data${reset}"

curl 'http://localhost:8000/users/658f0f0ff58499e7aacac4f6/password' \
-H 'Content-Type: application/json' \
-d '{ "password": "345345345", "newPassword": "123123123", "newPasswordConfirm": "123123123" }' \
-X PATCH \
-v

# > PATCH /users/658f0f0ff58499e7aacac4f6/password HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Content-Type: application/json
# > Content-Length: 90

# < HTTP/1.1 204 No Content
# < X-Powered-By: Express
# < Access-Control-Allow-Origin: *
# < Access-Control-Allow-Headers: *
# < Access-Control-Allow-Methods: *
# < Date: Tue, 09 Jan 2024 20:41:40 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

echo
echo -e "${tomato}CASE failure on incorrect userId${reset}"

 curl "http://localhost:8000/users/12345/password" \
 -H "Content-Type: application/json" \
 -d '{ "password": "123123123", "newPassword": "678678678", "newPasswordConfirm": "678678678" }' \
 -X PATCH \
 -v

# > PATCH /users/12345/password HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Content-Type: application/json
# > Content-Length: 90

# < HTTP/1.1 406 Not Acceptable
# < X-Powered-By: Express
# < Access-Control-Allow-Origin: *
# < Access-Control-Allow-Headers: *
# < Access-Control-Allow-Methods: *
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 62
# < ETag: W/"3e-CtBiWDfkD80oIuJogMCTiVNeg/c"
# < Date: Tue, 09 Jan 2024 20:44:08 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

# {"error":"ContentError","message":"user id is not a valid id"}

 echo
echo -e "${tomato}CASE failure on difference between newPassword and newPasswordConfirm${reset}"

 curl "http://localhost:8000/users/658f0f0ff58499e7aacac4f6/password" \
 -H "Content-Type: application/json" \
 -d '{ "password": "123123123", "newPassword": "12345", "newPasswordConfirm": "67890" }' \
 -X PATCH \
 -v

# > PATCH /users/658f0f0ff58499e7aacac4f6/password HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Content-Type: application/json
# > Content-Length: 82

# < HTTP/1.1 406 Not Acceptable
# < X-Powered-By: Express
# < Access-Control-Allow-Origin: *
# < Access-Control-Allow-Headers: *
# < Access-Control-Allow-Methods: *
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 83
# < ETag: W/"53-HYzMp1JK7E0LhuFIdVow6Urwlkg"
# < Date: Tue, 09 Jan 2024 20:44:09 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

# {"error":"ContentError","message":"new password and its confirmation do not match"}

 echo
echo -e "${tomato}CASE failure on empty data (newPassword)${reset}"

 curl "http://localhost:8000/users/658f0f0ff58499e7aacac4f6/password" \
 -H "Content-Type: application/json" \
 -d '{ "password": "123123123", "newPassword": "", "newPasswordConfirm": "678678678" }' \
 -X PATCH \
 -v

# > PATCH /users/658f0f0ff58499e7aacac4f6/password HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Content-Type: application/json
# > Content-Length: 81

# < HTTP/1.1 406 Not Acceptable
# < X-Powered-By: Express
# < Access-Control-Allow-Origin: *
# < Access-Control-Allow-Headers: *
# < Access-Control-Allow-Methods: *
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 58
# < ETag: W/"3a-XLe7tcDLRZV01bBhQWNXPh0UJyM"
# < Date: Tue, 09 Jan 2024 20:45:39 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

# {"error":"ContentError","message":"new password is empty"}

 echo
echo -e "${tomato}CASE failure on wrong password${reset}"

 curl "http://localhost:8000/users/658f0f0ff58499e7aacac4f6/password" \
 -H "Content-Type: application/json" \
 -d '{ "password": "12345", "newPassword": "678678678", "newPasswordConfirm": "678678678" }' \
 -X PATCH \
 -v

#  > PATCH /users/658f0f0ff58499e7aacac4f6/password HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Content-Type: application/json
# > Content-Length: 86

# < HTTP/1.1 401 Unauthorized
# < X-Powered-By: Express
# < Access-Control-Allow-Origin: *
# < Access-Control-Allow-Headers: *
# < Access-Control-Allow-Methods: *
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 55
# < ETag: W/"37-3mBc0WtcQO2Ze4UXSt4AJH7BRe8"
# < Date: Tue, 09 Jan 2024 20:45:39 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

# {"error":"CredentialsError","message":"wrong password"}