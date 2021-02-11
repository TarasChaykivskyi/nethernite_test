<template>
  <div class="wrapper container">
    <Search/>
    <Table/>
    <Modal v-if="IS_MODAL"/>
  </div>
</template>

<script>
import Table from "@/components/Table/Table";
import Modal from "@/components/Modal/Modal";
import {mapGetters} from 'vuex'
import Search from "@/components/Search/Search";

export default {
  name: "ListPackage",
  components: {Search, Modal, Table},
  computed: {
    ...mapGetters(['IS_MODAL'])
  }
}
</script>

<style scoped>

</style>
