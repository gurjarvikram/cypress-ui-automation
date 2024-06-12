## Welcome to Vikram's QA Engineering Portfolio!

This repository showcases expertise in both Manual and Automation Test Engineering. It serves as a platform to share knowledge, demonstrate best practices, and continuously refine skills.

The aim is for this repository to become a valuable resource for aspiring QA Engineers, offering insights and practical examples to support their learning journey. Additionally, it can serve as a foundation for establishing a QA department when the opportunity arises.

Thank you for visiting this profile. Hopefully, this portfolio will be informative and helpful!

### Tools

#### [Cypress](https://www.cypress.io/)
Cypress is a next-generation front-end testing tool built for modern web applications. It enables developers to write tests in JavaScript, offering fast, reliable end-to-end, integration, regression, and unit testing for anything that runs in a browser.

#### [Cucumber](https://cucumber.io/)
Cucumber supports Behavior-Driven Development (BDD), allowing you to write tests in a natural language that can be understood by all stakeholders, facilitating better communication and collaboration.

#### [Cypress Cloud](https://www.cypress.io/cloud)
Cypress Cloud provides a scalable, managed environment for running Cypress tests in the cloud. It features parallelization, detailed dashboards, and enhanced test insights, making it easier to manage large test suites.

#### [Git](https://git-scm.com/)
Git is a distributed version control system that allows developers to work together efficiently, track changes, and control software versions. It is essential for team collaboration and maintaining code integrity.

#### [GitHub](https://github.com/)
GitHub supports Git for version control and provides a collaborative environment for hosting, reviewing code, managing projects, and building software. It integrates seamlessly with many development tools and workflows.

#### [Node.js](https://nodejs.org/)
This repository utilizes Node.js, a powerful JavaScript runtime environment, to execute Cypress tests. Node.js enables seamless integration with Cypress, supports modern JavaScript features, and provides access to a vast ecosystem of packages via npm (Node Package Manager). Its asynchronous and event-driven architecture ensures efficient execution, making it an ideal choice for building scalable Cypress automation frameworks.

#### [Visual Studio Code](https://code.visualstudio.com/)
Visual Studio Code is a lightweight yet powerful source code editor. It is widely used for practicing HTML, CSS, and other programming languages, offering numerous extensions that enhance development productivity.

### Brief Overview of Cypress IO

#### What is Cypress?
Cypress is a powerful, next-generation front-end testing tool built for modern web applications. It enables developers to write tests in JavaScript, providing comprehensive end-to-end testing, integration testing, regression, and unit testing capabilities.

This enables you to write faster, easier and more reliable tests.

#### Key Features
Cypress offers several key features, including:
- Real-time reloads
- Automatic waiting
- Time Travel
- Easy debugging
- Screenshots
- Videos
- Test Replay
- Flake Detection
- Cross Browser Testing
- Smart Orchestration
- Interactive test runner

### Setting Up Cypress
From clone to installation/configuration:
1. Install [VS Code](https://code.visualstudio.com/)
2. Install [Node.js](https://nodejs.org/)
3. Clone the repository: [Cypress UI API Automation](https://github.com/gurjarvikram/cypress-ui-api-automation.git)
4. Configure Git
5. Install Cypress:

   ```sh
   npm install cypress --save-dev
   ```

### Framework Overview
1. Cypress Framework
2. Cucumber Framework (BDD)
   - Feature Files: Contain the test scenarios using the Gherkin language with Given, When, And, Then keywords.
3. Step Definitions
4. POM (Page Object Model)
5. CI/CD with GitHub Actions:
   - Parallel Execution Across Browsers: The cypress-browsers.yml workflow runs Cypress tests in parallel across different browsers (Chrome, Firefox, and Electron).

```bash

name: Cypress Parallel Browser Tests

on: [push, pull_request]

jobs:
  cypress-run:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        browser: [chrome, firefox, electron]
        spec_file: [login.feature, product.feature]

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '14' # Adjust Node.js version as needed

      - name: Install Cypress
        run: npm install cypress --save-dev

      - name: Run Cypress tests on ${{ matrix.browser }}
        run: |
          npx cypress run --browser ${{ matrix.browser }} --spec "cypress/integration/${{ matrix.spec_file }}"
```
  
6. CI/CD with Circle CI:

```bash

version: 2.1

jobs:
  build:
    machine:
      image: ubuntu-2004:202201-01
    steps:
      - checkout
    
      - run:
          name: Install dependencies
          command: npm install
          
      - run:
          name: Cypress install
          command: npx cypress install
          
      - run:
          name: Run tests
          command: npx cypress run
```
          
7. Cypress Cloud:
    - We can see the recorded tests for this project at the [Cypress Cloud](https://cloud.cypress.io/organizations/9698d65f-c3dd-49fd-87f6-c1db1218f678/projects) link.

### How to Run & Record Cypress Scripts into Cypress Cloud

#### Running Cypress Tests Without Recording to Cypress Cloud

- **Headed Mode**:

  ```sh
  npx cypress open
  ```
  
- **Headless Mode**:
  - To run all files:

    ```sh
    npx cypress run
    ```
  - To run an individual file:

    ```sh
    npx cypress run --spec <relative path of the feature file>
    ```

#### Recording the Script from a Local System into Cypress Cloud

```sh
npx cypress run --spec <relative path of the feature file> --record --key <record key>
```

```sh
npx cypress run --record --key <record key>
```

### License
The Cypress io framework is a free, [open-source](https://github.com/cypress-io/cypress) software licensed under the [MIT license](https://opensource.org/license/MIT).
