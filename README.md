# intra-epitech-client

## Description

This is a client for the intra-epitech API. It is written in TypeScript and is meant to be used in a NodeJS environment.

## Installation

```npm install intra-epitech-client```

## Usage

### Usage with cookie in environment variable

Add a environment variable named `EPITECH_COOKIE` with the value of your intra cookie.

```typescript
import EpitechClient from 'intra-epitech-client';

const client = new EpitechClient();

client.user.getStudentName().then((name) => {
    console.log(name);
});
```

### Usage with cookie in constructor

```typescript
import EpitechClient from 'intra-epitech-client';

const client = new EpitechClient('your cookie');

client.user.getStudentName().then((name) => {
    console.log(name);
});
```

## Documentation

coming soon

## Contributing

If you want to contribute to this project, feel free to fork it and submit a pull request. I will review it as soon as possible. If you have any questions, you can contact me by email at [alexis.faure@epitech.eu](mailto:alexis.faure@epitech.eu).

### Run tests

```npm test```

### Run linter

```npm run lint```

### Run linter and fix errors

```npm run lint:fix```

### Run in dev environment

```npm run dev``` (nodemon required)
