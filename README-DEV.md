<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

 <p align="center">A Nest module wrapper for bugsnag logger.</p>
 
<p align="center">

<a href="https://www.npmjs.com/package/@schramautoparts/nest-bugsnag"><img src="https://img.shields.io/npm/v/@schramautoparts/nest-bugsnag.svg" alt="NPM Version" /></a>
<a href="https://github.com/schramautoparts/nest-bugsnag"><img src="https://img.shields.io/npm/l/@schramautoparts/nest-bugsnag.svg" alt="Package License" /></a>
<a href="https://twitter.com/AstridNkumbe"><img src="https://img.shields.io/twitter/follow/AstridNkumbe.svg?style=social&label=Follow"></a>

</p>

## Description

A [Nest](https://github.com/nestjs/nest) module wrapper for [bugsnag-js](https://github.com/bugsnag/bugsnag-js) logger.

## Installation

```bash
$ npm i @bugsnag/plugin-express --save
$ npm i @schramautoparts/nest-bugsnag --save
```

## Publish to npm
```bash
$ npm run clean:build
$ cd dist
$ npm version patch
$ npm publish
```

Updating your published package version number
To change the version number in package.json, on the command line, in the package root directory, run the following command, replacing <update_type> with one of the semantic versioning release types (patch, major, or minor):
Run npm publish.

```bash
# update_type is patch, major, or minor
$ npm version <update_type>
```

You need login once before publish 

```bash
$ npm login
```
