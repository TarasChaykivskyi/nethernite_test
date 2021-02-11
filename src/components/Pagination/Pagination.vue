<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{disabled: pageNumber === 1}" @click="prevPage">
        <a class="page-link" href="#">&lt;</a>
      </li>
      <li class="page-item" v-if="hasFirst()" @click="changePageNumber(1)">
        <a class="page-link" href="#">1</a>
      </li>
      <li class="page-item" v-if="hasFirst()"><a class="page-link" href="#" @click.prevent>...</a></li>
      <li class="page-item"
          v-for="item in currentPages"
          :key="item"
          @click="changePageNumber(item)"
          :class="{active: pageNumber == item}">
        <a class="page-link" href="#">{{ item }}</a>
      </li>
      <li class="page-item" v-if="hasLast()"><a class="page-link" href="#" @click.prevent>...</a></li>
      <li class="page-item" :class="{disabled: pageNumber === totalPages}">
        <a class="page-link" href="#" @click="nextPage">&gt;</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    posts: {
      type: Array,
      default() {
        return []
      }
    },
    perPage: {
      type: Number,
      default: 10
    },
    pageRange: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      pageNumber: 1
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.posts.length / this.perPage)
    },
    currentPages() {
      let pages = [];
      let start = this.pageNumber - this.pageRange;
      start = (start > 0) ? start : 1;
      let end = this.pageNumber + this.pageRange
      end = (end < this.totalPages) ? end : this.totalPages
      for(let i = start; i <= end; i++) {
        pages.push(i)
      }
      return pages
    }
  },
  methods: {
    changePageNumber(number) {
      this.pageNumber = number;
      this.$emit('current-page', number)
    },
    prevPage() {
      if(this.pageNumber <= 1) this.changePageNumber(1);
      else this.changePageNumber(--this.pageNumber);
    },
    nextPage() {
      if(this.pageNumber >= this.totalPages) this.changePageNumber(this.totalPages);
      else this.changePageNumber(++this.pageNumber);
    },
    hasFirst: function() {
      let start = this.pageNumber - this.pageRange;
      start = (start > 0) ? start : 1;
      return start !== 1
    },
    hasLast: function() {
      let end = this.pageNumber + this.pageRange
      end = (end < this.totalPages) ? end : this.totalPages
      return end < this.totalPages
    }
  }
}
</script>

<style scoped>
</style>
