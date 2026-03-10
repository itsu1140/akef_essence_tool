debug:
	uv run python3 -m app.app

docker:
	docker compose up -d --build

build:
	uv run gunicorn app.app:app
