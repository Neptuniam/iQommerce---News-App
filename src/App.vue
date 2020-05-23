<template>
<div id="app" class="row nomargin around-xs">
    <div class="col-xs-10 ">
        <span v-if="loading" class="spinner" uk-spinner='ratio:1'></span>

        <h1 class="nospacing"> <em>News that matters to you</em> </h1>
        <h4 class="nospacing">Search for a topic that interests you</h4>

        <div class="searchRow row" uk-sticky>
            <div class="col-xs-12 col-sm-10">
                <br>
                <input  type="text" v-model="searchTerm" class="uk-input termInput" autofocus
                        placeholder="Enter a search term" v-on:keyup.enter="requestNews(searchTerm, sortBy)">

                <select class="uk-select" v-model="sortBy">
                    <option value="publishedAt">Publish Date</option>
                    <option value="popularity">Popular</option>
                </select>

                <button type="button" class="uk-button uk-button-primary" @click="requestNews(searchTerm, sortBy)">Search</button>
            </div>

            <div class="col-xs-12 col-sm" >
                <b>Viewing</b>
                <select class="uk-select" v-model="activeTab">
                    <option value="NewArticles">New Articles</option>
                    <option value="SavedArticles">Saved Articles</option>
                </select>
            </div>
        </div>

        <div v-if="!activeArticles" class="center-xs noArticles">
            <!-- Wait till the user has at least searched to display error messages -->
            Try searching for "{{suggested}}"
        </div>
        <div v-else-if="!(activeArticles && activeArticles.length)" class="center-xs noArticles uk-text-danger">
            No Articles Found! <br> :(
        </div>
        <div v-else>
            <div v-for="(article, index) in activeArticles" :key="index" class="ArticleContainer">
                <Article :article="article" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Article from './components/Article.vue'

export default {
    components: {
        Article
    },

    data() {
        return {
            activeTab: 'NewArticles',

            searchTerm: null,
            sortBy: "publishedAt",
            newsArticles: null,
            savedArticles: null,

            suggested: null,
            loading: false
        }
    },

    computed: {
        activeArticles() {
            return this.activeTab == 'NewArticles' ? this.newsArticles : this.savedArticles
        }
    },

    methods: {
        randomTerm() {
            // Randomly Select a recommended search term
            let terms = ["Technology", "Music", "JavaScript", "Health", "Sports", "Movies", "Nintendo"]

            return terms[Math.floor(Math.random() * terms.length)];
        },

        setTab(tab) {
            this.activeTab = tab
        },

        requestNews(searchTerm, sortBy) {
            // Basically the only requirement is you entered SOMETHING
            if (searchTerm == null) {
                window.UIkit.notification({
                    message: 'Make sure you enter a search term!',
                    status: 'danger'
                });

                return
            }

            // Force the user to the new page when they search for something
            this.activeTab = 'NewArticles'

            // Api Can't handle search terms with whitespace
            searchTerm = searchTerm.trim().replace(/ /g, '')

            // Display the spinner to show the user the request is in progress
            this.loading = true

            let query = `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?q=${searchTerm}&sortBy=${sortBy}?country=ca&apiKey=2b056b1596eb4356a56510c4e19da2b7`
            this.axios.get(query).then(response => {
                console.log(response);

                if (response.status == 200)
                    this.newsArticles = response.data.articles

                // Done loading
                this.loading = false
            })
        }
    },

    mounted() {
        this.suggested = this.randomTerm()

        // Use localStorage to allow users to save articles for later
        let fetchSaved = localStorage.getItem('NewsAppSaved')
        this.savedArticles = fetchSaved ? JSON.parse(fetchSaved) : []
    },
}
</script>

<style scoped>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: rgb(250, 250, 250);

        color: #2c3e50;
        padding: 25px 0px 50px;
        min-height: 100vh;
    }

    .spinner {
        position: fixed;
        top: 10px;
        left: 10px;
    }

    h1, em {
        color: black !important;
    }
    h4 {
        color: grey;
    }

    .searchRow {
        /* margin-top: 10px; */
        padding: 5px 0px;

        background-color: rgb(250, 250, 250);
    }
    .searchRow input {
        width: 300px;
    }
    .searchRow select {
        width: 150px;
    }

    .noArticles {
        margin: 150px 0px 0px 0px;

        font-size: 30px;
    }

    .ArticleContainer {
        margin: 100px 0;
    }

    .col-sm {
        max-width: 150px !important;
    }
    .searchRow b {
        font-size: 14px;
    }
</style>
