import express from 'express'

import { createConnection } from './database'

createConnection().then(() => {
	const app = express()

	app.use(express.json())

  app.get('/', (_request, response) => {
    return response.status(200).json({ message: 'Server Running!'});
  });


  return app.listen(3000, () => console.log(`Server Running on port: 3000!`));
});
