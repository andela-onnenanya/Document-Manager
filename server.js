import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import UserRoutes from './server/routes/UserRoutes';

// Set up the express app
const app = express();
const router = express.Router();

// Log requests to the console.
app.use(morgan('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set up User routes
UserRoutes.initializeRoutes(router);

app.use(router);

// Setup a default catch-all route that sends back a welcome
// message in JSON format.
app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness; that leads to greatness',
}));

// module.exports = app;
app.listen(process.env.PORT || 8080);
console.log(`Server started on port ${process.env.PORT || 8080}`);
