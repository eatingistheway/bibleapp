<template>
  <div role="tablist" v-show="store.state.mainView" :key="componentKey">
    <v-expansion-panels>
      <v-expansion-panel
        v-for="book in store.state.books"
        :key="book.name"
      >
        <v-expansion-panel-title>
          <div class="bible_button">
            {{ book.name }}
            <v-icon
              class="caret_right"
              :class="{ 'rotate': rotate }"
            >
            </v-icon>
          </div>
        </v-expansion-panel-title>

        <v-expansion-panel-text>
          <v-container fluid>
            <v-row dense>
              <v-col
                v-for="chapterNum in book.chapters"
                :key="chapterNum"
                cols="2"
                xs="4"
                sm="2"
                md="2"
                class="pa-1"
              >
                <v-btn
                  class="chapter_card"
                  variant="flat"
                  @click="getVerses(book.name, chapterNum)"
                  block
                >
                  {{ chapterNum }}
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { event } from 'vue-gtag-next'

// Store
const store = useStore()

// Reactive state
const componentKey = ref(0)
const rotate = ref(true)

// Methods
const getVerses = async (bookName, chapterNum) => {
  store.commit('CHAPTER_SELECTED', { bookName, chapterNum })
  await store.dispatch('getVerses', { bookName, chapterNum })
  componentKey.value++
  
  event('CHAPTER_SELECTED', {
    event_category: 'Chapters',
    event_label: `${bookName} ${chapterNum}`
  })
}
</script>

<style scoped>
div {
  top: 25px;
}

.bible_button {
  text-align: left;
  color: #696969;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}

.caret_right {
  transition: transform 0.3s ease;
}

.caret_right.rotate {
  transform: rotate(90deg);
}

.chapter_card {
  background-color: white !important;
  color: #696969 !important;
  height: 4em !important;
  box-shadow: 5px 5px #DCDCDC !important;
  border-radius: 4px !important;
  text-transform: none !important;
  font-size: 1rem !important;
}

/* Vuetify overrides */
:deep(.v-expansion-panel) {
  background-color: white !important;
  margin-bottom: 4px !important;
}

:deep(.v-expansion-panel-title) {
  padding: 0 !important;
  min-height: 50px !important;
}

:deep(.v-expansion-panel-text__wrapper) {
  padding: 0 !important;
}

:deep(.v-row) {
  margin: 0 -4px !important;
}

:deep(.v-col) {
  padding: 4px !important;
}

:deep(.v-btn__content) {
  width: 100%;
  justify-content: center;
}
</style>