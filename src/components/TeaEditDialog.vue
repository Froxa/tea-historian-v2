<template>
  <q-card class="q-pa-md dialog-card">
    <q-form @submit="onSubmit">
      <q-card-section>
        <div class="text-h6" v-if="teaID != -1">Upravit</div>
        <div class="text-h6" v-else>Vytvořit</div>

        <q-input v-model="model.name" label="Název" />
        <q-select
          v-model="model.type"
          :options="typeOptions"
          emit-value
          map-options
          label="Kategorie"
        />
        <q-input v-model="model.pickingDate" label="Období sběru" />
        <q-input v-model="model.origin" label="Původ" />
        <q-input v-model="model.notes" autogrow label="Popis" />
        <q-toggle
          v-model="model.archived"
          left-label
          label="Čaj mám ve sbírce"
          color="positive"
        />
      </q-card-section>

      <q-card-section>
        <q-expansion-item
          label="Příprava 1"
          header-class="text-subtitle1"
          default-opened
          :header-style="{ paddingLeft: '0px', paddingRight: '0px' }"
        >
          <div
            v-if="'preparation' in model && model.preparation != '...'"
            class="text-red-10"
          >
            {{ model.preparation }} (Pouze dočasně)
          </div>
          <q-input
            v-model="model.preparation2[0].amount"
            label="Množství [g / 100 ml]"
            dense
          />
          <q-input
            v-model="model.preparation2[0].temperature"
            label="Teplota [˚C]"
            dense
          />
          <q-toggle
            v-model="model.preparation2[0].wash"
            left-label
            label="Opláchnout"
            color="positive"
          />
          <q-input
            v-model="model.preparation2[0].times[0]"
            label="1. nálev [s]"
            dense
            hide-bottom-space
          />
          <q-input
            v-model="model.preparation2[0].times[1]"
            label="2. nálev [s]"
            dense
            hide-bottom-space
          />
          <q-input
            v-model="model.preparation2[0].times[2]"
            label="3. nálev [s]"
            dense
            hide-bottom-space
          />
          <q-input
            v-model="model.preparation2[0].times[3]"
            label="4. nálev [s]"
            dense
            hide-bottom-space
          />
          <q-input
            v-model="model.preparation2[0].times[4]"
            label="5. nálev [s]"
            dense
            hide-bottom-space
          />
        </q-expansion-item>
      </q-card-section>

      <q-card-actions align="right" class="text-positive">
        <q-btn
          v-if="teaID != -1"
          label="Odstranit"
          @click="onDelete"
          color="negative"
          flat
        />
        <q-space />
        <q-btn label="Zrušit" flat v-close-popup @click="onCancel" />
        <q-btn label="Uložit" type="submit" color="positive" v-close-popup />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { defineComponent, ref, onMounted, computed, defineEmits } from "vue";
import { useQuasar } from "quasar";
import { useTeaStore } from "../stores/tea";

export default {
  name: "TeaEditDialog",
  components: {},
  props: ["teaID"],
  emits: ["deleted"],

  setup(props, ctx) {
    const $q = useQuasar();
    const store = useTeaStore();

    const model = ref(
      props.teaID != -1 ? store.getByID(props.teaID) : store.emptyTea()
    );
    const backup = JSON.parse(JSON.stringify(model.value));

    const onSubmit = async () => {
      if (props.teaID != -1) {
        // update
        await store.updateTea(model.value);
      } else {
        // create
        await store.createTea(model.value);
      }
    };

    const onDelete = () => {
      $q.dialog({
        title: "Potvrdit",
        message: "Opravdu chcete smazat položku?",
        cancel: { label: "Ne", color: "positive" },
        ok: { label: "Ano", color: "positive" },
        persistent: false,
      }).onOk(async () => {
        await store.deleteTea(props.teaID);
        ctx.emit("deleted");
      });
    };

    const onCancel = () => {
      if (props.teaID != -1) {
        store.restoreBackup(backup);
      }
    };

    const typeOptions = [
      { value: "white", label: "Bílý čaj" },
      { value: "green", label: "Zelený čaj" },
      { value: "lightoolong", label: "Světlý oolong" },
      { value: "darkoolong", label: "Tmavý oolong" },
      { value: "black", label: "Černý čaj" },
      { value: "shu", label: "Shu puerh" },
      { value: "sheng", label: "Sheng puerh" },
      { value: "yellow", label: "ŽLutý čaj" },
    ];

    return { model, typeOptions, onSubmit, onCancel, onDelete };
  },
};
</script>

<style lang="scss"></style>
