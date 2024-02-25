import { Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './bugsnag.module-definition';
import { BugsnagService } from './bugsnag.service';
import { BugsnagExceptionsFilter } from './bugsnag.filter';

@Module({
  providers: [BugsnagService, BugsnagExceptionsFilter],
  exports: [BugsnagService],
})
export class BugsnagModule extends ConfigurableModuleClass {}
