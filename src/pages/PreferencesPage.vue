<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">{{ $t('yourPreferencesTitle') }}</div>
                    <CryptoTable/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import CryptoTable from '../components/CryptoTable.vue';
</script>