<template>
  <v-app>
    <Header />

    <Sidebar />

    <Main />

    <Footer />
  </v-app>
</template>

<script>
import Header from "~/views/Header";
import Sidebar from "~/views/Sidebar";
import Main from "~/views/Main";
import Footer from "~/views/Footer";

export default {
  components: {
    Header,
    Sidebar,
    Main,
    Footer
  }
};
</script>
