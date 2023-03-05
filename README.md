# Menu editor

This is an API for a Menu Builder Application..

## Prerequisites

This API uses the following technologies, make sure you have these installed.

**Required**:

- [Node](https://nodejs.org/en/download/)
- [Typescript](typescriptlang.org)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)
- [Docker](https://docs.docker.com/get-docker/)
- [Git](https://git-scm.com/downloads)

**Recommended** (these dependencies are great for development, code clarity, and formatting, but are not necessary to run the project):

- ([NVM](https://github.com/nvm-sh/nvm) is recommended)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/docs/en/install.html)
- [Postman](https://www.postman.com/downloads/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Development setup

1.  Build docker images

```
docker-compose build
```

3. Run dev image

```
docker-compose up -d
```

If it is the first time running these commands, they might take a couple of minutes, both installing packages and seting up the containers.

You can find the port where the API is running on the `.env` file (Normally set to port 4000).

This container is setup to watch changes on the source files, so changes are reflected automatically. You still have to rebuild if you add more dependencies, however.

**Additional setup**

To have autocomplete, remove errors from IDEs like VSCode, and more, install NodeJS dependencies.

```
yarn install
```

## Testing

Testing can be done in container. To run them in the container, just run:

```
docker exec ts-nodemon yarn test
```

Make sure the container is setup before running it.

Tests can also be run locally (They are easier to read that way). You must have dependencies installed to do this, however.

```
yarn test
```

_(All tests use the postgres-test container to run integration tests, so it must be running before executing any tests)_

Tests can also be constantly run while you are developing. (Only available locally, outside of docker)

```
yarn test:watch
```

## Production build

An additional, leaner, production build is available, by running:

```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```

This, however, does not watch for file changes.