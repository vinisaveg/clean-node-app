# next-unicorn-project-server

the _next-unicorn-project-server_ is the backend server for a new project I am working on.

## Installing :construction_worker:

Clone this repo:

    git clone https://github.com/vinisaveg/next-unicorn-project-server.git

Install dependencies:

    yarn install

## Setup :wrench:

Create a .env file with the following environment vars:

    MONGO_INITDB_ROOT_USERNAME=
    MONGO_INITDB_ROOT_PASSWORD=

    ME_CONFIG_MONGODB_URL=mongodb://USERNAME:PASSWORD@mongodb:27017/
    ME_CONFIG_MONGODB_ADMINUSERNAME=
    ME_CONFIG_MONGODB_ADMINPASSWORD=

Run the database containers:

    yarn up

## Running :runner:

Development mode:

    yarn dev

Build the application:

    yarn build

Run build application:

    yarn start

## Testing :rotating_light:

Running the tests:

    yarn test

## Development :gear:

Configuring husky and git hooks

    npx husky install
