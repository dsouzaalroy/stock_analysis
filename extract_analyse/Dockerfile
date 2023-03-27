FROM python:3.9-slim

WORKDIR .
COPY requirements.txt .
RUN  pip install --nocache-dir -r requirements.txt
COPY . .

CMD ["python", ""