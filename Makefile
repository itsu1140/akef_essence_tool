docker:
	docker compose up --build

docker-fresh:
	docker compose build --no-cache && docker compose up

down:
	docker compose down

clean:
	rm -rf .next .vercel node_modules src/generated

ci: clean
	docker run --rm -v $(CURDIR):/app -w /app --user $(shell id -u):$(shell id -g) -e HOME=/tmp node:22-alpine sh -c "npm install && npm run build"
