import {NewsContentDTO} from '../dataTransferObjects/NewsContentDTO';
import {GetNewsContentFromFileAction} from "../actions/GetNewsContentFromFileAction";

export class GetNewsService {
    private action: GetNewsContentFromFileAction;

    constructor() {
        this.action = new GetNewsContentFromFileAction();
    }

    public handle = (topic?: string, startDate?: string, endDate?: string): NewsContentDTO[] => {
        let contents: NewsContentDTO[] = [];

        this.action.execute().forEach((content: NewsContentDTO) => {
            const publishDate = new Date(content.publish_date);
            publishDate.setHours(0, 0, 0, 0);

            if (topic && !content.topics.join(' ').toLowerCase().includes(topic.toLowerCase())) {
                return;
            }

            if (startDate && publishDate < new Date(startDate)) {
                return;
            }

            if (endDate && publishDate > new Date(endDate)) {
                return;
            }

            contents.push(content);
        });

        return contents;
    }
}