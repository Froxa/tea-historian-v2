<template>
  <q-page class="flex column items-center bg-grey-2">
    <div v-if="!loading" class="flex column items-stretch">
      <TeaItem
        v-for="tea in teasFiltered"
        :key="tea.id"
        :info="tea"
        @showEditDialog="showEditDialog(tea.id)"
      />
    </div>

    <q-dialog v-model="editDialogVisible" persistent>
      <TeaEditDialog
        :teaID="editDialogTeaID"
        @deleted="editDialogVisible = false"
    /></q-dialog>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="positive" @click="showEditDialog(-1)" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useTeaStore } from "../stores/tea";
import { useSettingsStore } from "../stores/settings";
import TeaItem from "../components/TeaItem.vue";
import TeaEditDialog from "../components/TeaEditDialog.vue";

export default defineComponent({
  name: "IndexPage",
  components: { TeaItem, TeaEditDialog },
  props: ["selectedType"],

  setup(props) {
    const loading = ref(true);
    const teas = ref([]);
    const store = useTeaStore();
    const settings = useSettingsStore();

    /*
     * TEA LIST
     */
    onMounted(async () => {
      await store.fetchTeas();
      loading.value = false;
    });

    const teasFiltered = computed(() => {
      let fTeas =
        props.selectedType == "all"
          ? store.allTypes
          : store.oneType(props.selectedType);

      if (settings.showOnlyAvailable == true) {
        fTeas = fTeas.filter((tea) => tea.archived == true);
      }

      return fTeas.sort((a, b) => a.name > b.name);
    });

    /*
     * EDIT DIALOG
     */
    const editDialogVisible = ref(false);
    const editDialogTeaID = ref(-1);

    const showEditDialog = (teaID) => {
      editDialogVisible.value = true;
      editDialogTeaID.value = teaID;
    };

    return {
      loading,
      teas,
      teasFiltered,
      editDialogVisible,
      editDialogTeaID,
      showEditDialog,
    };
  },
});
</script>

<style lang="scss"></style>
