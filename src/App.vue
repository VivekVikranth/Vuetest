<template>
  <div id="app">
      <search-page></search-page>
      <!-- <AdvancedSearch
        placeholder="Type here..."
        filter-key="name"
        :start-at="2"
      >
      </AdvancedSearch> -->
  </div>
</template>

<script>
import SearchPage from './components/searchPage.vue';
// import AdvancedSearch from './components/advancedSearch.vue';

export default {
  name: 'App',
  components: {
    SearchPage,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
