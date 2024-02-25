import { Test, TestingModule } from '@nestjs/testing';
import { BugsnagModule, BugsnagService } from '../lib';

describe('Bugsnag Module', () => {

  it('Test root method', async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BugsnagModule.register({
        apiKey: 'some random key',
      })],
    }).compile();

    const provider = moduleFixture.get(BugsnagService);
    expect(provider).toBeInstanceOf(BugsnagService);
    expect(provider).toHaveProperty('instance');
    expect(provider.instance).toBeDefined();
  });

  it('Test root async method', async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BugsnagModule.registerAsync({
        useFactory: () => {
          return {
            apiKey: 'random-key',
          };
        },
      })],
    }).compile();

    const provider = moduleFixture.get(BugsnagService);
    expect(provider).toBeInstanceOf(BugsnagService);
    expect(provider).toHaveProperty('instance');
    expect(provider.instance).toBeDefined();
  });
});
