<template>
<div id="app">
    <h1 class="nospacing"> <em>News that matters to you</em> </h1>
    <h4 class="nospacing">Search for a topic that interests you</h4>

    <div class="searchRow row fullWidth" uk-sticky>
        <div class="col-xs-8">
            <input type="text" v-model="searchTerm" class="uk-input termInput">
            <select class="uk-select" v-model="sortBy">
                <option value="publishedAt">Publish Date</option>
                <option value="popularity">Popular</option>
            </select>
            <button type="button" class="uk-button uk-button-primary" @click="requestNews(searchTerm, sortBy)">Search</button>

        </div>

        <div class="col-xs end-xs">
            <!-- <ul uk-tab class="end-xs">
                <li>
                    <a class="uk-text-capitalize textTitle tabsTitle noselect" @click="setTab('NewArticles')">
                        New
                    </a>
                </li>

                <li>
                    <a class="uk-text-capitalize textTitle tabsTitle noselect" @click="setTab('SavedArticles')">
                        Saved
                    </a>
                </li>
            </ul> -->
            <!-- <button @click="setTab('NewArticles')" class="uk-button" :class="{'uk-button-secondary': activeTab == 'NewArticles'}">
                New
            </button>
            <button @click="setTab('SavedArticles')" class="uk-button" :class="{'uk-button-secondary': activeTab == 'SavedArticles'}">
                Saved
            </button> -->

            <!-- <b>Viewing</b> -->
            <select class="uk-select" v-model="activeTab">
                <option value="NewArticles">New</option>
                <option value="SavedArticles">Saved</option>
            </select>
        </div>
    </div>

    <div v-if="!activeArticles || !(activeArticles && activeArticles.length)" class="center-xs">
        No Articles Found
    </div>
    <div v-else>
        <div v-for="(article, index) in activeArticles" :key="index" class="ArticleContainer">
            <Article :article="article" />
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
            activeTab: 'NewArticles',

            searchTerm: "Technology",
            sortBy: "publishedAt",
            newsArticles: null,
            savedArticles: null
        }
    },

    computed: {
        activeArticles() {
            return this.activeTab == 'NewArticles' ? this.newsArticles : this.savedArticles
        }
    },

    methods: {
        setTab(tab) {
            this.activeTab = tab
        },

        requestNews(searchTerm, sortBy) {
            // Api Can't handle search terms with whitespace
            searchTerm = searchTerm.trim().replace(/ /g, '')

            let query = `https://newsapi.org/v2/everything?q=${searchTerm}&sortBy=${sortBy}&apiKey=2b056b1596eb4356a56510c4e19da2b7`
            this.axios.get(query).then(response => {
                console.log(response);

                if (response.status == 200)
                    this.newsArticles = response.data.articles
            })
        }
    },

    mounted() {
        let fetchSaved = localStorage.getItem('NewsAppSaved')
        this.savedArticles = fetchSaved ? JSON.parse(fetchSaved) : []

        console.log(this.savedArticles);
    },

    destroyed() {
        // localStorage.setItem('NewsAppSaved', JSON.stringify(this.savedArticles))
        // localStorage.setItem('NewsAppSaved', JSON.stringify({title: "helloWorld"}))
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
