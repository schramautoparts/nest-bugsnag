import { Inject, Injectable } from '@nestjs/common';
import Bugsnag, { type Client as BugsnagClient, Config } from '@bugsnag/js';
import { MODULE_OPTIONS_TOKEN } from './bugsnag.module-definition';

@Injectable()
export class BugsnagService {
  private readonly _instance: BugsnagClient;

  constructor(@Inject(MODULE_OPTIONS_TOKEN) options: Config) {
    this._instance = Bugsnag.start(options);
  }

  get instance(): BugsnagClient {
    return this._instance;
  }
}
