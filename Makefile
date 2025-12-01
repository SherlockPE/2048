volume_1=wordpress-volume
volume_2=mariadb-volume

RED="\033[0;31m"
GREEN="\033[0;32m"
MAGENTA="\033[0;35m"
PINK="\033[0;95m"
CYAN="\033[0;36m"
YELLOW="\033[0;33m"
NC="\033[0m"

all:
	docker compose up --build -d
	docker compose start
	@echo ${GREEN}"All services are running ✅" $(NC)
	@echo -n "You can access the website at the following addresses: "
	@echo ${YELLOW} http://localhost:8080 ${NC}

up-%:
	docker compose up $* -d

stop:
	docker compose stop

build-%:
	docker compose build $* 

restart:
	docker compose restart

logs:
	docker compose logs

# Clean all images and networks
fclean: clean
	docker volume rm $$(docker volume ls -q)
	docker rmi $$(docker images -aq)

clean:
	@echo $(RED)"Deleting... 🧹"$(NC)
	docker compose down

re: clean all

.PHONY: all stop restart fclean re
