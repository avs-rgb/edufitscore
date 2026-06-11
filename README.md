# EduFitScore

Deployment-ready scoring site for student and teacher gym score conversion.

## Run locally

```bash
npm install
npm start
```

Open `http://localhost:3000`.

## Data source

The app serves checked-in JSON data from `data/score-data.json`.

To rebuild that file from an updated workbook:

```bash
npm run build:data
```

By default that reads `data/source/score.xlsx`.

## Deploy on Render

1. Push this folder to a GitHub repository.
2. Create a new Render Web Service from that repo.
3. Render will detect `render.yaml` and use `npm start`.
4. Your site will be published under a Render URL.

## Notes

- The deployed app does not depend on any local desktop path.
- Teacher and student tabs use the same bundled source tables.
