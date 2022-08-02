import express from 'express';

import { createConnection } from './database';

import { router } from './routes';

createConnection().then(() => {
	const app = express();

	app.use(express.json());

  app.use(router);

  return app.listen(3000, () => console.log(`Server Running on port: 3000!`));
});
