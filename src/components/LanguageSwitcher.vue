<template>
    <div class="language-select">
      <select class="select-box" @change="switchLanguage">
        <option v-for="sLocale in supportedLocales" :key="`locale-${sLocale}`" :value="sLocale"
            :selected="locale === sLocale">
            {{ t(`locale.${sLocale}`) }}
        </option>
      </select>
    </div>
  </template>

<script>
import { useI18n } from 'vue-i18n';
import Tr from '../i18n/translation'
import { useRouter } from "vue-router"

export default {
    setup() {
        const { t, locale } = useI18n()

        const supportedLocales = Tr.supportedLocales

        const router = useRouter()

        const switchLanguage = async (event) => {
            const newLocale = event.target.value

            await Tr.switchLanguage(newLocale)

            try {
                await router.replace({ params: { locale: newLocale } })
            } catch(e){
                console.error(e)
                router.replace("/")
            }
        }

        return { t, locale, supportedLocales, switchLanguage }
    }
}
</script>

<style scoped>
.language-select {
  display: inline-block;
  position: relative;
}

.select-box {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  color: #333;
  cursor: pointer;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.select-box:hover {
  border-color: #666;
}

.select-box:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}
</style>