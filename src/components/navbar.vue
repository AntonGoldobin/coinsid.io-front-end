<template>
  <b-navbar toggleable="md" type="dark"  fixed="top" >
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="#">Coincid</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search" v-model="search"/>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<style>
 nav{
   background-color: #24292d;
 }
</style>

<script>
  export default {
    name: 'navbar',
    data () {
      return {
        search: '',
      }
    },
    watch: {
    search: function () {
      this.$parent.$emit('search', this.search);
    }
    }
  }
    
  
</script>
