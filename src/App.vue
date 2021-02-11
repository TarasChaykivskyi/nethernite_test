<template>
  <div id="app">
    <ListPackage/>
    <Footer/>
  </div>
</template>

<script>

import ListPackage from "@/views/ListPackage";
import Footer from "@/components/Common/Footer";

export default {
  components: {Footer, ListPackage}
}

</script>
