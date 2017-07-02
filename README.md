# Vue + TypeScript + Webpack Example

This example project demonstrates how to write Vue components using TypeScript and how to bundle them with Webpack.

## Getting started

Please make sure that the following software is installed on your computer:

* Node.js (v6.9.0 or higher)
* NPM (v3.10.8 or higher)

### Preparing the project

Clone the repository and open a terminal in the project directory. Then execute the command `npm install`.

### Starting the development server

Execute the command `npm start` in the project directory. This will bring up a Webpack development server with source watching and live reloading.

### Running the tests

Execute the command `npm test` in the project directory. This will start Karma and run the unit tests described in the test spec files. A coverage report is generated in the `coverage` directory.

### Building the distribution

Execute the command `npm run build` in the project directory. This will launch the Webpack build to create compact JavaScript bundles in the `dist` directory which can then be shipped to production.

### Serving the distribution

Execute the command `npm run start:dist` after building the distribution to bring up a web server hosting the files created in the `dist` directory. This can be used for final smoke tests before delivery.

## Concepts

### Project structure

Here is an overview of the file structure in this project:

Source code:

* **/src**: Directory for the real application source code. This should not contain any files required only for building.
* **/src/app.ts**: Main module which is the entry point for the application. Webpack starts bundling with this module.
* **/src/simple**: Source code and test spec file for the simple Vue component.
* **/src/self-contained**: Source code, test spec and image resources for the self-contained Vue component.
* **/src/static**: Static resources like a test web page which are simply copied to the distribution during build. This is also the content root for the Webpack development server.

Configuration:

* **/package.json**: Project description file for NPM containing meta-data and dependency declarations.
* **/tsconfig.json**: TypeScript compiler configuration. Most important setting is `"allowSyntheticDefaultImports": true` which is required for Vue.
* **/tslint.json**: TSLint configuration. Used during Webpack build to check code style.
* **/karma.conf.js**: Karma configuration describing how to run the unit tests.
* **/.editorconfig**: EditorConfig settings to ensure consistent code style across multiple editors.
* **/config**: Directory with different Webpack configurations for development and production.

Generated files:

* **/coverage**: Directory containing the test coverage report after running the unit tests.
* **/dist**: Directory containing the final distribution after running the build.

### Development server

The project is configured to provide a Webpack development server which facilitates development by automatically recompiling the sources on changes and reloading the app in the browser.

The `package.json` configuration file defines the dependency `webpack-dev-server` and contains the `start` script which launches that server. Further configuration can be found in `config/webpack-dev.config.js` which configures the content root und the HTTP port.

### Webpack build

The distribution is generated directly from the TypeScript source code using a Webpack build with various loaders.

The `config/webpack-base.config.js` configuration file contains the essential settings for the build process. This file is used as a basis for the `config/webpack-prod.config.js` used by the `build` script in the `package.json` file.

#### Direct TypeScript input

The `ts-loader` allows Webpack to load TypeScript modules directly. They are transpiled on-the-fly using the configuration provided in the `tsconfig.json` file.

#### TypeScript linting

The `tslint-loader` performs code style checks before the files are transpiled. The style rules can be configured in the `tslint.json` file.

#### Vue component support

The `vue-loader` enables Webpack to load Vue single file components (`*.vue` files) as modules. The corresponding template, script and styles are automatically compiled appropriately. See the self-contained component for more details.

#### Image embedding

The `url-loader` detects images which are imported as modules or referenced in Vue templates. If the image file is less than 8 KB in size it generates a `data`-URL with the Base64-encoded image data. Small images are automatically embedded into the app bundle so that the browser does not have to load them separately.

#### Vue module with template compiler

An important thing is the `alias` for the `vue` module which maps to `vue/dist/vue.esm.js`. This ensures that the bundle uses the full Vue distribution which also contains the template compiler. Without that compiler the simple component would not work because Vue has to compile the template contained in the `index.html` page at runtime.

#### Vendor code separation

The `CommonsChunkPlugin` is used to generate two bundles `app.bundle.js` and `vendor.bundle.js`. The `app.bundle.js` contains the compiled code and assets for our own application while the `vendor.bundle.js` contains all the library code like Vue which should change very often.

This allows the browser to cache the quite large `vendor.bundle.js` and reuse it as long as we do not change libraries. Only the `app.bundle.js` needs to be reloaded from the server when an update has been deployed.

In order to separate the vendor libraries the small helper module `src/lib.ts` is used. It imports all libraries that we want to pull out of the app bundle into the vendor bundle. This lib module is used as another entry point for the Webpack build. The `CommonsChunkPlugin` detects the common modules in both the app and the lib entry point and extracts them to the vendor bundle. So finally, the `lib.bundle.js` is not needed and therefore deleted after the build.

### Unit testing

The project is set up to use the fantastic `karma-typescript` module to allow writing unit tests in TypeScript and have them run directly in Karma.

See the `karma.conf.js` configuration where `karma-typescript` is used as a framework, preprocessor and reporter. This is because it has to kick in at several hooks during test execution (e.g. to transpile TypeScript source code automatically and to generate the Istanbul coverage report).

With that configuration we can simply put the test spec files right next to the source files to be tested. I highly recommend to prefer this organization over a separate `tests` directory. This keeps the real source code and its corresponding test in one place making it easy to understand and maintain.

## License

[MIT](https://opensource.org/licenses/MIT)
