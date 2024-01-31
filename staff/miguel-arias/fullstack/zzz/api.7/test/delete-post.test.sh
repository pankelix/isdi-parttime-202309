source colors.sh

echo -e "${blue}TEST delete post${reset}"

echo
echo -e "${green}CASE success on correct data${reset}"

curl 'http://localhost:8000/posts/658ca614cc6063a216e2e46c/delete' \
-X 'POST' \
-H 'Authorization: Bearer 658956f7eed889536efe91d7' \
-v

# > POST /posts/658ca614cc6063a216e2e46c/delete HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Authorization: Bearer 658956f7eed889536efe91d7

# < HTTP/1.1 204 No Content
# < X-Powered-By: Express
# < Access-Control-Allow-Origin: *
# < Access-Control-Allow-Headers: *
# < Access-Control-Allow-Methods: *
# < Date: Thu, 11 Jan 2024 16:03:08 GMT      
# < Connection: keep-alive
# < Keep-Alive: timeout=5