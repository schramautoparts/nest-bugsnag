import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { BugsnagService } from './bugsnag.service';

@Catch()
export class BugsnagExceptionsFilter extends BaseExceptionFilter {
  constructor(private readonly bugsnagService: BugsnagService) {
    super();
  }
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();

    const { body, ...requestInfo } = this.extractRequestInfo(req);
    const metaData = requestInfo;
    const request = {
      body,
      clientIp: requestInfo.clientIp,
      headers: requestInfo.headers,
      httpMethod: requestInfo.httpMethod,
      url: requestInfo.url,
      referer: requestInfo.referer,
    };

    if (req && exception instanceof Error) {
      this.bugsnagService.instance.notify(exception, (event) => {
        event.request = { ...event.request, ...request };
        event.addMetadata('request', metaData);
      });
    }

    super.catch(exception, host);
  }

  private extractRequestInfo(req: any) {
    // Borrowed from bugsnag/express-plugin;
    const connection = req.connection;
    const address = connection?.address?.();
    const portNumber = address?.port;
    const port =
      !portNumber || portNumber === 80 || portNumber === 443
        ? ''
        : `:${portNumber}`;
    const protocol =
      typeof req.protocol !== 'undefined'
        ? req.protocol
        : req.connection.encrypted
          ? 'https'
          : 'http';
    const hostname = (
      req.hostname ||
      req.host ||
      req.headers.host ||
      ''
    ).replace(/:\d+$/, '');
    const url = `${protocol}://${hostname}${port}${req.url}`;
    const request: Record<string, any> = {
      url,
      path: req.path || req.url,
      httpMethod: req.method,
      headers: req.headers,
      httpVersion: req.httpVersion,
      params: this.extractObject(req, 'params'),
      query: this.extractObject(req, 'query'),
      body: this.extractObject(req, 'body'),
    };

    request.params = req.params;
    request.query = req.query;
    request.body = req.body;

    request.clientIp =
      req.ip || (connection ? connection.remoteAddress : undefined);
    request.referer = req.headers.referer || req.headers.referrer;

    if (connection) {
      request.connection = {
        remoteAddress: connection.remoteAddress,
        remotePort: connection.remotePort,
        bytesRead: connection.bytesRead,
        bytesWritten: connection.bytesWritten,
        localPort: portNumber,
        localAddress: address ? address.address : undefined,
        IPVersion: address ? address.family : undefined,
      };
    }

    return request;
  }

  // Borrowed from bugsnag/express-plugin;
  // https://github.com/bugsnag/bugsnag-js/blob/next/packages/core/lib/extract-object.js
  private extractObject(host: Record<string, unknown>, key: string) {
    if (
      host[key] &&
      typeof host[key] === 'object' &&
      Object.keys(host[key]).length > 0
    ) {
      return host[key];
    }
    return undefined;
  }
}
