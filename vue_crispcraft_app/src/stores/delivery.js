import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useDeliveryStore = defineStore("delivery", () => {
  const address = ref("");
  const deliveryCharge = ref(0);
  const pendingDeliveries = ref([]);

  function formatDeliveryData(deliveries) {
    const deliveryDetails = deliveries.map((row) => ({
      deliveryID: row.deliveryID,
      deliveryDate: row.deliveryDate,
      paymentID: row.paymentID,
      fName: row.fName,
      lName: row.lName,
      reason: row.reason,
      fullName: row.fName + " " + row.lName,
      address: row.address,
      orderID: row.orderID,
      phoneNum: row.phoneNum,
      orderItems: JSON.parse(row.orderItems), // Parse JSON string into JavaScript array
      totalAmount: row.totalAmount,
    }));

    return deliveryDetails;
  }

  return { address, deliveryCharge, pendingDeliveries, formatDeliveryData };
});
