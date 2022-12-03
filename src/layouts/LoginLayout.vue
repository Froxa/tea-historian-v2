<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-positive">
      <q-toolbar>
        <q-icon name="fa-solid fa-leaf" color="white" size="md" />
        <q-toolbar-title> Čajový Historik </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginLayout",

  components: {},

  setup() {
    return {};
  },
});
</script>
