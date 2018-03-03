import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import config from './config.json';
import api from './api';
import error from './middleware/error';
import notFound from './middleware/not-found';

const app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({ exposedHeaders: config.corsHeaders }));

app.use(bodyParser.json({ limit: config.bodyLimit }));

// api router
app.use('/', api);

// 404
app.use(notFound);

// Error handler
app.use(error);

export default app;
