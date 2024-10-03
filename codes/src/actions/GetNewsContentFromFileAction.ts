import fs from 'fs';
import {NewsContentDTO} from "../dataTransferObjects/NewsContentDTO";

export class GetNewsContentFromFileAction {
    public execute = (): NewsContentDTO[] => {
        try {
            const data = fs.readFileSync('/usr/src/app/src/storage/news.json', 'utf8');

            return JSON.parse(data) as NewsContentDTO[];
        } catch (error) {
            console.error("Error reading the JSON file", error);

            return [];
        }
    }
}
