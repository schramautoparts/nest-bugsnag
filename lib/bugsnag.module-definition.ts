import { Config } from '@bugsnag/js';
import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface BugsnagModuleDefinition extends Config {}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<BugsnagModuleDefinition>()
      .setExtras({
          global: false,
      },
          (definition, extras) => ({
              ...definition,
              global: extras.global,
          }),
      )
      .build();
