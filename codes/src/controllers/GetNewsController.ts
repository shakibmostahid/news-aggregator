import {Request, Response} from 'express';
import {GetNewsService} from "../services/GetNewsService";

export class GetNewsController {
    private service: GetNewsService;

    constructor() {
        this.service = new GetNewsService();
    }

    public execute = (req: Request, res: Response) => {
        const {topic, start_date, end_date} = req.query;

        try {
            const contents = this.service.handle(topic as string, start_date as string, end_date as string);

            res.json({
                message: "News data found.",
                data: contents,
            });
        } catch (error: any) {
            console.log(error);

            res.status(500).json({
                error: {
                    message: "error occurred",
                    description: error?.message || 'Unknown error occurred'
                }
            });
        }
    }
}