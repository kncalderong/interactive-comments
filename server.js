import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();

//to handle errors throught middleware
import 'express-async-errors'

//to redirect front build to our server side rendering correct path
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

//to secure some general vulnerabilities that could have a backend
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

// db and authenticateUser
import connectDB from './db/connect.js';

// routers
import commentsRouter from './routes/commentsRoutes.js'

// middlewares
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/build'))); //this middlewere allows access to all static files

app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use('/api/v1/comments', commentsRouter);

// only when ready to deploy
app.get('*', (req, res) => { //this middleware allows me to handle every possible route in the front end through the index.html, but it always must be called after my server routes (the above ones)
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log('error connecting to database: ', error);
  }
};

start()
