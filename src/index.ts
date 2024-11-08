import express from 'express';
import cors from 'cors';
import { patientsRouter } from './routes/patients';
import { diagnosesRouter } from './routes/diagnoses';

const PORT = 3001;
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/patients', patientsRouter);
app.use('/api/diagnoses', diagnosesRouter);
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
