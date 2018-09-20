<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Package, Article } from "../model/";
import { IRule, IsNumberRule } from "../rules";


@Component
export default class PackBot extends Vue {

    private static readonly SIZE: number = 10;
    private articlesString: string;
    private packagesList: Package[];
    private packagingResults: string;
    private errorMessage: string;
    private articlesInputRules: IRule[];

    constructor() {
        super();
        this.articlesString = "163841689525773";
        this.packagesList = [];
        this.packagingResults = "En attente...";
        this.errorMessage = "";
        this.articlesInputRules = [];
        this.articlesInputRules.push(new IsNumberRule());
    }

    public onClickRunPackaging() {
        try {
            for (const rule of this.articlesInputRules)
                rule.validate(this.articlesString);
            const articlesList: Article[] = this.parseArticlesString(this.articlesString);
            const packagesList: Package[] = this.runPackaging(articlesList);
            this.packagingResults = this.toStringPackagingResults(packagesList);
        } catch (error) {
            this.errorMessage = "You must enter a number.";
        }
    }

    public onCloseErrorNotification() {
        this.errorMessage = "";
    }

    /**
     * Map an input string to a list of articles
     */
    private parseArticlesString(articlesString: string): Article[] {
        const articlesList: Article[] = [];
        articlesString.split("")
                        .map((n) => parseInt(n, 10))
                        .sort((a, b) => a - b)
                        .map((num) => articlesList.push(new Article(num)));
        return articlesList;
    }

    /**
     * Package a list of articles inside packages
     */
    private runPackaging(articlesStack: Article[]): Package[] {
        const packagesList = [new Package(PackBot.SIZE)];
        while (articlesStack.length) {
            const article: Article = articlesStack.pop() as Article;
            let stacked = false;
            for (const pckg of packagesList) {
                if (this.tryPackage(pckg, article)) {
                    pckg.addArticle(article);
                    stacked = true;
                    break;
                }
            }
            if (!stacked) {
                const newPackage = new Package(PackBot.SIZE);
                newPackage.addArticle(article);
                packagesList.push(newPackage);
            }
        }
        return packagesList;
    }

    /**
     * Transform a list a packages into a formatted string
     */
    private toStringPackagingResults(packagesList: Package[]): string {
        let packagingResults = "";
        packagesList.map((pckg) => packagingResults += pckg.viewPackageContent() + "/").slice(0, -1);
        packagingResults = packagingResults.slice(0, -1);
        return packagingResults;
    }

    /**
     * Check if a package has remaining place to put an article
     */
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
                        <input @keyup.enter="onClickRunPackaging" type="text" class="input is-medium" v-model="articlesString"/>
                        <button @click="onClickRunPackaging" class="button is-medium" title="Run packaging">
                            <i class="fa fa-box"></i>
                        </button>
                    </div>

                    <div class="card has-text-centered is-wide">
                        <div class="card-header-title title is-5 ">
                            <p>Result</p>
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

        <article v-if="errorMessage" class="message is-danger">
            <div class="message-header">
                <p>Error</p>
                <button @click="onCloseErrorNotification" class="delete" aria-label="delete"></button>
            </div>
            <div class="message-body">
                {{errorMessage}}
            </div>
        </article>

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
