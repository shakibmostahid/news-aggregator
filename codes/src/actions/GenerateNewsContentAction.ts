import RSSParser from 'rss-parser';
import {NewsContentDTO} from '../dataTransferObjects/NewsContentDTO';
import fs from 'fs';
import {TopicExtractAction} from "./TopicExtractAction";

export class GenerateNewsContentAction {
    private parser: RSSParser;
    private topicExtractAction: TopicExtractAction;

    constructor() {
        this.parser = new RSSParser();
        this.topicExtractAction = new TopicExtractAction();
    }

    public execute = async () => {
        try {
            const feedUrls = process.env.RSS_FEED_URLS?.split(',') || [];

            if (feedUrls.length === 0) {
                throw new Error('No URL found.');
            }

            const contents: NewsContentDTO[] = [];

            for (const feedUrl of feedUrls) {
                const items = await this.getFeedItems(feedUrl);

                if (items.length < 1) {
                    continue;
                }

                for (const item of items) {
                    const description = item.contentSnippet || item.description || '';
                    const topics = await this.topicExtractAction.execute(description);

                    contents.push({
                        topics: topics,
                        title: item.title || '',
                        description: description,
                        link: item.link || '',
                        publish_date: new Date(item.pubDate || ''),
                        source: feedUrl
                    });
                }
            }

            await this.saveContents(contents);
        } catch (error: any) {
            console.error('Error while fetching RSS feed:', error?.message || error);
        }
    }

    private getFeedItems = async (feedUrl: string) => {
        try {
            const feed = await this.parser.parseURL(feedUrl);

            return feed.items;
        } catch (error: any) {
            console.error(`Error while fetching RSS feed from ${feedUrl}: `, error?.message || error);

            return [];
        }

    }

    private saveContents = async (contents: NewsContentDTO[]) => {
        const filePath = '/usr/src/app/src/storage/news.json';

        fs.writeFileSync(filePath, JSON.stringify(contents), {encoding: 'utf8', mode: 0o644});
    };
}
