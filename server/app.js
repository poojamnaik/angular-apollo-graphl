import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import HttpStatus from 'http-status-codes';
import path from 'path';
import errorReport from './utils/google-error-reporting';
// import gatewayApi from './routes';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(helmet());

app.use(morgan('dev'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/api',(req,res)=>{
    res.status(HttpStatus.OK).send('OK');
  } );
  
// check if graphql error is received here
app.use(errorReport.express);

process.on('unhandledRejection', err => {
  console.error('wrr1', err)
});

process.on('uncaughtException', err => {
  console.error('err2', err)
})

export default app;