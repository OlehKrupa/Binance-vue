<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Your Preferences</div>
                    <PreferencesTable/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import PreferencesTable from '../components/PreferencesTable.vue';
</script>