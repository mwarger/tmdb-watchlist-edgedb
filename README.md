# TMDB Watchlist

Simple app that showcases the following technology.

Expo + TRPC + (Prisma || EdgeDB) on NextJS + Nx

---


Random Notes Below

TMDB
https://api.stoplight.io/v1/versions/9WaNJfGpnnQ76opqe/export/oas.json

npx openapi-typescript https://api.stoplight.io/v1/versions/9WaNJfGpnnQ76opqe/export/oas.json --output tmdb-swagger.ts



https://github.com/expo/eas-cli/issues/228#issuecomment-861407074

Must use `eas secret:create` to create a GOOGLE_SERVICES_BASE64 holding base64 output of google-services.json file.