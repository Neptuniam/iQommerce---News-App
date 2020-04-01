<template>
<div class="">
    <!-- Articles use special entities in their content and using v-html allows us to properly display those -->
    <div class="headlineTitle" v-html="title" />

    <hr>

    <p class="headlineContent" v-html="content" />

    <p class="headlineSrc">
        <b>Article By</b>: {{article.source.name}}
        <br>
        <a :href="article.url" target="_blank">Read full article.</a>
        -
        <a @click="saveArticle">Save article.</a>
    </p>
</div>
</template>

<script>
export default {
    props: ['article',],

    computed: {
        title() {
            if (this.article && this.article.title)
                return this.article.title.split(' -')[0]
            return null
        },
        content() {
            if (this.article && this.article.content)
                return this.article.content.split('[+')[0]
            return null
        }
    },
}
</script>

<style scoped>
    .headlineTitle {
        font-weight: 800px;
        font-size: 28px;
    }

    .headlineContent {
        font-weight: 400px;
        font-size: 18px;
    }

    .headlineSrc {
        font-weight: 300px;
        font-size: 14px;
    }

    .headlineSrc a {
        color: blue;
    }
</style>
