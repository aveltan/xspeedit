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
        this.packagingResults = "En attente...";
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

        <section class="hero is-dark">
            <div class="hero-body">
                <h1 class="title is-1">PackBot</h1>
                <h2 class="subtitle">the packaging robot</h2>
            </div>
        </section>

        <section class="container">
            <div class="columns">

                <div class="column is-one-fifth">
                    <!-- margin -->
                </div>

                <div class="column is-three-fifths is-warning">
                    
                    <div class="field is-horizontal">
                        <input type="text" class="input is-medium" v-model="articlesString"/>
                        <button @click="onClickRunPackaging" class="button is-medium">
                            <i class="fa fa-box"></i>
                        </button>
                    </div>

                    <div class="card has-text-centered is-wide">
                        <div class="card-header-title title is-5 ">
                            <p>Resultat</p>
                        </div>
                        <div class="card-content">
                            <div class="content is-medium">
                                <p>{{packagingResults}}</p>
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div class="column is-one-fifth">
                    <!-- margin -->
                </div>

            </div>
        </section>

    </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #packbot {
        text-align: center;
    }

    .field {
        margin: 80px 0px 80px 0px;
    }

    .card {
        width: 70%;
        margin-left: auto;
        margin-right: auto;
    }

</style>
