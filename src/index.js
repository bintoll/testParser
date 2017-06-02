import express from 'express'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import mongodb from 'mongodb'
import monk from 'monk'
const db = monk('localhost:27017/testParse');


import index from './routes/index.js'
import users from './routes/users.js'
import fileUpload from './routes/fileUpload.js'

const app = express();
// view engine setup
app.set('views', 'views');
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '20mb'
}));
app.use(cookieParser());
app.use(express.static('public'));

app.use((req,res,next) => {
    req.db = db;
    next();
});

app.use('/api/', index);
app.use('/api/users', users);
app.use('/api/fileUpload', fileUpload);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app
