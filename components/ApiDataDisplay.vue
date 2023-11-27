<template>
  <div class="container">
    
    <div class="filters">
      <div class="grid">
      <div class="row">
        <div class="column">
          <label for="customerNameFilter">Customer Name:</label>
          <input
            type="text"
            id="customerNameFilter"
            v-model="filters.customerName"
            @input="applyFilters"
          />
        </div>
        <div class="column">
          <label for="briefNameFilter">Brief Name:</label>
          <input
            type="text"
            id="briefNameFilter"
            v-model="filters.briefName"
            @input="applyFilters"
          />
        </div>
      </div>

      <div class="row">
        <div class="column">
          <label for="briefIdFilter">Brief ID:</label>
          <input
            type="number"
            id="briefIdFilter"
            v-model.number="filters.briefId"
            @input="applyFilters"
          />
        </div>
        <div class="column">
          <label for="dateFilter">Date:</label>
          <input
            type="date"
            id="dateFilter"
            v-model="filters.date"
            @input="applyFilters"
          />
        </div>
      </div>

      <div class="row">
        <div class="column">
          <label for="isActiveFilter">Is Active:</label>
          <select
            id="isActiveFilter"
            v-model="filters.isActive"
            @change="applyFilters"
          >
            <option value="">All</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div class="column">
          <label for="idFilter">ID:</label>
          <input
            type="text"
            id="idFilter"
            v-model="filters.id"
            @input="applyFilters"
          />
        </div>
      </div>
      
    </div>

    </div>
       <div class="vertical-line"></div>
    <div class="table">
      <table class="styled-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Brief Name</th>
            <th>Brief ID</th>
            <th>Date</th>
            <th>Is Active</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredData" :key="item.id">
            <td>{{ item.customerName }}</td>
            <td>{{ item.briefName }}</td>
            <td>{{ item.briefId }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.isActive }}</td>
            <td>{{ item.id }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAccount } from '~/composable';
import type{ Account } from '~/types/account';
const {accountList,fetchAccountlist}=useAccount()
const filters = ref({
  customerName: "",
  briefName: "",
  briefId: null as number | null,
  date: "",
  isActive: "",
  id: "",
});
const filterData = () => {
  applyFilters();
};

const filteredData = ref<any[]>([]);

const displayData = (data: any[]) => {
  filteredData.value = data;
};



const applyFilters = () => {
  let filtered = accountList.value;

  Object.entries(filters.value).forEach(([key, value]) => {
    const typedKey = key as keyof Account
    if (value !== "" && value !== null && value !== undefined) {
      filtered = filtered.filter((item) => {
        const itemValue = String(item[typedKey ]);
        return (
          itemValue !== null &&
          itemValue !== undefined &&
          itemValue.toLowerCase().includes(String(value).toLowerCase())
        );
      });
    }
  });

  displayData(filtered);
};

onMounted(async() => {
await fetchAccountlist()
applyFilters()
});
</script>
