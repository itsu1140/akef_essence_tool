dev:
	npm run dev

docker:
	docker compose up -d --build

build:
	npm run build

start:
	npm run start

clean:
	sudo rm -rf .next node_modules src/generated

ci: clean
	docker run --rm -v $(CURDIR):/app -w /app --user $(shell id -u):$(shell id -g) -e HOME=/tmp node:22-alpine sh -c "npm install && npm run build"
