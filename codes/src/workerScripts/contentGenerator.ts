// @ts-ignore
import cron from "node-cron";
import {GenerateNewsContentAction} from "../actions/GenerateNewsContentAction";

cron.schedule('* * * * *', () => {
    console.log('Content generation worker is running...');

    (new GenerateNewsContentAction()).execute().then(r => {
        console.log('Content generation worker executed successfully...');
    }).catch((error: any) => {
        console.log('Error Occurred...', error);
    });
});
