FROM ubuntu:latest

WORKDIR /code
COPY . .

RUN  apt-get update \
 && apt-get install -y wget \
 && rm -rf /var/lib/apt/lists/* \
 && cd /tmp \
 && wget https://deb.nodesource.com/setup_16.x \
 && chmod +x setup_16.x \
 && ./setup_16.x \
 && apt-get install nodejs \
 && cd /code/client \
 && npm install \
 && cd ../server \
 && npm install \
 && npm run prepareSettings

EXPOSE 3000
EXPOSE 3210

ENTRYPOINT ["./entrypoint.sh"]
