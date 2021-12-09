export class DiaryEntry {
    id?: string;
    title: string;
    date: number;
    emoji: string;
    content: string;

    constructor(id?: string, title?: string, date?: number, emoji?: string, content?: string) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.emoji = emoji;
        this.content = content;
    }
}
