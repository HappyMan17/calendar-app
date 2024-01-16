import express from "express";
import { envs } from './config/env.js';
import authRouter from './routes/auth.js';
import { dbConection } from "./database/config.js";

const app  = express();
const PORT = envs.PORT;

// db connection
dbConection();

/**
 * middlewares
 */
// public directory
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname,)));
// body parser
app.use(express.json());

// Rutes
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});

