<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">Your Preferences</div>
            <PremiumModal/>
            <ZeroModal/>
            <PreferencesTable />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import PreferencesTable from '../components/PreferencesTable.vue';
  import PremiumModal from '../components/PremiumModal.vue';
  import ZeroModal from '../components/ZeroModal.vue';
  </script>
  