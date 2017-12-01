# Angular2 starterpack

Dit is een Angular2 startproject. Dit project is een standaard Angular CLI project, uitgebreid met een nodejs server die de single HTML page aanbiedt. De server heeft geen API; hiervoor is een externe server nodig, zoals bijvoorbeeld deze [node-mongodb-server](https://github.com/avansinformatica/node-mongodb-server).

Deze Angular starterpack draait op [Heroku](https://angular-avans-starter.herokuapp.com).

## Start

```
npm install
npm start  (of ng serve)
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Heroku
Je kunt deze Angular applicatie gemakkelijk op Heroku of een andere cloudprovider deployen. Je hebt dan ook een externe API server nodig. Dit kan een nodejs server zijn, maar ook een ASP.NET server op Azure. 

Let op: je configureert de URL van de externe server in het bestand [environment.prod.ts](https://github.com/avansinformatica/angular-starterpack/blob/master/src/environments/environment.prod.ts). 

## Referenties
- [Deploy Angular 4 app with Express to heroku](https://medium.com/@ervib/deploy-angular-4-app-with-express-to-heroku-6113146915ca)