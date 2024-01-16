source colors.sh

echo -e "${blue}TEST retrieve-posts${reset}"

echo
echo -e "${green}CASE success on correct post id${reset}"

curl 'http://localhost:8000/posts' \
-H 'Authorization: Bearer 658f397b09527317a285ddfe' \
-v

# > GET /posts HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Authorization: Bearer 658f397b09527317a285ddfe

# < HTTP/1.1 200 OK
# < X-Powered-By: Express
# < Access-Control-Allow-Origin: *
# < Access-Control-Allow-Headers: *
# < Access-Control-Allow-Methods: *
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 179
# < ETag: W/"b3-RMDuD4NoxUQ0vBsmjl76EHgiyBE"
# < Date: Fri, 05 Jan 2024 19:42:04 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

# {"author":"658f0f0ff58499e7aacac4f6","image":"https://tortillasnagual.com/wp-content/uploads/2022/11/Todo-sobre-la-mazorca-de-maiz-1024x704.jpg","text":"My family! :)","likes":[]}

echo
echo -e "${tomato}CASE failure on wrong post id${reset}"

curl 'http://localhost:8000/posts' \
-H 'Authorization: Bearer 123456' \
-v

# > GET /posts HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Authorization: Bearer 123456

# < HTTP/1.1 406 Not Acceptable
# < X-Powered-By: Express
# < Access-Control-Allow-Origin: *
# < Access-Control-Allow-Headers: *
# < Access-Control-Allow-Methods: *
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 62
# < ETag: W/"3e-sp4tT1/RA5VAk7hfyAGnKT+C1bg"
# < Date: Fri, 05 Jan 2024 19:44:54 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

# {"error":"ContentError","message":"post id is not a valid id"}