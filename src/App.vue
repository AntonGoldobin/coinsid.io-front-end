<template>
  <div id="app">
    <navbar></navbar>
    <b-container-fluid>
      <b-row>
        <b-col cols="6" class="post-scroll">
          <ol class="animated fadeIn">
            <b-row class="mt-3 mb-3">
              <b-col cols="2">
                <h6 class="text-white text-right ">Themes</h6>
              </b-col>
              <b-col cols="3">
                <select class="form-control bg-dark text-white" v-model="newsTheme" id="chooseNewsTheme">
                  <option>business</option>
                  <option>entertainment</option>
                  <option>health</option>
                  <option>science</option>
                  <option>sports</option>
                  <option>technology</option>
                </select>
              </b-col>
            </b-row>
            <div v-for="post in searchPosts" :key="post.id">
              <div class="card bg-dark text-white" v-on:click="selectedPostShow(post)">
                <div class="row align-items-center">
                  <b-col cols="1">
                    <img class="m-3 news-logo" :src="post.urlToImage" alt="Card image cap">
                  </b-col>
                  <b-col cols="11">
                    <p class="p-3 text-left card-text">{{ post.title }}</p>
                  </b-col>
                </div>
              </div>
            </div>
          </ol>
        </b-col>

        <b-col cols="6" class="post-scroll">
          <div class="card bg-dark text-white">
            <div class="card-body">
              <transition
                :duration="200"
                name="component-fade" mode="out-in"
                enter-active-class="animated fadeIn"
                leave-active-class="animated fadeOut">
                 <div v-bind:key="selectedPostId">
                   <!--<div v-if="postCheck">-->
                     <!--<img class="card-img-top" :src="this.posts[0].urlToImage" alt="Card image cap">-->
                     <!--<h1 class="card-title mt-3">{{this.posts[0].title}}</h1>-->
                     <!--<h6 class="card-subtitle mt-3 text-muted">{{this.posts[0].author + " " + this.posts[0].publishedAt}}</h6>-->
                     <!--<p class="card-text mt-3">{{this.posts[0].description}}</p>-->
                     <!--<p class="card-text mt-3">{{this.posts[0].content}}</p>-->
                     <!--<a :href="this.posts[0].url" target="_blank">-->
                       <!--<button type="button"  class="btn btn-outline-light mt-3 mb-5">Details </button>-->
                     <!--</a>-->
                   <!--</div>-->
                   <!--<div v-else>-->
                     <!--<img class="card-img-top" :src="selectedPostImg" alt="Card image cap">-->
                     <!--<h1 class="card-title mt-3">{{selectedPostTitle}}</h1>-->
                     <!--<h6 class="card-subtitle mt-3 text-muted">{{selectedPostAuthor + " " + selectedPostPublishedAt}}</h6>-->
                     <!--<p class="card-text mt-3">{{selectedPostDescr}}</p>-->
                     <!--<p class="card-text mt-3">{{selectedPostContent}}</p>-->
                     <!--<a :href="selectedPostLink" target="_blank">-->
                       <!--<button type="button"  class="btn btn-outline-light mt-3 mb-5">Details </button>-->
                     <!--</a>-->
                   <!--</div>-->
                 </div>
              </transition>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container-fluid>
  </div>
</template>

<script>
  export default {
  name: 'app',
  data () {
    return {
      selectedPostTitle: '',
      selectedPostDescr: '',
      selectedPostId: null,
      selectedPostContent: '',
      selectedPostPublishedAt: '',
      selectedPostAuthor: '',
      selectedPostLink: '',
      selectedPostImg: '',
      posts: [],
      search: '',
      newsTheme: '',
    }
  },
  methods: {
    selectedPostShow: function (post) {

      // this.selectedPostImg = post.urlToImage;
      // this.selectedPostDescr = post.description;
      // this.selectedPostTitle = post.title;
      // this.selectedPostContent = post.content;
      // this.selectedPostPublishedAt = post.publishedAt;
      // this.selectedPostAuthor = post.author;
      // this.selectedPostLink = post.url;
      // this.selectedPostId = post.id;
    },
    testVar: function () {
      console.log(this.selectedPostLink)
    }
  },
  computed:{
    searchPosts: function (post) {
      return this.posts.filter((post) => {
        return post.title.toLowerCase().match(this.search.toLowerCase())
      })
    },
    postCheck: function(){
      return this.selectedPostTitle === '';
    }
  },
   created(){
    this.$http.get('https://coinsidio.herokuapp.com/articles').then(responce => {
      this.posts = responce.data.articles;
      console.log(this.posts);
      return this.posts
    })
      .catch(error => {
        console.log(error)
      });
   },
    mounted: function(){
      this.$on( 'search', function(search) {
        this.search = search;
    })
    },
    watch: {
      newsTheme: function(){
        this.$http.get('https://newsapi.org/v2/top-headlines?country=us&category=' + this.newsTheme + '&apiKey=a93efd4a6b494094923df48865c7bba3').then(responce => {
          this.posts = responce.data.articles;
          console.log(this.showNews);
          return this.posts
        })
          .catch(error => {
            console.log(error)
          });
      }
    }
}
</script>

<style lang="sass">
  @import 'stylesheets/main.sass'

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px

h1, h2
  font-weight: normal

ul
  list-style-type: none
  padding: 0

li
  display: inline-block
  margin: 0 10px

a
  color: #42b983

.news-logo
  height: 30px
  width: 30px

.card:hover
  background: #24292d !important

.post-scroll
  height: 95vh
  overflow-y: scroll
</style>
