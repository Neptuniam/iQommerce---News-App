<template>
<div class="Article">
    <!-- Articles use special entities in their content and using v-html allows us to properly display those -->
    <div class="articleTitle" v-html="title" />

    <hr>

    <p class="articleContent limitReadable" v-html="content" />

    <p class="articleSrc">
        <b>Source</b>: {{article.source.name}} ({{prettyDate(article.publishedAt)}})
    </p>

    <p class="articleLinks">
        <a :href="article.url" target="_blank">Read full article.</a>
        -
        <a v-if="isSaved(article)" @click="unsaveArticle(article)">Unsave article.</a>
        <a v-else @click="saveArticle(article)">Save article.</a>
    </p>
</div>
</template>

<script>
export default {
    props: ['article',],

    computed: {
        title() {
            // Some articles include the source in the title
            // Since we already include the source at the bottom we don't need it twice
            if (this.article && this.article.title)
                return this.article.title.split(' -')[0]
            return null
        },
        content() {
            // Longer articles will show how many charcters are missing from api (don't care for it)
            if (this.article && this.article.content)
                return this.article.content.split('[+')[0]
            return null
        }
    },

    methods: {
        isSaved(article) {
            // Ensure we have a saved list to searh first
            if (!(this.$parent.savedArticles && this.$parent.savedArticles.length))
                return false

            // Return if the index could be found or not
            return this.$parent.savedArticles.findIndex(saved => saved.title == article.title) != -1
        },
        prettyDate(publishedAt) {
            let date = new Date(publishedAt)

            if (date) {
                let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
                let year  = date.getFullYear()
                let month = date.getMonth()
                let day   = date.getDate()

                if (year && month != undefined && day != undefined)
                    return `${months[month]} ${day}, ${year}`
            }
        },

        saveArticle(article) {
            // add the article to the front of the list
            this.$parent.savedArticles.unshift(article)

            // Save the new list to localStorage
            this.backupSaved()
        },
        unsaveArticle(article) {
            // Remove the article from the saved list by index
            let index = this.$parent.savedArticles.findIndex(saved => saved.title == article.title)
            this.$parent.savedArticles.splice(index, 1)

            // Save the new list to localStorage
            this.backupSaved()
        },

        backupSaved() {
            localStorage.setItem('NewsAppSaved', JSON.stringify(this.$parent.savedArticles))
        }
    },
}
</script>

<style scoped>
    .Article {
        color: rgb(20, 20, 20);
    }

    .articleTitle {
        font-weight: 500;
        font-size: 28px;
    }

    .articleContent {
        font-weight: 400;
        font-size: 18px;
    }

    .articleSrc, .articleLinks {
        font-weight: 300;
        font-size: 14px;
    }

    .articleLinks a {
        color: blue;
    }
    b {
        font-weight: bold !important;
    }
</style>
