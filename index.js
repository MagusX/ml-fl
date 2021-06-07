const express = require('express');
const fs = require('fs');
const multer = require('multer');
const app = express();
const { EventEmitter } = require('events');
const event = new EventEmitter();
const { loadingPage, resultPage } = require('./html');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/request')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage })

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
const spawn = require('child_process').spawn;
const command = spawn('./detect.sh');
let first = true;
let resData = '';

command.stdout.on('data', data => {
    const strData = `${data}`;
    resData += strData;
    console.log('17: ' + strData);

    // Detection finished
    if (strData.includes('Enter Image Path: ')) {
        if (first) {
            first = false;
        } else {
            event.emit('ready');
        }
    }
});

command.stderr.on('data', data => {
    console.log(`${data}`);
});

command.on('exit', code => {
    console.log('Child process exited with code ' + code);
});

function readySend(req, res, next) {
    console.log('sent');
    const fname = req.body.fname;
    const path = `../public/request/${fname}\n`;
    command.stdin.write(path);
    res.write(loadingPage());
    event.once('ready', () => {
        res.resData = resData;
        resData = '';
        next();
    });
}

app.get('/', (req, res) => {
    return res.render('detect', {status: 'pending', fname: null});
});

app.post('/upload', upload.single('picture'), (req, res) => {
    if (!req.file) {
        return res.end();
    }
    return res.render('detect', {status: 'ready', fname: req.file.originalname});
});

app.post('/detect', readySend, (req, res) => {
    fs.unlinkSync('./public/request/' + req.body.fname);
    res.write(resultPage(res.resData));
    res.end();
});

app.listen(3000, () => {
    console.log('Server running port 3000');
});