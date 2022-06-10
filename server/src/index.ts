// Importing the packages
import express, { Application } from 'express';

const app: Application = express();

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Expresswer is listening at http://localhost:${PORT}`));
