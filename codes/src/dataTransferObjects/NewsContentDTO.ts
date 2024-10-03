export class NewsContentDTO {
    title: string;
    description: string;
    publish_date: Date;
    topics: string[];
    source: string;
    link: string;

    constructor(title: string, description: string, pubDate: Date, topics: string[], source: string, link: string) {
        this.title = title;
        this.description = description;
        this.publish_date = pubDate;
        this.topics = topics;
        this.source = source;
        this.link = link;
    }
}
