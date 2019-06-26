# LOAN DEMO PROJECT

## Requirements

You will only need Node.js installed on your environement.

### Node

[Node](http://nodejs.org/) is really easy to install & now include [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure
below.

    $ node --version
    v12.4.0

    $ npm --version
    6.9.0

## Install YARN and verify its verison

    $ npm i yarn
    $ yarn --version
    1.17.0

## Install Project Dependencies
    $ git clone https://github.com/noori5/LoanDemo.git
    $ cd LoanDemo/
    $ yarn install


## Start & watch

    $ yarn start

## Simple build for production

    $ yarn run build
    
    URL for deployed application: http://loandemo.s3-website.ap-south-1.amazonaws.com

## Instructions for Workaround
   1. There are 2 inputs required: Loan Amount and Loan Duration.
   2. Each input has its slider and input field to change values.
   3. Slide the bars and you can see your Monthly Installment Value and Interest Rate accordingly.
   4. Respective Errors are shown incase of out-of-range or inapplicable values.
   
## Screen Shots
   ![1](https://github.com/noori5/LoanDemo/blob/master/1.png)
   ![2](https://github.com/noori5/LoanDemo/blob/master/2.png)
   ![3](https://github.com/noori5/LoanDemo/blob/master/3.png)
