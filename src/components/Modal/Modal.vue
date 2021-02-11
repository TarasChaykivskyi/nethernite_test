<template>
  <div class="modal fade show" @click.self="HIDE_MODAL">
    <div class="modal-dialog modal-dialog-size">
      <div class="modal-content modal-content-scroll">
        <div class="modal-header">
          <h5 class="modal-title">Detail Information</h5>
          <button type="button" class="btn btn-primary btn-close-modal" @click="HIDE_MODAL">
            <i class="bi bi-x"></i>
          </button>
        </div>
        <div class="modal-body" v-if="SELECTED_PACKAGE">
          <div class="d-flex align-items-center">
            <h3 class="pr-5">{{ SELECTED_PACKAGE.name }}</h3>
            <span>Version {{ SELECTED_PACKAGE.tag }}</span>
          </div>
          <div class="pt-3">
            <h4 class="text-center">Files</h4>
            <table class="table table-sm">
              <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th scope="col">Size</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(file, index) in SELECTED_PACKAGE.files" :key="index">
                <td>{{ file.name }}</td>
                <td>{{ file.type }}</td>
                <td>{{ file.size }}</td>
              </tr>
              </tbody>
            </table>
            <div class="pt-3">
              <h4 class="text-center">Last Versions</h4>
              <table class="table table-sm">
                <thead>
                <tr>
                  <th scope="col">Version</th>
                  <th scope="col">Total</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(version, index) in SELECTED_PACKAGE.version" :key="index">
                  <td>{{ version.current }}</td>
                  <td>{{ version.total }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div v-else>
          <h3 class="text-center py-3">Loading...</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  name: "Modal",
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters(['SELECTED_PACKAGE'])
  },
  methods: {
    ...mapActions(['HIDE_MODAL'])
  }
}
</script>
