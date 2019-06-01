// Get dependencies
import {NextFunction, Request, Response, } from 'express';
import Express from 'express';
import * as path from 'path';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as log4js from 'log4js';
import test from "./routes/test";
import {movies} from "./routes/movies"; 
import {api} from './routes/api';
import {pdftest} from './routes/pdftest';
import {Logger} from './util/logger';

// ログの設定
Logger.init();
var systemLogger = Logger.getSystemLogger(); 
var accessLogger = Logger.getAccessLogger();

// Get our API routes
const app = Express();
app.use(log4js.connectLogger(accessLogger, {}));

// Parsers for POST data
// app.use(bodyParser.jsosn());
app.use(bodyParser.urlencoded({ extended: false }));

// Cross Origin middleware
app.use(function(req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  });

// Set our api routes
app.use('/', movies);
app.use('/', api);
app.use('/', pdftest);

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
Logger.info("Express start");
