const express = require('express');
const fs = require('fs');
const app = express();
const { EventEmitter } = require('events');
const event = new EventEmitter();
const { resultPage } = require('./html');
const { readySend, clearReqImgs, upload } = require('./middleware/middleware');

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

app.get('/', clearReqImgs, (req, res) => {
    return res.render('detect', {status: 'pending', fname: null});
});

app.post('/upload', clearReqImgs, upload.single('picture'), (req, res) => {
    if (!req.file) {
        return res.end();
    }
    return res.render('detect', {status: 'ready', fname: req.file.originalname});
});

app.post('/detect', readySend(event, command), (req, res) => {
    fs.unlinkSync('./public/request/' + req.body.fname);
    res.write(resultPage(resData));
    resData = '';
    res.end();
});

app.listen(3000, () => {
    console.log('Server running port 3000');
});