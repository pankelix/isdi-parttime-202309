source colors.sh

echo -e "${blue}TEST retrieve-posts${reset}"

echo
echo -e "${green}CASE success on correct post id${reset}"

curl 'http://localhost:8000/posts/favs' \
-H 'Authorization: Bearer 658f0f0ff58499e7aacac4f6' \
-v