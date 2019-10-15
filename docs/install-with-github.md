# Getting Started

* [Installation](#1-installation)
* [NPM Scripts](#npm-scripts)

### Installation

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
