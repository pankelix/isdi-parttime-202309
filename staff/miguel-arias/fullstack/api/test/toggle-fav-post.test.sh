source colors.sh

echo -e "${blue}TEST toggle fav post${reset}"

echo
echo -e "${green}CASE success on correct data${reset}"

curl "http://localhost:8000/users/658f0f0ff58499e7aacac4f6/favs" \
-H "Authorization: Bearer 658f397b09527317a285ddfe" \
-X PATCH \
-v

# > PATCH /users/658f0f0ff58499e7aacac4f6/favs HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Authorization: Bearer 658f397b09527317a285ddfe

# < HTTP/1.1 204 No Content
# < X-Powered-By: Express
# < Access-Control-Allow-Origin: *
# < Access-Control-Allow-Headers: *
# < Access-Control-Allow-Methods: *
# < Date: Fri, 05 Jan 2024 22:32:39 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

echo
echo -e "${tomato}CASE failure on incorrect user id${reset}"

curl 'http://localhost:8000/users/12345/favs' \
-H "Authorization: Bearer 658f397b09527317a285ddfe" \
-X PATCH \
-v

# > PATCH /users/12345/favs HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Authorization: Bearer 658f397b09527317a285ddfe

# < HTTP/1.1 406 Not Acceptable
# < X-Powered-By: Express
# < Access-Control-Allow-Origin: *
# < Access-Control-Allow-Headers: *
# < Access-Control-Allow-Methods: *
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 62
# < ETag: W/"3e-CtBiWDfkD80oIuJogMCTiVNeg/c"
# < Date: Fri, 05 Jan 2024 22:50:26 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

# {"error":"ContentError","message":"user id is not a valid id"}

echo
echo -e "${tomato}CASE failure on incorrect post id${reset}"

curl 'http://localhost:8000/users/658f0f0ff58499e7aacac4f6/favs' \
-H "Authorization: Bearer 12345" \
-X PATCH \
-v

# > PATCH /users/658f0f0ff58499e7aacac4f6/favs HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Authorization: Bearer 12345

# < HTTP/1.1 406 Not Acceptable
# < X-Powered-By: Express
# < Access-Control-Allow-Origin: *
# < Access-Control-Allow-Headers: *
# < Access-Control-Allow-Methods: *
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 62
# < ETag: W/"3e-sp4tT1/RA5VAk7hfyAGnKT+C1bg"
# < Date: Fri, 05 Jan 2024 22:50:26 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

# {"error":"ContentError","message":"post id is not a valid id"}