# Project Name
  Barebnb

> This repo is a service module for the HRR38 FEC project
> It is a review service module based off of the airbnb review section on a indiviual home listing page on their webpage (not the mobile app)


## Related Projects

  - https://github.com/5uper5quad/Ja5mine-5ervice
  - https://github.com/5uper5quad/Cam5-5ervice
  - https://github.com/5uper5quad/5arki5-5ervice
  - https://github.com/5uper5quad/Gloria-5ervice

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> This service requires a number of different packages listed in the package.json
> based on each one, there are specifc requirements for proper styling and syntax (reading documentation for ones you're unfamiliar with are recommended)
> After installing the packages- running the script 'npm run build' and 'npm start' are necessary in order to run the server and webpack build
> The webpack.config.js file should transpile the es6 syntax (using babel) from the client directory files into file 'bundle.js' that is imported into the index.html file within the public directory

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```


To Run the service:

npm run start

To create a seeding file and upload it to the Database:

npm run seed

Make sure that you have previously created the table in postgres and that you have started postgres

This command should be executed in the cqlsh terminal to create the table

CREATE TABLE reviews(
id int PRIMARY KEY,
imagePath text,
name text,
postDate text,
review text,
accuracyRating text,
communicationRating text,
cleanlinessRating text,
locationRating text,
checkinRating text,
valueRating text,
);



