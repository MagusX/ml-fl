const multer = require('multer');
const { detectorPage } = require('../html');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/request')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});

module.exports = {
    readySend: function(event, command) {
        return function(req, res, next) {
            console.log('sent');
            const fname = req.body.fname;
            const _path = `../public/request/${fname}\n`;
            command.stdin.write(_path);
            res.write(detectorPage());
            event.once('ready', () => {
                return next();
            });
        }
    },
    
    clearReqImgs: function(req, res, next) {
        const dir = path.join('public/request/');
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            fs.unlinkSync(dir + file);
        });
        return next();
    },

    upload: multer({ storage: storage })
}