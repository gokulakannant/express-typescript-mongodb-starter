# Express Typescript Mongodb Starter

A express app that exposed the basic api's. The project has preconfigured ts-lint, type-doc, jest, Docker and its sample usage.

## Key Features

* Docker configured for easy to deploy servers like staging, production and etc.
* The typedoc will automatically generated from the implemented code for other developer reference.
* Swagger document configured for testing the API
* JWT has configured to authendicate the API's.
* Jest configured for test the exposed apis and to get to know the code coverage.
* Ts lint configured for to keep the clean and beautiful code
* The preconfigured nodemailer will send the newly registered users password to their email id.

## Getting started

* [Prerequisites](#prerequisites)
* [Notes](#notes)
* [Directory Structure](#directory-structure)
* [Installing](#installing)
* [NPM Scripts](#npm-scripts)
* [Versioning](#versioning)
* [Authors](#authors)
* [License](#license)
* [Known Bugs](#known-bugs)

### Prerequisites

The required prerequistites are given below,

#### Packages used :

##### ***Dependencies***:

* bcryptjs
* body-parser
* cookie
* debug
* express
* helmet
* jsonwebtoken
* mongodb
* nodemailer
* nodemailer-smtp-transport
* winston

##### ***Dev dependencies***:

* @types/bcryptjs
* @types/body-parser
* @types/chai
* @types/debug
* @types/express
* @types/helmet
* @types/jest
* @types/js-yaml
* @types/jsonwebtoken
* @types/mongodb
* @types/node
* @types/nodemailer
* @types/nodemailer-smtp-transport
* @types/supertest
* @types/swagger-ui-express
* @types/winston
* bestzip
* chai
* jest
* jest-html-reporter
* js-yaml
* nodemon
* shx
* supertest
* swagger-ui-express
* ts-jest
* ts-node
* tslint
* typedoc
* typescript

##### **Assume my platform are :**

* Linux (Ubundu 16.04)

##### **Assume my configurations are :**

* NODE v10.5.0
* NPM 6.1.0
* MongoDB 3.6.5

> **Note:**
> Refer the technical documentation in ***Documentation*** folder.
> Download the technical documentation from the path `Documentation/Technical-Documentation.zip`

### Directory Structure

```bash
.
├── Documentation
│   ├── assets
│   │   ├── css
│   │   ├── images
│   │   └── js
│   ├── classes
│   └── interfaces
├── src
│   ├── config
│   │   └── yaml
│   ├── database
│   │   ├── migrations
│   │   └── seeders
│   ├── helpers
│   ├── middleware
│   ├── routes
│   ├── services
│   │   └── auth
│   └── types
│       └── auth
├── storage
│   └── log
├── test
│   ├── apis
│   └── helpers
└── TestReport

```

### Installing

The installation and server initialization steps are given below,

Step 1: Clone the repository into your machine

```bash
git clone https://github.com/gokulakannant/express-typescript-mongodb-starter.git
```

step 2 : Change the directory

```bash
cd express-typescript-mongodb-starter
```

step 3 : Run the below command

```bash
npm install
```

step 4 : Build the typescript files

```bash
npm run build
```

step 5 : To initialize the server

```bash
npm run setup
```

step 6 : To run the test cases

```bash
npm run test
```

step 7 : To start the server

```bash
npm start
```

> **Note:**
> To make sure the `MongoDB` service is started before running following npm scripts.
> The npm scripts are: `start`, `setup`, `test`, `watch`, `watch-test`
>

### NPM Scripts

|`npm run <script>`|Description|
|------------------|-----------|
|`build-ts`|Build the ts files.|
|`watch-ts`|Build the ts files and **watch** it.|
|`tslint`|Execute `ts-lint`.|
|`migrate`|Creates preconfigured mongodb collections.|
|`seed`|To add sample data for dev.|
|`setup`|Combine migrate and seed npm scripts.|
|`clean-docs`|Clean the Technical documentation folder.|
|`predocs`|To execute the clean-docs before generating docs|
|`docs`|Generate the documentation|
|`postdocs`|Generate zip file of the generated documentation|
|`watch`|Compile watch-ts and execute nodemon for dev|
|`watch-test`|Watching the unit test scripts|
|`prebuild`|Remove the dist directory.|
|`build`|Compile and assemble bundles.|
|`postbuild`|Copy the static assets to the dist folder.|
|`start`|Start node server.|
|`test`|Run the unit test scripts.|

## Versioning

Latest Version : 1.0.0

## Authors

* **Gokulakannan T**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Known Bugs

* Refresh token concept needs to be implement.
