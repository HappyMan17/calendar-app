import express from "express";
import { envs } from './config/env.js';

const app  = express();
const PORT = envs.PORT;

// public directory
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname,)));

// rutes
// app.get('/', (req, res) => {
//   res.json({ok: true, message: 'Ok'});
// });

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});

