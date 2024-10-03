import express from 'express';
import {GetNewsController} from './controllers/GetNewsController';

const app = express();

app.get('/api/v1/news', (req: any, res: any) => (new GetNewsController()).execute(req, res));

const port = process.env.APP_PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
