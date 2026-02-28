debug:
	uv run python3 app/app.py

docker:
	docker compose up -d --build

build:
	uv run gunicorn app.app:app
