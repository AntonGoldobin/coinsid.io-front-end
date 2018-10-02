<template>
  <div id="app">
    <b-container-fluid>
      <b-row>
        <b-col cols="6" class="pr-0" >
          <b-row>
            <b-col cols="12">
              <div v-bind:class="{ themeHeightLong:!scrollUp, themeHeightShort:scrollUp }">
                <b-carousel id="carousel"
                            controls
                            indicators
                            :interval="0"
                            @sliding-start="onSlideStart"
                            v-model="slide"
                            :class="['news-theme-card-' + slide]"
                   >
                  <!-- Text slides with image -->
                  <b-carousel-slide>
                    <h1>Entertainment</h1>
                  </b-carousel-slide>
                  <b-carousel-slide>
                    <h1>Health</h1>
                  </b-carousel-slide>
                  <b-carousel-slide>
                    <h1>Science</h1>
                  </b-carousel-slide>
                  <b-carousel-slide>
                    <h1>Bitcoin</h1>
                  </b-carousel-slide>
                </b-carousel>
              </div>
            </b-col>
          </b-row>
          <div class="post-scroll" v-on:scroll="handleScroll">
            <div v-for="post in searchPosts"
                 class="animated"
                 v-bind:class="[newsAnimation]"
                 :key="post.id">
              <div class="card news-row" v-on:click="selectedPostShow(post)">
                <div class="row align-items-center">
                  <b-col cols="1">
                    <img class="m-3 news-logo" :src="post.iconURL">
                  </b-col>
                  <b-col cols="9">
                    <p class="p-3 text-left card-text">{{ post.title }}</p>
                  </b-col>
                  <b-col cols="2">
                    <div class="news-date-from">
                      4 hours ago
                    </div>
                  </b-col>
                </div>
              </div>
            </div>
          </div>
        </b-col>

        <b-col cols="6" class="post-scroll-card">
          <div class="card">
            <div class="card-body" v-bind:key="selectedPostId">
              <transition
                :duration="200"
                name="component-fade" mode="out-in"
                enter-active-class="animated fadeIn"
                leave-active-class="animated fadeOut">
                   <div v-if="postCheck">
                     <div class="news-title-bg">
                       <img class="card-img-top img-blur" :src="posts[0].urlToImage" alt="Card image cap" align="center|middle">
                       <h1 class="card-title">{{this.posts[0].title}}</h1>
                     </div>
                     <div class="news-description pt-3">
                       <h6 class="card-subtitle pt-3 text-muted">{{this.posts[0].author + "   " + this.posts[0].publishedAt}}</h6>
                       <p class="card-text mt-3">{{this.posts[0].description}}</p>
                       <a :href="this.posts[0].url" target="_blank">
                         <button type="button"  class="btn news-btn mt-3 mb-5">Details </button>
                       </a>
                     </div>
                   </div>
                   <div v-else>
                     <div class="news-title-bg">
                       <img class="card-img-top img-blur" :src="selectedPostImg" alt="Card image cap" align="center|middle">
                       <h1 class="card-title">{{selectedPostTitle}}</h1>
                     </div>
                     <div class="news-description pt-3">
                       <h6 class="card-subtitle pt-3 text-muted">{{selectedPostAuthor + " " + selectedPostPublishedAt}}</h6>
                       <p class="card-text mt-3">{{selectedPostDescr}}</p>
                       <a :href="selectedPostLink" target="_blank">
                         <button type="button"  class="btn news-btn mt-3 mb-5">Details </button>
                       </a>
                     </div>
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
      slide: 0,
      sliding: null,
      selectedPostTitle: '',
      selectedPostDescr: '',
      selectedPostId: null,
      selectedPostPublishedAt: '',
      selectedPostAuthor: '',
      selectedPostLink: '',
      selectedPostImg: 'https://avatars2.githubusercontent.com/u/29868103?s=460&v=4',
      posts: [],
      search: '',
      newsTheme: '',
      scrollUp: false,
      newsAnimation: ''
    }
  },
  methods: {
    //для резинового меню тем новостей
    handleScroll: function(e) {
      var currentScrollPosition = e.srcElement.scrollTop;
      if (currentScrollPosition > this.scrollPosition) {
        this.scrollUp = true
      }
      else{
        if(this.scrollPosition <= 40){
          this.scrollUp = false
        }
      }
      this.scrollPosition = currentScrollPosition;
    },
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
    },
    onSlideStart () {
      this.newsAnimation = 'fadeOut';
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
     window.addEventListener('scroll', this.handleScroll);
     this.$http.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=a93efd4a6b494094923df48865c7bba3').then(responce => {
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
      slide: function() {
        if (this.slide === 0) {
          this.newsTheme = 'entertainment'
        }
        else if (this.slide === 1) {
          this.newsTheme = 'health'
        }
        else if (this.slide === 2) {
          this.newsTheme = 'science'
        }
        else {
          this.newsTheme = 'bitcoin'
        }
      },
      newsTheme: function() {
        setTimeout(() => {
          this.posts = [];
          this.newsAnimation = 'fadeIn';
          if (this.slide === 3) {
            this.$http.get('https://coinsidio.herokuapp.com/articles').then(responce => {
                 this.posts = responce.data;
                 console.log(this.posts);
                 return this.posts
               })
                 .catch(error => {
                   console.log(error)
                 });
          }
          else {
            this.$http.get('https://newsapi.org/v2/top-headlines?country=us&category=' + this.newsTheme + '&apiKey=a93efd4a6b494094923df48865c7bba3').then(responce => {
              this.posts = responce.data.articles;
              return this.posts
            })
              .catch(error => {
                console.log(error)
              });
          }
        }, 200)
      }
    },
    destroyed: function () {
      window.removeEventListener('scroll', this.handleScroll);
    }
}
</script>

<style lang="scss">
  @import '/styles/main';
</style>
