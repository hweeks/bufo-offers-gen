FROM golang:1.21 as builder

WORKDIR /app

ENV STATIC_HOME=/app/frontend/dist
ENV DEV_MODE=production

COPY . .

RUN go mod tidy && go build -o /app/bo-bin ./main.go

FROM node:20 as webbuilder

WORKDIR /app

COPY . .

RUN corepack enable && yarn && yarn build

FROM golang:1.21 

ENV STATIC_HOME=/app/frontend/dist
ENV DEV_MODE=production
ENV GIN_MODE=release

WORKDIR /app

# add non root user, prep dirs
RUN groupadd -r app && useradd -r -g app app && mkdir /app/webapp && chown -R app:app /app

COPY --chown=app:app --from=builder /app/bo-bin /app/bo-bin
COPY --chown=app:app --from=webbuilder /app/webapp/dist /app/webapp/dist

CMD [ "/app/bo-bin" ]