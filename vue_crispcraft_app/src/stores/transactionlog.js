import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useTransactionLogStore = defineStore("transaction-log", () => {
  const transactions = ref([]);
  function formatTransactions(data) {
    // Create a map to group transactions by transactionID
    const transactionsMap = new Map();

    data.forEach((row) => {
      const {
        transactionID,
        orderID,
        deliveryID,
        orderDate,
        orderItemID,
        productID,
        productName,
        quantity,
        price,
        flavorID,
        flavorName,
      } = row;

      // Check if the transactionID already exists in the map
      if (!transactionsMap.has(transactionID)) {
        // If not, initialize a new transaction object
        transactionsMap.set(transactionID, {
          transactionID,
          orderID,
          deliveryID,
          orderDate,
          orderItems: [], // Initialize an empty array for order items
          subtotal: 0,
        });
      }

      // Add the current order item to the orderItems array
      const transaction = transactionsMap.get(transactionID);
      transaction.orderItems.push({
        orderItemID,
        productID,
        productName,
        quantity,
        price, // Include price for each item
        flavorID,
        flavorName,
      });
      transaction.subtotal += price * quantity;
    });

    // Convert the map values to an array
    return Array.from(transactionsMap.values());
  }

  return { transactions, formatTransactions };
});
