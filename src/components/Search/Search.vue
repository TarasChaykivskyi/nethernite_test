<template>
  <div class="row p-3 text-center">
    <div class="col-lg-6 col-md-8 col-sm-12 col-12 m-auto d-flex">
      <input class="form-control"
             type="search"
             placeholder="Enter name package"
             v-model="searchValue"
             @input="SEARCH_VALUES($event.target.value)"
      >
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: "Search",
  data() {
    return {
      searchValue: ''
    }
  },
  methods: {
    ...mapActions(['SEARCH_VALUES']),
    findPackage() {
      console.log(this.searchValue)
    }
  }
}
</script>

<style scoped>

</style>
