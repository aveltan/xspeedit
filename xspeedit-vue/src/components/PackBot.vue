<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Package, Article } from "../model/";


@Component
export default class PackBot extends Vue {
    private static readonly SIZE: number = 10;
    private articlesString: string;
    private packagesList: Package[];
    private packagingResults: string;

    constructor() {
        super();
        this.articlesString = "163841689525773";
        this.packagesList = [];
        this.packagingResults = "";
    }

    public onClickRunPackaging() {
        this.runPackaging();
        this.viewPackagingResults();
    }

    private parseArticlesString(): Article[] {
        const articlesList: Article[] = [];
        this.articlesString.split("")
                        .map((n) => parseInt(n, 10))
                        .sort((a, b) => a - b)
                        .map((num) => articlesList.push(new Article(num)));
        return articlesList;
    }

    private runPackaging() {
        this.packagesList = [new Package(PackBot.SIZE)];
        const articlesList = this.parseArticlesString();
        while (articlesList.length) {
            const article: Article = articlesList.pop() as Article;
            let stacked = false;
            for (const pckg of this.packagesList) {
                if (this.tryPackage(pckg, article)) {
                    pckg.addArticle(article);
                    stacked = true;
                    break;
                }
            }
            if (!stacked) {
                const newPackage = new Package(PackBot.SIZE);
                newPackage.addArticle(article);
                this.packagesList.push(newPackage);
            }
        }
    }

    private viewPackagingResults() {
        this.packagingResults = "";
        this.packagesList.map((pckg) => this.packagingResults += pckg.viewPackageContent() + "/").slice(0, -1);
        this.packagingResults = this.packagingResults.slice(0, -1);
    }

    private tryPackage(pckg: Package, article: Article): boolean {
        return pckg.remainingPlace >= article.size ? true : false;
    }

}
</script>

<template>
    <div id="packbot">
        <h1>PackBot</h1>
        <h2>the packaging robot</h2>

        <input type="text" v-model="articlesString"/>
        <button @click="onClickRunPackaging">Run packaging</button>

        <h3>Result</h3>
        <p>{{packagingResults}}</p>
    </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
