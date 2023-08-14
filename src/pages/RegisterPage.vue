<template>
    <main class="auth-wrapper">
        <form class="auth-form" @submit.prevent="handleSubmit">
            <h1>
                <span>Binance</span>
                <strong>2.0</strong>
            </h1>
            <h2 class="h3 mb-4 fw-normal">Please sign up</h2>
            <div class="form-floating mb-2">
                <input type="text" class="form-control" :class="{ 'is-invalid': errors.first_name && errors.first_name[0] }" id="first_name" v-model="form.first_name" placeholder="Your first name" />
                <label for="first_name">First name</label>
                <div class="invalid-feedback" v-if="errors.first_name && errors.first_name[0]">
                    {{ errors.first_name && errors.first_name[0] }}
                </div>
            </div>
            <div class="form-floating mb-2">
                <input type="text" class="form-control" :class="{ 'is-invalid': errors.last_name && errors.last_name[0] }" id="last_name" v-model="form.last_name" placeholder="Your last name" />
                <label for="last_name">Last name</label>
                <div class="invalid-feedback" v-if="errors.last_name && errors.last_name[0]">
                    {{ errors.last_name && errors.last_name[0] }}
                </div>
            </div>
            <div class="form-floating mb-2">
                <input type="email" class="form-control" :class="{ 'is-invalid': errors.email && errors.email[0] }" id="email" v-model="form.email" placeholder="name@example.com" />
                <label for="email">Email</label>
                <div class="invalid-feedback" v-if="errors.email && errors.email[0]">
                    {{ errors.email && errors.email[0] }}
                </div>
            </div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control" :class="{ 'is-invalid': errors.password && errors.password[0] }" id="password" v-model="form.password" placeholder="Password" />
                <label for="password">Password</label>
                <div class="invalid-feedback" v-if="errors.password && errors.password[0]">
                    {{ errors.password && errors.password[0] }}
                </div>
            </div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control" id="password_confirmation" v-model="form.password_confirmation"
                    placeholder="Password Confirmation" />
                <label for="password_confirmation">Password Confirmation</label>
            </div>

            <button class="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>
        </form>
    </main>
</template>

<script setup>
import { reactive } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import Tr from "../i18n/translation";

const router = useRouter()
const store = useAuthStore()
const { isLoggedIn, errors } = storeToRefs(store)
const { handleRegister } = store

const form = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
})

const handleSubmit = async () => {
    await handleRegister(form)
    if (isLoggedIn.value) {
        router.push(Tr.i18nRoute({ name: 'dashboard' }))
    }
}
</script>

<style scoped>
.auth-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 60vh;
    margin-top: 2rem;
}

.auth-form {
    width: 400px;
}
</style>