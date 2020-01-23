# FrontEnd demo for NHL schedules/games etc

This project was generated with latest Vue.

## Development server

Run `npm i` to install node components.

Run `yarn serve` for a dev server. Navigate to `http://localhost:8080/`. The app will automatically reload if you change any of the source files.

Data is fetched from backend https://nhl-data.herokuapp.com.
It's a node app.

Database is located in https://www.cloudclusters.io/

ETL is done in https://nhlimporter.herokuapp.com/

ETL is a swift/vapor app.
It collects data from https://statsapi.web.nhl.com

Game events are processed and evaluated to points.

23.1. - 26.1.2020 is an All Starts weekend, no real games to evaluate.
