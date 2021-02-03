FROM python:3.7

WORKDIR /app
COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . /app

EXPOSE 8050

CMD ["python", "app.py"]