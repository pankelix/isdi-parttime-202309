source colors.sh

echo -e "${blue}TEST retrieve-users${reset}"

echo
echo -e "${green}CASE success on correct token${reset}"

curl 'http://localhost:8000/users' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWIxOWYyN2Q2ZTYyNTMxMTc3NjlkYWYiLCJpYXQiOjE3MDYyMDIxNTd9.2CFXRSkeXZQp7MmEW-hYjGk9YvJHAqHvR-byIu6bZ2g' \
-v

# > GET /users HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Authorization: Bearer 658f0f0ff58499e7aacac4f6

# < HTTP/1.1 200 OK
# < X-Powered-By: Express
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 19
# < ETag: W/"13-mMUemUMZ25sw5wj1ZgFDgACRLw8"
# < Date: Thu, 14 Dec 2023 19:10:18 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

# {"name":"Ma Zorca"}

# echo
# echo -e "${tomato}CASE failure on incorrect user id${reset}"

# curl 'http://localhost:8000/users' \
# -H 'Authorization: Bearer 123456' \
# -v

# > GET /users HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Authorization: Bearer 123456

# < HTTP/1.1 400 Bad Request
# < X-Powered-By: Express
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 44
# < ETag: W/"2c-DA3KcjMxbAqH25TOBQigpuC1Bjs"
# < Date: Thu, 14 Dec 2023 19:11:39 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

# {"error":"Error","message":"user not found"}