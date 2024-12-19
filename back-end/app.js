const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const {sequelize} = require('./models');
const cors = require('cors');

dotenv.config();

/* === Routes Require === */
const indexRoutes = require('./routes/index')

/* === Express App 속성 설정 === */
const app = express();
app.set('port', process.env.PORT || 8080);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* === ORM을 사용하여 DB연동 및 Model들을 DB에 동기화 === */
sequelize.sync({ force: false })
    .then(() => {
        console.log('DB 연결 성공');
    })
    .catch((err) => {
        console.error('DB 연결 실패:', err);
    });
const corsOptions = {
    origin: 'http://localhost:3000', // 허용할 도메인
    optionsSuccessStatus: 200,    // 일부 브라우저를 위한 성공 상태 코드
};

/* === Middleware 설정 및 요청 === */
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie'
}))

/* === Routes use === */
app.use('/', indexRoutes)

/* === 404 에러 처리 미들웨어 === */
app.use((req,res,next) => {
    const err = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    err.status = 404;
    next(err)
})

/* === 에러 처리 미들웨어 === */
app.use((err,req,res,next)=>{
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500)
    res.render('error');
})

/* === Server Execute === */
app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 대기 중`);
})