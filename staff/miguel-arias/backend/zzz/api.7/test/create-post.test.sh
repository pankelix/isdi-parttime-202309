source colors.sh

echo -e "${blue}TEST create post${reset}"

echo
echo -e "${green}CASE success on correct data${reset}"

curl 'http://localhost:8000/posts' \
-H 'Authorization: Bearer 2l9olwt97f80' \
-H 'Content-Type: application/json' \
-d '{ "image": "https://tortillasnagual.com/wp-content/uploads/2022/11/Todo-sobre-la-mazorca-de-maiz-1024x704.jpg", "text": "My family! :)"}' \
-v

# > POST /posts HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Authorization: Bearer 2l9olwt97f80
# > Content-Type: application/json
# > Content-Length: 136

# HTTP/1.1 201 Created
# < X-Powered-By: Express
# < Date: Sat, 16 Dec 2023 09:03:35 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5
# < Content-Length: 0

echo
echo -e "${tomato}CASE failure on incorrect user id${reset}"

curl 'http://localhost:8000/posts' \
-H 'Authorization: Bearer 12345' \
-H 'Content-Type: application/json' \
-d '{ "image": "https://tortillasnagual.com/wp-content/uploads/2022/11/Todo-sobre-la-mazorca-de-maiz-1024x704.jpg", "text": "My family! :)"}' \
-v

# > POST /posts HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Authorization: Bearer 12345
# > Content-Type: application/json
# > Content-Length: 136

# < HTTP/1.1 400 Bad Request
# < X-Powered-By: Express
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 44
# < ETag: W/"2c-DA3KcjMxbAqH25TOBQigpuC1Bjs"
# < Date: Sat, 16 Dec 2023 09:05:38 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

# {"error":"Error","message":"user not found"}

echo
echo -e "${tomato}CASE failure on no image${reset}"

curl 'http://localhost:8000/posts' \
-H 'Authorization: Bearer 2l9olwt97f80' \
-H 'Content-Type: application/json' \
-d '{ "image": "", "text": "My family! :)"}' \
-v

# > POST /posts HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Authorization: Bearer 2l9olwt97f80
# > Content-Type: application/json
# > Content-Length: 39

# < HTTP/1.1 400 Bad Request
# < X-Powered-By: Express
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 44
# < ETag: W/"2c-mRt3ORUZNVTFioZCANSi/8PGBks"
# < Date: Sat, 16 Dec 2023 09:08:07 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

# {"error":"Error","message":"image is empty"}

echo
echo -e "${tomato}CASE failure on no text${reset}"

curl 'http://localhost:8000/posts' \
-H 'Authorization: Bearer 2l9olwt97f80' \
-H 'Content-Type: application/json' \
-d '{ "image": "https://tortillasnagual.com/wp-content/uploads/2022/11/Todo-sobre-la-mazorca-de-maiz-1024x704.jpg", "text": ""}' \
-v

# > POST /posts HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Authorization: Bearer 2l9olwt97f80
# > Content-Type: application/json
# > Content-Length: 123

# < HTTP/1.1 400 Bad Request
# < X-Powered-By: Express
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 43
# < ETag: W/"2b-+44WReKzTNwhJD53AjVHY5QM3EE"
# < Date: Sat, 16 Dec 2023 09:08:59 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

# {"error":"Error","message":"text is empty"}