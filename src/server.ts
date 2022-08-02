import express from 'express';
import swaggerUI from 'swagger-ui-express';

import { createConnection } from './database';

import { router } from './routes';

import './shared/container';

import swaggerFile from './swagger.json';

createConnection().then(() => {
	const app = express();

	app.use(express.json());
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

  app.use(router);

  return app.listen(process.env.PORT || 3000, () => console.log(`Server Running on port: 3000!`));
});
