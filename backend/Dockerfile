FROM alpine:3.19.1
ARG PB_VERSION=0.21.3

RUN addgroup -S app && adduser -S -G app app

RUN apk add --no-cache unzip ca-certificates

USER app

ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip

RUN unzip /tmp/pb.zip -d /pb/

COPY ./backend/pb_migrations /pb/pb_migrations

EXPOSE 8080

CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8080"]