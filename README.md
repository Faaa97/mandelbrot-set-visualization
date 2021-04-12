# Mandelbrot Set Visualization <!-- omit in toc -->

- [Directory Structure](#directory-structure)
- [How to use](#how-to-use)
- [Running tests](#running-tests)
- [Reading jsdoc docs](#reading-jsdoc-docs)

## Live demo

You can enter the live demo [here](https://faaa97.github.io/mandelbrot-set-visualization/)

## Directory Structure

This directory is organised as follows:

      .
      ├── docs         # jsdoc documentation
      ├── src          # Source code
      ├── tests        # Source code for tests
      ├── web-server   # Source code for web-server
      └── www          # Webpage that web-server will load

## How to use

First we need to install npm packages

```console
$ npm install
```

Then we can run the configured express web-server for local hosting

```console
$ npm start

  > node web-server/app.js

  The server is running on http://<your machine IP addr>:8080
```

You can navigate to the address that is printed on screen.

## Running tests

To run all tests you can run the following:

```console
$ npm test
```

## Reading jsdoc docs

If you already have web-server started (see [How to use](#how-to-use) section), you can go to `http://<your machine IP addr>:8080/docs/index.html` or you can open `docs/index.html` by yourself.

