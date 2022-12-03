<template>
  <q-card class="q-ma-md tea-card">
    <q-card-section :class="info.type">
      <div class="row justify-between">
        <div v-if="!info.archived" class="text-overline">Neni ve sbirce</div>
        <div class="col-11 text-h6">
          {{ info.name }}
        </div>
        <div class="col-1 text-right">
          <q-btn
            icon="fa-solid fa-pen-to-square"
            size="sm"
            flat
            round
            @click="$emit('showEditDialog')"
          ></q-btn>
        </div>
      </div>
      <div class="column justify-between">
        <div class="col">
          {{ info.pickingDate
          }}<span v-if="info.pickingDate != '' && info.origin != ''">, </span
          >{{ info.origin }}
        </div>
      </div>
    </q-card-section>

    <q-card-section class="pre-wrap">
      {{ info.notes }}
    </q-card-section>

    <q-card-section>
      <q-markup-table dense class="no-overflow">
        <table class="prep-table">
          <thead>
            <tr>
              <th class="text-left">Množství</th>
              <th class="text-left">Teplota</th>
              <th class="text-left">Opláchnout</th>
              <th class="text-left">1.</th>
              <th class="text-left">2.</th>
              <th class="text-left">3.</th>
              <th class="text-left">4.</th>
              <th class="text-left">5.</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!('preparation2' in info)">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr v-if="'preparation2' in info">
              <td>
                <span v-if="info.preparation2[0].amount != ''">
                  {{ info.preparation2[0].amount }} g / 100 ml</span
                >
              </td>
              <td>
                <span v-if="info.preparation2[0].temperature != ''"
                  >{{ info.preparation2[0].temperature }} ˚C</span
                >
              </td>
              <td>{{ info.preparation2[0].wash ? "Ano" : "Ne" }}</td>
              <td v-for="i in [0, 1, 2, 3, 4]" :key="i">
                <span v-if="info.preparation2[0].times[i] != ''"
                  >{{ info.preparation2[0].times[i] }} s</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </q-markup-table>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useTeaStore } from "../stores/tea";

export default {
  name: "TeaItem",
  components: {},
  props: ["info"],

  setup(props) {
    return {};
  },
};
</script>

<style lang="scss">
.tea-card {
  max-width: 700px;
}

.pre-wrap {
  white-space: pre-wrap;
}

.dialog-card {
  width: 100%;
}

.no-overflow {
  max-width: 85vw !important;
}

.prep-table {
  width: inherit;
}

.white {
  //background-color: rgb(254, 254, 194);
  background-color: $yellow-2;
}
.green {
  //background-color: rgb(187, 195, 21);
  background-color: $lime-14;
}
.lightoolong {
  /*background-color: rgb(249, 227, 0);*/
  background-color: rgb(249, 227, 0);
}
.darkoolong {
  /*background-color: rgb(223, 126, 0);*/
  background-color: $orange-5;
}
.black {
  /*background-color: rgb(162, 9, 1);*/
  color: white;
  background-color: rgb(255, 85, 7);
}
.shu {
  color: white;
  /*background-color: rgb(93, 0, 2);*/
  background-color: rgb(93, 0, 2);
}
.sheng {
  /*background-color: rgb(241, 229, 107);*/
  background-color: $amber-3;
}
.yellow {
  /*background-color: rgb(206, 164, 43);*/
  background-color: rgb(206, 164, 43);
}
</style>
