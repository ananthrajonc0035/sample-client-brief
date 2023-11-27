<template>
  <div>
    <header>
      <div class="header-content">
        <div class="back-button">
          <nuxt-link to="/">Back</nuxt-link>
        </div>
        <h1>Edit Account</h1>
      </div>
    </header>
      <div class="lines3"></div>
    <div v-show="isModalVisible" class="modal" style="display: flex">
      <div class="modal-content" @click.stop>
        <form @submit.prevent="saveChanges">
          <label for="editCustomerName">Customer Name:</label>
          <input
            v-model="editCustomerName"
            type="text"
            id="editCustomerName"
            required
          />

          <label for="editBriefId">Brief ID:</label>
          <input v-model="editBriefId" type="text" id="editBriefId" required />

          <label for="editBriefName">Brief Name:</label>
          <input
            v-model="editBriefName"
            type="text"
            id="editBriefName"
            required
          />

          <label for="editIsActive">Is Active:</label>
          <input v-model="editIsActive" type="checkbox" id="editIsActive" />

          <button type="submit" class="savebtn">Save Changes</button>
          <button type="button" @click="closeModal" class="cancelbtn">Cancel</button>
        </form>
      </div>
    </div>

    <table id="accountTable">
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Brief ID</th>
          <th>Brief Name</th>
          <th>Is Active</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="account in accounts"
          :key="account.id"
          @click="editAccount(account.id)"
        >
          <td>{{ account.customerName }}</td>
          <td>{{ account.briefId }}</td>
          <td>{{ account.briefName }}</td>
          <td>{{ account.isActive }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const isModalVisible = ref(false);
const editCustomerName = ref<string>("");
const editBriefId = ref<string>("");
const editBriefName = ref<string>("");
const editIsActive = ref<boolean>(false);
const selectedAccountId = ref<number | null>(null);
const accounts = ref<Array<any>>([]);

const saveChanges = () => {
  if (!selectedAccountId.value) {
    alert("Please select a valid account before saving changes.");
    return;
  }

  const updatedData = {
    customerName: editCustomerName.value,
    briefId: editBriefId.value,
    briefName: editBriefName.value,
    isActive: editIsActive.value,
  };

  fetch(`http://52.66.203.14:9000/api/v1/accounts/${selectedAccountId.value}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to update account. Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Account updated successfully:", data);
      closeModal();
    })
    .catch((error) => {
      console.error("Error updating account:", error.message);
      alert(error.message);
    });
};

const closeModal = () => {
  isModalVisible.value = false;
};

const editAccount = (id: number) => {
  console.log("Editing account with ID:", id);
  fetch(`http://52.66.203.14:9000/api/v1/accounts/${id}`)
    .then((response) => response.json())
    .then((account) => {
      editCustomerName.value = account.customerName;
      editBriefId.value = account.briefId;
      editBriefName.value = account.briefName;
      editIsActive.value = account.isActive;
      selectedAccountId.value = account.id;
      isModalVisible.value = true;
    })
    .catch((error) => console.error("Error fetching account details:", error));
};

const fetchData = () => {
  fetch(
    "http://52.66.203.14:9000/api/v1/accounts/search?customerName=&briefId=&briefName=&isActive="
  )
    .then((response) => response.json())
    .then((data) => {
      if (Array.isArray(data.accounts)) {
        accounts.value = data.accounts;
      } else {
        console.error("Data.accounts is not an array:", data.accounts);
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
};

onMounted(() => {
  fetchData();
});
</script>

