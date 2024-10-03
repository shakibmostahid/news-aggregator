// @ts-ignore
import natural from 'natural';

export class TopicExtractAction {
    private tokenizer: natural.WordTokenizer;

    constructor() {
        this.tokenizer = new natural.WordTokenizer();
    }

    public execute = async (text: string): Promise<string[]> => {
        const tokenizedWords = this.tokenizer.tokenize(text);
        const wordFrequency: Record<string, number> = {};

        tokenizedWords.forEach((word: string) => {
            const lowerCasedWord = word.toLowerCase();
            if (!wordFrequency[lowerCasedWord]) {
                wordFrequency[lowerCasedWord] = 0;
            }

            wordFrequency[lowerCasedWord]++;
        });

        const sortedWords = Object.keys(wordFrequency).sort((a, b) => wordFrequency[b] - wordFrequency[a]);

        return sortedWords.slice(0, 5);
    }
}
