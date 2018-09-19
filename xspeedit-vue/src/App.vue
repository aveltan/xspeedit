<template>
  <div id="app">
    <PackBot></PackBot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PackBot from "./components/PackBot.vue";

@Component({
  components: {
    PackBot,
  },
})
export default class App extends Vue {}
</script>

<style>

</style>
