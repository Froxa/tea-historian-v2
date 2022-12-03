<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-positive" elevated>
      <q-toolbar>
        <q-icon name="fa-solid fa-leaf" color="white" size="md" />
        <q-toolbar-title> Čajový Historik </q-toolbar-title>
        <q-btn
          :label="user.displayName"
          icon-right="fa-regular fa-circle-user"
          flat
          no-caps
        >
          <q-menu anchor="bottom right" self="top right">
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">Nastavení</div>
                <q-toggle
                  v-model="settings.showOnlyAvailable"
                  label="Zobrazit pouze čaje ve sbírce"
                  color="positive"
                />
              </div>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-avatar size="72px">
                  <img referrerpolicy="no-referrer" :src="user.photoURL" />
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">
                  {{ user.displayName }}
                </div>

                <q-btn
                  color="grey"
                  label="Odhlásit"
                  size="sm"
                  v-close-popup
                  @click="onLogoutClicked"
                />
              </div>
            </div>
          </q-menu>
        </q-btn>
      </q-toolbar>

      <q-tabs v-model="tab">
        <q-tab name="all" label="Vše" />
        <q-tab name="white" label="Bílý čaj" />
        <q-tab name="green" label="Zelený čaj" />
        <q-tab name="lightoolong" label="Světlý oolong" />
        <q-tab name="darkoolong" label="Tmavý oolong" />
        <q-tab name="black" label="Černý čaj" />
        <q-tab name="shu" label="Shu puerh" />
        <q-tab name="sheng" label="Sheng puerh" />
        <q-tab name="yellow" label="Žlutý čaj" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view :selectedType="tab" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { getAuth } from "@firebase/auth";
import { useRouter, useRoute } from "vue-router";
import { defineComponent, ref, computed } from "vue";
import { useSettingsStore } from "../stores/settings";

export default defineComponent({
  name: "MainLayout",

  components: {},

  setup() {
    // tea category selector
    const tab = ref("tab");
    tab.value = "all";

    // archived toggle
    const settings = useSettingsStore();

    // user computed property
    const user = computed(() => getAuth().currentUser);

    // handle logout
    const router = useRouter();
    const onLogoutClicked = () => {
      getAuth().signOut();
      router.push("/login");
    };

    return { tab, user, settings, onLogoutClicked };
  },
});
</script>
