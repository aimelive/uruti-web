# Uruti Web

Production-ready Angular 17 web app, containerized with Docker and served as a static site using `serve`.

## Local Development

1. Clone the repo
2. Install dependencies

```bash
npm install
```

3. Start the dev server

```bash
npm start
# or: ng serve
```

4. Open `http://localhost:4200`

## Production Build (without Docker)

```bash
npm run build:prod
# Outputs to: dist/uruti-web/browser
```

## Docker

This repo includes a multi-stage Dockerfile that builds the Angular app and serves the static assets via `serve` on port `4200`.

### Build and Push (multi-arch)

Your provided command builds for both `linux/amd64` and `linux/arm64` and pushes to Docker Hub:

```bash
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t aimelive/uruti-webt:latest \
  --push \
  .
```

### Run the container

```bash
docker run -d \
  --name urutiweb \
  -p 4200:4200 \
  -e NODE_ENV=production \
  aimelive/uruti-webt:latest
```

Then open `http://localhost:4200`.

Notes:

- The container serves static files; `NODE_ENV` is optional and not required by the Angular app itself.
- The exposed port is `4200` (as defined in the Dockerfile).

### Docker Compose (optional)

You can also use the included compose file:

```bash
docker compose up -d --build
```

This maps `4200:4200` and includes a simple healthcheck.

## Configuration

Runtime environment variables are not consumed by the Angular app. To change API endpoints or other environment values, edit:

- `src/environments/environment.ts` (development)
- `src/environments/environment.prod.ts` (production)

Then rebuild the app (or image) so the changes are baked into the static output.

## Troubleshooting

- Port already in use: either stop the conflicting service or run the container on a different host port, e.g. `-p 8080:4200`.
- Container logs: `docker logs -f urutiweb`
- Rebuild image locally without pushing: `docker build -t uruti-web:local .`
