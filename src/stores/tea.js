import { defineStore } from "pinia";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const useTeaStore = defineStore("teas", {
  state: () => ({
    teas: [],
  }),

  getters: {
    allTypes: (state) => {
      return state.teas;
    },
    oneType: (state) => {
      return (type) => state.teas.filter((tea) => tea.type == type);
    },
    getByID: (state) => {
      return (id) => {
        const t = state.teas.find((tea) => tea.id == id);

        if (!("preparation2" in t)) {
          t["preparation2"] = [
            {
              amount: "",
              temperature: "",
              wash: false,
              times: ["", "", "", "", ""],
            },
          ];
        }

        return t;
      };
    },
    emptyTea: (state) => {
      return () => ({
        // id
        owner: getAuth().currentUser.uid,
        name: "",
        notes: "",
        origin: "",
        pickingDate: "",
        type: "white",
        archived: true,
        preparation2: [
          {
            amount: "",
            temperature: "",
            wash: false,
            times: ["", "", "", "", ""],
          },
        ],
      });
    },
  },

  actions: {
    resetTeas() {
      this.teas = [];
    },

    async fetchTeas() {
      const db = getFirestore(getApp());

      // create and execute query
      const querySnapshot = await getDocs(
        query(
          collection(db, "teas"),
          where("owner", "==", getAuth().currentUser.uid)
        )
      );

      this.resetTeas();

      // parse results
      querySnapshot.forEach((doc) => {
        this.teas.push({ id: doc.id, ...doc.data() });
      });
    },

    async updateTea(newValues) {
      const index = this.teas.findIndex((tea) => tea.id == newValues.id);
      this.teas[index] = newValues;

      // save to DB
      const db = getFirestore(getApp());
      await setDoc(doc(db, "teas", newValues.id), newValues);
    },

    async createTea(newValues) {
      const db = getFirestore(getApp());
      const docRef = await addDoc(collection(db, "teas"), newValues);

      // add to store
      this.teas.push({ id: docRef.id, ...newValues });
    },

    async deleteTea(teaID) {
      const index = this.teas.findIndex((tea) => tea.id == teaID);
      if (index > -1) {
        // only splice array when item is found
        this.teas.splice(index, 1);
      }

      const db = getFirestore(getApp());
      await deleteDoc(doc(db, "teas", teaID));
    },

    restoreBackup(backup) {
      const index = this.teas.findIndex((tea) => tea.id == backup.id);
      this.teas[index] = backup;
    },
  },
});
