<h2> Project Title</h2>
This project is called Simply be automation

<h2> Prerequisites </h2>
This project is built using <b>Playwright v1.49.</b> with <b>Typescript</b>.          

<br>

For correct project setup following softwares should be installed on the machine:

1. Node<br>
Please check [official documentation](https://nodejs.org/en/download/package-manager) to install Node

2. Playwright<br>
Please check [official documentation](https://playwright.dev/docs/intro#installing-playwright) to install Playwright

3. Git<br>
Please check [official documentation](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) to install Git

<h2> Clone the repository </h2>
<p>To clone the repository into your local machine please execute below command</p>

```console
https://github.com/abhithakur02379/simplybe-playwright-automation.git
```
<p>After successfully cloning the repository please change directory to project folder by executing below command</p>

```console
cd simply-be-playwright-automation
```

<h2> Test Execution </h2>

<h4> Headed Mode </h4>

To run this project in headed mode, please execute the following command

```console
npx playwright test --project chrome --headed
````

To run this project in headless mode, please execute the following command
```console
npx playwright test --workers=1
```

To run in windowed mode with Playwright interface, run the following command:

```console
npx playwright test --ui --workers=1
```

<h2> Reports </h2>

<p> Reports will be generated automatically after executions. This project generates 2 types of reports. Details to generate the reports are mentioned below: </p>

<h4> 1. Playwright Report</h4>

<p> This is the default report generated by playwright. To see report, plese run the following command: </p>

```console
npx playwright show-report
```

<p>Report will automatically be stored inside <b>playwright-report</b> folder and can be accessed at any time by manually opening the <b>index.html</b> file.</p>

<h4> 2. Allure Report</h4>

Allure report is a third party reporting tool that can be integrated with playwright. To know more about the integration please visit the [official documentation](https://github.com/allure-framework/allure-js/tree/main/packages/allure-playwright)

<p> To install allure report in the project, please run the following command:</p>

```console
npm install -D allure-playwright
```
<p> To clean any existing report, please run the following command:</p>

```console
allure generate ./allure-results -o ./allure-report --clean
```

<p> To open the newly generated report, please run the following command:</p>

```console
allure open ./allure-report
```

<h2> Test Result </h2>

Click [here](https://drive.google.com/drive/u/0/folders/10T0ph7mtZAb5cKAI349eR952S4gNP1uN) if you want to download this project's test report. This is the Playwright default report only. To get the allure report, please follow the steps mentioned in Reports section.