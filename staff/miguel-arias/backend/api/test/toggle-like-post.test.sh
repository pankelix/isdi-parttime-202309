source colors.sh

echo -e "${blue}TEST toggle like post${reset}"

echo
echo -e "${green}CASE success on correct data${reset}"

curl 'http://localhost:8000/posts/658f397b09527317a285ddfe/likes' \
-H 'Authorization: Bearer 658e003d92e90fd57c67a684' \
-X PATCH \
-v

# > PATCH /posts/4g3ep12zedm0/likes HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Authorization: Bearer 658e003d92e90fd57c67a684

# < HTTP/1.1 204 No Content
# < X-Powered-By: Express
# < Date: Sat, 16 Dec 2023 12:23:55 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

echo
echo -e "${tomato}CASE failure on wrong post id${reset}"

curl 'http://localhost:8000/posts/wrong-postId/likes' \
-H 'Authorization: Bearer 658e003d92e90fd57c67a684' \
-X PATCH \
-v

# > PATCH /posts/wrong-postId/likes HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Authorization: Bearer 2l9olwt97f80

# < HTTP/1.1 404 Not Found
# < X-Powered-By: Express
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 52
# < ETag: W/"34-0DGpzzWendF/p1JIFqNhgJZ88G0"
# < Date: Sat, 16 Dec 2023 12:31:17 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

# {"error":"NotFoundError","message":"post not found"}

echo
echo -e "${tomato}CASE failure on wrong userId${reset}"

curl 'http://localhost:8000/posts/658f397b09527317a285ddfe/likes' \
-H 'Authorization: Bearer wrong-userId' \
-X PATCH \
-v

# > PATCH /posts/4g3ep12zedm0/likes HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Authorization: Bearer wrong-userId

# < HTTP/1.1 404 Not Found
# < X-Powered-By: Express
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 52
# < ETag: W/"34-Cs2INrsYwSHLSHCKVUFPEWh9NjI"
# < Date: Sat, 16 Dec 2023 12:32:25 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

# {"error":"NotFoundError","message":"user not found"}

echo
echo -e "${tomato}CASE server fails (eg: force fail on loading collection)${reset}"

curl 'http://localhost:8000/posts/658f397b09527317a285ddfe/likes' \
-H 'Authorization: Bearer 658e003d92e90fd57c67a684' \
-X PATCH \
-v

# > PATCH /posts/4g3ep12zedm0/likes HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Authorization: Bearer 2l9olwt97f80

# < HTTP/1.1 500 Internal Server Error
# < X-Powered-By: Express
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 188
# < ETag: W/"bc-rtKxbeq++rLN3DZlva6T7smYEm4"
# < Date: Sat, 16 Dec 2023 12:34:59 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

# {"error":"SystemError","message":"ENOENT: no such file or directory, open 'C:\\Users\\Usuario\\workspace\\isdi-parttime-202309\\staff\\miguel-arias\\backend\\api\\data\\users-wrong.json'"}s