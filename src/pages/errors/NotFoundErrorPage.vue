<template>
    <div class="container py-5">
        <h1>{{ $t('errorPage.notFoundTitle') }}</h1>
        <p>{{ $t('errorPage.notFoundMessage', { page: $route.params.notFound }) }}</p>
        <router-link :to="{ name: 'dashboard' }">{{ $t('errorPage.backToDashboard') }}</router-link>
    </div>
</template>
