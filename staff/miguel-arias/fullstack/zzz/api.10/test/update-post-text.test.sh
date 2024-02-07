source colors.sh

echo -e "${blue}TEST update post text${reset}"

echo
echo -e "${green}CASE success on correct data${reset}"

curl 'http://localhost:8000/posts/65895deeeed889536efe91dd/likes' \
-H 'Authorization: Bearer 658956f7eed889536efe91d7' \
-H 'Content-Type: application/json' \
-d '{ "text": "Why!?" }' \
-X PATCH \
-v

# > PATCH /posts/65895deeeed889536efe91dd/likes HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Authorization: Bearer 658956f7eed889536efe91d7
# > Content-Type: application/json
# > Content-Length: 19

# < HTTP/1.1 204 No Content
# < X-Powered-By: Express
# < Access-Control-Allow-Origin: *
# < Access-Control-Allow-Headers: *
# < Access-Control-Allow-Methods: *
# < Date: Tue, 16 Jan 2024 15:55:40 GMT       
# < Connection: keep-alive
# < Keep-Alive: timeout=5