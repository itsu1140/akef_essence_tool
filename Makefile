docker:
	docker compose up --build

pages:
	NEXT_BUILD_TARGET=cloudflare npm run pages:build

clean:
	rm -rf .next .vercel node_modules src/generated

ci: clean
	docker run --rm -v $(CURDIR):/app -w /app --user $(shell id -u):$(shell id -g) -e HOME=/tmp node:22-alpine sh -c "npm install && npm run build"
