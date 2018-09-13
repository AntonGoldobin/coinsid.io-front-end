<template>
  <div id="app">
    <navbar></navbar>
    <b-container-fluid>
      <b-row>
        <b-col cols="6" class="post-scroll">
          <ol class="animated fadeIn">
            <input class="bg-dark text-white" type="text" v-model="search"/>
            <div v-for="post in posts">
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
                   <img class="card-img-top" :src="selectedPostImg" alt="Card image cap">
                    <h1 class="card-title">{{selectedPostTitle}}</h1>
                   <h6 class="card-subtitle mb-2 text-muted">{{selectedPostAuthor + " " + selectedPostPublishedAt}}</h6>
                    <p class="card-text">{{selectedPostDescr}}</p>
                   <p class="card-text">{{selectedPostContent}}</p>
                   <a :href="selectedPostLink" target="_blank">
                    <button type="button"  class="btn btn-outline-light">Details</button>
                   </a>
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
      search: ''
    }
  },
  methods: {
    selectedPostShow: function (post) {

      this.selectedPostImg = post.urlToImage;
      this.selectedPostDescr = post.description;
      this.selectedPostTitle = post.title;
      this.selectedPostContent = post.content;
      this.selectedPostPublishedAt = post.publishedAt;
      this.selectedPostAuthor = post.author;
      this.selectedPostLink = post.url;
      this.selectedPostId = post.id;
    },
    testVar: function () {
      console.log(this.selectedPostLink)
    }
  },
  computed:{
    // searchPosts: function () {
    //   return this.posts.filter((post) => {
    //     return post.title.toLowerCase().match(this.search.toLowerCase())
    //   })
    // }
  },
   created(){
    this.$http.get('https://newsapi.org/v2/top-headlines?q=bitcoin&from=2018-08-13&sortBy=publishedAt&apiKey=a93efd4a6b494094923df48865c7bba3').then(responce => {
      this.posts = responce.data.articles;
      console.log(this.posts);
      return this.posts
    })
      .catch(error => {
        console.log(error)
      });
   }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.news-logo{
  height: 30px;
  width: 30px;
}
.card:hover{
  background: #24292d !important;
}
.post-scroll{
  height: 100vh;
  overflow-y: scroll;
}

</style>
