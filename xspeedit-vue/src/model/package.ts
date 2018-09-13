import { Article } from "./article";

export class Package {
    public articles: Article[];
    public remainingPlace: number;

    constructor(remainingPlace: number) {
        this.articles = [];
        this.remainingPlace = remainingPlace;
    }

    public addArticle(article: Article) {
        this.articles.push(article);
        this.remainingPlace -= article.size;
    }

    public viewPackageContent(): string {
        let str = "";
        this.articles.map((article) => str += article.size);
        return str;
    }
}
