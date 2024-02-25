<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

 <p align="center">A Nest module wrapper for bugsnag logger.</p>
 
<p align="center">

<a href="https://www.npmjs.com/package/@schramautoparts/nest-bugsnag"><img src="https://img.shields.io/npm/v/@schramautoparts/nest-bugsnag.svg" alt="NPM Version" /></a>
<a href="https://github.com/schramautoparts/nest-bugsnag"><img src="https://img.shields.io/npm/l/@schramautoparts/nest-bugsnag.svg" alt="Package License" /></a>

</p>

## Description

A [Nest](https://github.com/nestjs/nest) module wrapper for [bugsnag-js](https://github.com/bugsnag/bugsnag-js) logger.

## Installation

```bash
$ npm i @schramautoparts/nest-bugsnag --save
```

## Quick Start

Import the `BugsnagModule` into the module. For example `AppModule`:

```typescript
import { Module } from '@nestjs/common';
import { BugsnagModule } from '@schramautoparts/nest-bugsnag';

@Module({
  imports: [
    // or registerAsync()
    BugsnagModule.register({
      apiKey: '<API_KEY>',
    }),
  ], 
  // Global Http Exception Filter
  providers: [{
    provide: APP_FILTER,
    useClass: BugsnagExceptionsFilter,
  }],
})
export class AppModule { }
```

Then you can inject BugsnagService. Example:

```typescript
import { Controller } from '@nestjs/common';
import { BugsnagService } from '@schramautoparts/nest-bugsnag';

@Controller('cats')
export class CatsController {
  constructor(private readonly bugsnag: BugsnagService) { }
}
```

BugsnagService has instance property which wrap bugsnag client. So you can access it by calling:

```typescript
try {
  something.risky()
} catch (e) {
    this.bugsnag.instance.notify('message');
}
```

## Async configuration Sample

```typescript
import { Module } from '@nestjs/common';
import { BugsnagModule } from '@schramautoparts/nest-bugsnag';

@Module({
  imports: [
    BugsnagModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        // options
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule { }
```

The factory might be async and is able to inject dependencies through the `inject` option.
