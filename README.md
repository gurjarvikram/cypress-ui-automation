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

#### [Jira](https://www.atlassian.com/software/jira)
Jira is a powerful project management tool used for issue tracking and project management. It helps teams plan, track, and manage Agile software development projects efficiently, ensuring smooth workflows and effective collaboration.

#### [Git](https://git-scm.com/)
Git is a distributed version control system that allows developers to work together efficiently, track changes, and control software versions. It is essential for team collaboration and maintaining code integrity.

#### [GitHub](https://github.com/)
GitHub supports Git for version control and provides a collaborative environment for hosting, reviewing code, managing projects, and building software. It integrates seamlessly with many development tools and workflows.

#### [Postman](https://www.postman.com/)
Postman is a collaboration platform for API development. It simplifies the process of building, testing, and documenting APIs, making it an essential tool for ensuring API reliability and performance.

#### [Visual Studio Code](https://code.visualstudio.com/)
Visual Studio Code is a lightweight yet powerful source code editor. It is widely used for practicing HTML, CSS, and other programming languages, offering numerous extensions that enhance development productivity.

### Brief Overview of Cypress IO

#### What is Cypress?
Cypress is a powerful, next-generation front-end testing tool built for modern web applications. It enables developers to write tests in JavaScript, providing comprehensive end-to-end testing, integration testing, regression, and unit testing capabilities.

Cypress consists of a free, [open-source](https://github.com/cypress-io/cypress) testing tool and [Cypress Cloud](https://docs.cypress.io/guides/cloud/introduction) for recording your tests.

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
5. Cypress Cloud

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
