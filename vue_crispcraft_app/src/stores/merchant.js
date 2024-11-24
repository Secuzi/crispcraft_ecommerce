import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
export const useMerchantStore = defineStore("merchant", () => {
  const merchants = ref([]);
  const selectedMerchant = ref();

  async function deleteMerchant(merchantID) {
    await axios.delete(`/merchant/${merchantID}`);
    const newMerchants = merchants.value.filter(
      (m) => m.merchantID != merchantID
    );
    console.log("new merchants: ", newMerchants);
    merchants.value = newMerchants;
  }

  return { merchants, selectedMerchant, deleteMerchant };
});
