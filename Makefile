debug:
	uv run python3 app.py

build:
	uv run gunicorn app:app
