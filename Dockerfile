FROM python:3.11-slim-bullseye

RUN apt-get update && apt-get install --no-install-recommends -y \
    build-essential autoconf pkg-config wget ghostscript curl imagemagick libcairo2-dev cmake libgirepository1.0-dev

RUN rm -rf /var/cache/apt/archives /var/lib/apt/lists/*.

WORKDIR /tmp

RUN pip install --upgrade pip

WORKDIR /app

ADD ./requirements.txt .

RUN pip install -r requirements.txt
