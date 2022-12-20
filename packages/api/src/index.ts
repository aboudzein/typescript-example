import * as Koa from "koa";
import * as Router from "koa-router";

import * as logger from "koa-logger";

import * as json from "koa-json";
import { nextTick } from "process";


const app = new Koa();
const router = new Router();

router.get("/", async (ctx, next) => {
    ctx.body = "Hello World";

    await next();
});


app.use(json());
app.use(logger());

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000 , () => {
    console.log("Server listening on port 3000");
});
