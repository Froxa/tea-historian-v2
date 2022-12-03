<template>
  <q-page class="flex flex-center column bg-grey-2">
    <q-card class="flex flex-center column q-pa-xl">
      <div class="text-h3 text-weight-bold text-center q-mt-md">
        Vítá Vás čajový historik!
      </div>
      <div class="text-h6 text-weight-regular text-center q-my-lg">
        Než budete pokračovat je potřeba se přihlásit. Zvolte některou z
        možností níže.
      </div>
      <q-btn
        size="md"
        color="positive"
        icon="fa-brands fa-google"
        label="Google"
        @click="onGoogleClicked"
      />
    </q-card>
  </q-page>
</template>

<script>
import { GoogleAuthProvider, signInWithPopup, getAuth } from "@firebase/auth";
import { useRouter, useRoute } from "vue-router";
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "LoginPage",

  components: {},

  setup() {
    // change document title
    onMounted(() => {
      document.title = "Čajový Historik";
    });

    const router = useRouter();

    // handle Google login
    const onGoogleClicked = () => {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then(() => {
          router.push("/");
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    return { onGoogleClicked };
  },
});
</script>

<style></style>
