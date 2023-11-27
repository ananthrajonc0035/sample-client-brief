<template>
  <div>
    <header>
      <div class="header-content">
        <div class="back-button">
          <nuxt-link to="/">Back</nuxt-link>
        </div>
        <h1>Create Accounts</h1>
      </div>
    </header>

    <div class="lines2"></div>

    <div class="create-account">
      <div class="account-form">
        <div class="form-row">
          <div class="form-column">
            <label for="customerName">Customer Name:</label>
            <input
              v-model="customerName"
              type="text"
              id="customerName"
              placeholder="Enter customer name"
            />
          </div>

          <div class="form-column">
            <label for="briefId">Brief ID:</label>
            <input
              v-model="briefId"
              type="number"
              id="briefId"
              placeholder="Enter brief ID"
            />
          </div>
        </div>
        <div class="lines"></div>
        <div class="form-row">
          <div class="form-column">
            <label for="briefName">Brief Name:</label>
            <input
              v-model="briefName"
              type="text"
              id="briefName"
              placeholder="Enter brief name"
            />
          </div>

          <div class="form-column">
            <label for="isActive" class="toggle-switch">Is Active:</label>

            <input v-model="isActive" type="checkbox" id="isActive" />
            <span class="toggle-switch-slider"></span>
          </div>
        </div>
      </div>
    </div>
    <button class="cabutton" @click="createAccountHandler">Create Account</button>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import { useAccount } from '~/composable/state/useAccount';

const { createAccount } = useAccount();

const customerName = ref<string>("");
const briefId = ref<string>("");
const briefName = ref<string>("");
const isActive = ref<boolean>(false);

const createAccountHandler = () => {
    createAccount({
        customerName: customerName.value,
        briefId: briefId.value,
        briefName: briefName.value,
        isActive: isActive.value,
    });
};

</script>
