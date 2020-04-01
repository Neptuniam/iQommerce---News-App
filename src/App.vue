<template>
<div id="app">
    <h1 class="nospacing"> <em>News that matters to you</em> </h1>
    <h4 class="nospacing">Search for a topic that interests you</h4>

    <div class="searchRow" uk-sticky>
        <input type="text" v-model="searchTerm" class="uk-input termInput">
        <select class="uk-select" v-model="sortBy">
            <option value="publishedAt">Publish Date</option>
            <option value="popularity">Popular</option>
        </select>
        <button type="button" class="uk-button uk-button-primary" @click="requestNews(searchTerm, sortBy)">Search</button>

        <!-- <button v-if="newsArticles" type="button" class="uk-button uk-button-secondary">Save this Term</button> -->
    </div>


    <div v-if="newsArticles">
        <h3>Headlines:</h3>

        <div v-if="newsArticles.totalResults == 0 || !(newsArticles.articles && newsArticles.articles.length)">
            No Articles Found
        </div>
        <div v-else>
            <div v-for="(article, index) in newsArticles.articles" :key="index" class="ArticleContainer">
                <Article :article="article" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Article from './components/Article.vue'

export default {
    name: 'App',
    components: {
        Article
    },

    data() {
        return {
            searchTerm: "Technology",
            sortBy: "publishedAt",
            newsArticles: null
        }
    },

    methods: {
        requestNews(searchTerm, sortBy) {
            // Api Can't handle search terms with whitespace
            searchTerm = searchTerm.trim().replace(/ /g, '')

            let query = `https://newsapi.org/v2/everything?q=${searchTerm}&sortBy=${sortBy}&apiKey=2b056b1596eb4356a56510c4e19da2b7`
            this.axios.get(query).then(response => {
                console.log(response);

                if (response.status == 200)
                    this.newsArticles = response.data
            })
        }
    },
}
</script>

<style scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #2c3e50;
    /* margin-top: 60px; */
    padding: 100px 200px;
}

    h1, em {
        color: black !important;
    }
    h4 {
        color: grey;
    }

    .searchRow {
        margin-top: 20px;
    }
    .searchRow input {
        width: 300px;
    }
    .searchRow select {
        width: 150px;
    }

    .ArticleContainer {
        margin: 100px 0;
    }


</style>
