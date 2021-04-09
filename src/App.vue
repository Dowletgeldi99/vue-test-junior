<template>
  <div class="header ">
    <Header />
  </div>
  <div class="main">
    <router-view />
  </div>
  <div class="footer">
    <Footer />
  </div>
</template>

<script>
  import Form from './components/Form.vue';
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';

  export default {
    name: "App",
    components: {
      Header,
      Footer,
      Form,
    },
  }
</script>