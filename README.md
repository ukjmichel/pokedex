# AngularBootstrap

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 19.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Environment Variable

1. **Install @types/node**

```bash
npm install @types/node

```

2. **Modify your tsconfig.app.json**

```json
/* To learn more about this file see: https://angular.io/config/tsconfig. */
{
 //all other config
    ...
  "compilerOptions": {
    //all other config
    ...
    "types": ["node"],
    ...
    //all other config
  },
  ...
    //all other config
}
```

3. **Install @angular-builders/custom-webpack and dotenv-webpack**

```bash
npm install @angular-builders/custom-webpack -D
npm install dotenv-webpack -D
```

4. **Modify your angular.json**

Modify the angular.json file, locate the projects.architect.build and modify the value of the builder as shown below, you also need to add the options property and value

```json
"architect":
{
....
  "build":
  {
    "builder": "@angular-builders/custom-webpack:browser",
    "options":
    {
      "customWebpackConfig":
      {
        "path": "src/custom-webpack.config.ts"
      },
      .....
    },
    .......
  }
}
```

then locate the projects.architect.serve and modify the value of the builder as shown below

```json
"serve":
{
  "builder": "@angular-builders/custom-webpack:dev-server",
  ....
}
```

5. **Create custom-webpack.config.ts file**

next up we need to create the custom-webpack.config.ts file in our src folder

```ts
import { EnvironmentPlugin } from "webpack";
const Dotenv = require("dotenv-webpack");
module.exports = {
  plugins: [new Dotenv()],
};
```

6. **Create .env file**

API_KEY = YOUR_API_KEY

## Font Awesome

### Installation

```bash
npm install @fortawesome/fontawesome-free
```

### Configuration

add in angular.json

```json
"styles": [
    "node_modules/@fortawesome/fontawesome-free/css/all.min.css"
    ],

```

## Bootstrap

### Installation

```bash
npm install bootstrap @popperjs/core

```

### Configuration

add in angular.json

```json
"styles": [
    "node_modules/bootstrap/dist/css/bootstrap.min.css"
    ],
"scripts": [
    "node_modules/@popperjs/core/dist/umd/popper.min.js",
    "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
    ]
```

### Breakpoint

| Breakpoint        | Classe                      | Dimensions |
| ----------------- | --------------------------- | ---------- |
| Extra small       | Aucune (point de référence) | `<576px`   |
| Small             | `sm`                        | `≥576px`   |
| Medium            | `md`                        | `≥768px`   |
| Large             | `lg`                        | `≥992px`   |
| Extra large       | `xl`                        | `≥1200px`  |
| Extra extra large | `xxl`                       | `≥1400px`  |

### Container

| Container Class  | Extra small `<576px` | Small `≥576px` | Medium `≥768px` | Large `≥992px` | Extra large `≥1200px` | Extra extra large `≥1400px` |
| ---------------- | -------------------- | -------------- | --------------- | -------------- | --------------------- | --------------------------- |
| `.container`     | Auto                 | 540px          | 720px           | 960px          | 1140px                | 1320px                      |
| `.container-sm`  | Auto                 | 540px          | 720px           | 960px          | 1140px                | 1320px                      |
| `.container-md`  | Auto                 | Auto           | 720px           | 960px          | 1140px                | 1320px                      |
| `.container-lg`  | Auto                 | Auto           | Auto            | 960px          | 1140px                | 1320px                      |
| `.container-xl`  | Auto                 | Auto           | Auto            | Auto           | 1140px                | 1320px                      |
| `.container-xxl` | Auto                 | Auto           | Auto            | Auto           | Auto                  | 1320px                      |

## Pokémon API v2 Endpoints

**Base Url:** "https://pokeapi.co

| **Endpoint**                        | **Description**                               | **Parameters**    | **Example**                             |
| ----------------------------------- | --------------------------------------------- | ----------------- | --------------------------------------- |
| `/api/v2/pokemon`                   | List all Pokémon or fetch a specific Pokémon. | `limit`, `offset` | `/api/v2/pokemon?limit=10&offset=20`    |
| `/api/v2/pokemon/{id or name}`      | Get detailed data of a specific Pokémon.      | None              | `/api/v2/pokemon/25` (for Pikachu)      |
| `/api/v2/type`                      | List all Pokémon types.                       | None              | `/api/v2/type`                          |
| `/api/v2/type/{id or name}`         | Get details about a specific type.            | None              | `/api/v2/type/10` (for Fire)            |
| `/api/v2/ability`                   | List all abilities.                           | `limit`, `offset` | `/api/v2/ability?limit=5`               |
| `/api/v2/ability/{id or name}`      | Get details about a specific ability.         | None              | `/api/v2/ability/1` (for Stench)        |
| `/api/v2/move`                      | List all moves.                               | `limit`, `offset` | `/api/v2/move?limit=15`                 |
| `/api/v2/move/{id or name}`         | Get details about a specific move.            | None              | `/api/v2/move/1` (for Pound)            |
| `/api/v2/region`                    | List all regions.                             | None              | `/api/v2/region`                        |
| `/api/v2/region/{id or name}`       | Get details about a specific region.          | None              | `/api/v2/region/1` (for Kanto)          |
| `/api/v2/encounter-method`          | List all encounter methods.                   | None              | `/api/v2/encounter-method`              |
| `/api/v2/encounter-condition`       | List all encounter conditions.                | None              | `/api/v2/encounter-condition`           |
| `/api/v2/encounter-condition-value` | List all encounter condition values.          | None              | `/api/v2/encounter-condition-value`     |
| `/api/v2/evolution-chain`           | List all evolution chains.                    | `limit`, `offset` | `/api/v2/evolution-chain?limit=10`      |
| `/api/v2/evolution-chain/{id}`      | Get details about a specific evolution chain. | None              | `/api/v2/evolution-chain/1`             |
| `/api/v2/pokedex`                   | List all Pokédex entries.                     | None              | `/api/v2/pokedex`                       |
| `/api/v2/pokedex/{id or name}`      | Get details about a specific Pokédex.         | None              | `/api/v2/pokedex/1` (for Kanto Pokédex) |
| `/api/v2/item`                      | List all items.                               | `limit`, `offset` | `/api/v2/item?limit=20`                 |
| `/api/v2/item/{id or name}`         | Get details about a specific item.            | None              | `/api/v2/item/1` (for Master Ball)      |
| `/api/v2/stat`                      | List all base stats.                          | None              | `/api/v2/stat`                          |
| `/api/v2/stat/{id or name}`         | Get details about a specific stat.            | None              | `/api/v2/stat/1` (for HP)               |
