source colors.sh

echo -e "${blue}TEST retrieve-user${reset}"

echo
echo -e "${green}CASE success on correct user id${reset}"

curl 'http://localhost:8000/users' \
-H 'Authorization: Bearer 2l9olwt97f80' \
-v

# > GET /users HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Authorization: Bearer 2l9olwt97f80

# < HTTP/1.1 200 OK
# < X-Powered-By: Express
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 19
# < ETag: W/"13-mMUemUMZ25sw5wj1ZgFDgACRLw8"
# < Date: Thu, 14 Dec 2023 19:10:18 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

# {"name":"Ma Zorca"}

echo
echo -e "${tomato}CASE failure on incorrect user id${reset}"

curl 'http://localhost:8000/users' \
-H 'Authorization: Bearer 123456' \
-v

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