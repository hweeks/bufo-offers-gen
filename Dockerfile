FROM golang:1.21 as builder

WORKDIR /app

ENV STATIC_DIR=/app/frontend/dist
ENV DEV_MODE=production

COPY . .

RUN cd backend && go mod tidy && go build -o bo-bin ./main.go

FROM golang:1.21 

ENV STATIC_DIR=/app/dist
ENV DEV_MODE=production
ENV GIN_MODE=release
ENV MASK_ASSETS=/app/assets

WORKDIR /app

# add non root user, prep dirs
RUN groupadd -r app && useradd -r -g app app && mkdir /app/frontend && chown -R app:app /app

COPY --chown=app:app --from=builder /app/backend/bo-bin /app/bo-bin
COPY --chown=app:app --from=builder /app/backend/assets /app/assets
COPY --chown=app:app --from=builder /app/frontend/dist /app/dist

CMD [ "/app/bo-bin" ]