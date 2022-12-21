import * as Koa from 'koa';
import * as Router from 'koa-router';
import { Repository } from 'typeorm';
import exampleEntity from './example.entity';
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';

import AppDataSource from '../database/database.connection';

const routerOpts: Router.IRouterOptions = {
  prefix: '/example',
};

const router: Router = new Router(routerOpts);

router.get('/', async (ctx:Koa.Context) => {

  const exampleRepo:Repository<exampleEntity> = AppDataSource.getRepository(exampleEntity);


  const examples = await exampleRepo.find();

  ctx.body = {
    data: { examples },
  };
});

router.get('/:example_id', async (ctx:Koa.Context) => {

  const exampleRepo:Repository<exampleEntity> = AppDataSource.getRepository(exampleEntity);

  const example = await exampleRepo.findOne(ctx.params.example_id);

  if (!example) {
    ctx.throw(StatusCodes.NOT_FOUND);
  }

  ctx.body = {
    data: { example },
  };
});

router.post('/', async (ctx:Koa.Context) => {
 
  const exampleRepo:Repository<exampleEntity> = AppDataSource.getRepository(exampleEntity);
  const example: exampleEntity = exampleRepo.create(ctx.request.body);
  await exampleRepo.save(example);
  ctx.body = {
    data: { example },
  };
});

router.delete('/:example_id', async (ctx:Koa.Context) => {
 
  const movieRepo:Repository<exampleEntity> = AppDataSource.getRepository(exampleEntity);

  // Find the requested movie.
  const movie = await movieRepo.findOne(ctx.params.example_id);

  // If the movie doesn't exist, then throw a 404.
  // This will be handled upstream by our custom error middleware.
  if (!movie) {
    ctx.throw(StatusCodes.NOT_FOUND);
  }

  // Delete our movie.
  await movieRepo.delete(movie);

  // Respond with no data, but make sure we have a 204 response code.
  ctx.status = StatusCodes.OK;
});

router.patch('/:example_id', async (ctx:Koa.Context) => {
  const exampleRepo:Repository<exampleEntity> = AppDataSource.getRepository(exampleEntity);

  // Find the requested movie.
  const example:exampleEntity = await exampleRepo.findOne(ctx.params.example_id);
  if (!example) {
    ctx.throw(StatusCodes.NOT_FOUND);
  }

  const updatedExample = await exampleRepo.merge(example, ctx.request.body);

  exampleRepo.save(updatedExample);


  // Respond with our movie data.// Response with the updated content.
  ctx.body = {
    data: { movie: updatedExample },
  };
});

export default router;