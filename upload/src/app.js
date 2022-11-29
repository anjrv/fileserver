import express from 'express';
import fileUpload from 'express-fileupload';
/* import bodyParser from 'body-parser'; */
import path from 'path';
import { fileURLToPath } from 'url';

const { PORT: port = 3002 } = process.env;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});
/* app.use(bodyParser.json()); */
/* app.use(bodyParser.urlencoded({ extended: true })); */
app.use('/css', express.static(path.join(__dirname, '../css')));

app.post(
  '/upload',
  fileUpload({ createParentPath: true }),
  (req, res) => {
    try {
      if (!req.files) {
        res.send({
          status: false,
          message: 'No file uploaded',
        });
      } else {
        let file = req.files.file;
        file.mv('../shared/' + file.name);
        res.send({
          status: true,
          message: 'File is uploaded',
          data: {
            name: file.name,
            mimetype: file.mimetype,
            size: file.size,
          },
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);

app.get('/*', (_req, res) => {
  const indexPath = path.resolve(__dirname + '/../index.html');
  res.sendFile(indexPath);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
