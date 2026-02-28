FROM python:3.12-slim
RUN pip install uv
WORKDIR /app
COPY pyproject.toml uv.lock* ./
RUN uv sync --no-dev
COPY . .


EXPOSE 10000

# gunicorn 起動
CMD ["uv", "run", "gunicorn", "app.app:app", "--bind", "0.0.0.0:5000", "--workers", "2"]
