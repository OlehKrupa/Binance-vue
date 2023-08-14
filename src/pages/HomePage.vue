<template>
    <main class="px-4 py-5 my-5 text-center" style="min-height: 50vh;">
        <h1 class="display-5 fw-bold mt-4">{{ $t('paphosSloganTitle') }}</h1>
        <div class="col-lg-6 mx-auto">
            <p class="lead mb-4">{{ $t('trackRatesMessage') }}</p>
            <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <router-link :to="{ name: 'register' }" class="btn btn-primary btn-lg px-4 gap-3">{{ $t('signUpButton') }}</router-link>
                <router-link :to="{ name: 'login' }" class="btn btn-outline-secondary btn-lg px-4">{{ $t('signInButton') }}</router-link>
            </div>
        </div>
    </main>
</template>