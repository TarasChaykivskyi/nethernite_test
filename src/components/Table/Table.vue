<template>
  <div class="pt-4">
    <div v-if="CURRENT_PACKAGES.length">
      <table class="table table-bordered">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Type</th>
          <th scope="col">Hits</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in currentPackage" :key="item.hits" @click="SHOW_MODAL(item)">
          <template v-if="pageNumber === 1"><td>{{ index + 1 }}</td></template>
          <template v-else><td>{{ (index + 1) + (perPage * (pageNumber - 1))}}</td></template>
          <td>{{ item.name }}</td>
          <td>{{ item.type }}</td>
          <td>@{{ item.hits }}</td>
        </tr>
        </tbody>
      </table>
      <Pagination :posts="CURRENT_PACKAGES"
                  @current-page="changePage($event)"
      />
    </div>
    <div v-else class="pb-4">
      <h1 class="text-center text-danger">No data!!!</h1>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination/Pagination";
import {mapActions, mapGetters} from 'vuex';

export default {
  name: "Table",
  data() {
    return {
      pageNumber: 1,
      perPage: 10,
    }
  },
  components: {Pagination},
  computed: {
    ...mapGetters(['CURRENT_PACKAGES']),
    currentPackage() {
      let arr = [], start = Number, end = Number;
      if(this.pageNumber === 1) start = 0;
      else start = (this.pageNumber - 1) * this.perPage;
      end = start + this.perPage;
      for(let index in this.CURRENT_PACKAGES) {
        if(index < end && index >= start) {
          arr.push(this.CURRENT_PACKAGES[index]);
        }
      }
      return arr;
    }
  },
  methods: {
    ...mapActions([
      'GET_PACKAGES',
      'SHOW_MODAL'
    ]),
    changePage(current) {
      this.pageNumber = current;
    }
  },
  created() {
    this.GET_PACKAGES();
  }
}
</script>

<style scoped>

</style>
