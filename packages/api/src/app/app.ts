import * as Koa from 'koa';
import * as HttpStatus from 'http-status-codes';
import exampleController from '../example/example.controller';
import * as bodyParser from 'koa-bodyparser';
const app:Koa = new Koa();

app.use(bodyParser());
// Generic error handling middleware.
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.statusCode || error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    error.status = ctx.status;
    ctx.body = { error };
    ctx.app.emit('error', error, ctx);
  }
});

app.use(exampleController.routes());
app.use(exampleController.allowedMethods());

// Initial route
app.use(async (ctx:Koa.Context) => {
  ctx.body = 'Hello world';
});

// Application error logging.
app.on('error', console.error);

export default app;