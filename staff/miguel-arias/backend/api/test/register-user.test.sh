source colors.sh

echo -e "${blue}TEST register-user${reset}"

echo
echo -e "${green}CASE success on correct credentials${reset}"

 curl 'http://localhost:8000/register' \
 -H 'Content-Type: application/json' \
 -d '{ "name": "Ma Zorca", "email": "ma@zorca.com", "password": "123123123" }' \
 -v

#  este objeto va a terminar en el body
# -H sirve para decirle de que tipo es el dato que le envío (en este caso json)
# -d son los datos
# -v para que me devuelva la verborrea

# > POST /register HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Content-Type: application/json
# > Content-Length: 72

# < HTTP/1.1 201 Created
# < X-Powered-By: Express
# < Date: Wed, 13 Dec 2023 18:26:09 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5
# < Content-Length: 0