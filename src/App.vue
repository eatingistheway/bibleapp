<template>
  <v-app>
    <v-main>
      <div id="app">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

        <!-- Navigation buttons -->
        <v-btn
          class="buttontab"
          style="left:0"
          @click="show = true; scrollTop()"
          v-show="store.state.mainView"
          color="#4F5378"
          variant="flat"
        >
          Bible
        </v-btn>

        <v-btn
          class="buttontab"
          style="right:0"
          @click="show = false; readToday()"
          v-show="store.state.mainView"
          color="#4F5378"
          variant="flat"
        >
          Reading Plan
        </v-btn>

        <!-- Content sections -->
        <div v-show="show">
          <BibleBook />
          <VerseView />
        </div>

        <div v-show="!show">
          <YearlyPlan ref="planRef" />
          <VerseView />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useStore } from 'vuex'
import BibleBook from './components/BibleBook.vue'
import YearlyPlan from './components/YearlyPlan.vue'
import VerseView from './components/VerseView.vue'

// Store
const store = useStore()

// Reactive state
const show = ref(true)
const planRef = ref(null)

// Methods
const scrollTop = () => {
  window.scrollTo(0, 0)
}

const readToday = async () => {
  await nextTick()
  if (planRef.value?.scrollToToday) {
    planRef.value.scrollToToday()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.buttontab {
  position: fixed !important;
  top: 0 !important;
  z-index: 100 !important;
  width: 50% !important;
  height: 50px !important;
  border-radius: 0 !important;
  text-transform: none !important;
  color: white !important;
  letter-spacing: normal !important;
  font-weight: normal !important;
  border: thin solid !important;
  border-color: black !important;
  font-size: 16px !important;
}

/* Override Vuetify default styles */
.v-application {
  line-height: normal;
}

.v-btn {
  text-transform: none !important;
  font-size: inherit;
}
v-expansion-panel-title {
  font-size: 16px;
}
.v-main {
  padding: 0 !important;
}
</style>