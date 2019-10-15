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
* dotenv
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
* @types/dotenv
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

- [With GitHub](./docs/install-with-github.md)
- [How to deploy a Express Typescript MongoDB Starter on Ubuntu 16.04](./docs/how-to-deploy-application.md)

## Versioning

Latest Version : 1.0.0

## Authors

* **Gokulakannan T**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Known Bugs

* Refresh token concept needs to be implement.
