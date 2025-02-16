<template>
  <div v-show="store.state.buttonVisible">
    <!-- Return Button -->
  <v-btn
    class="return_button d-flex align-center"
    block
    color="grey"
    @click="reloadPage"
  >
    <v-icon class="mr-auto">mdi-chevron-left</v-icon>
    <span class="flex-grow-1 text-center">Main Page</span>
  </v-btn>

    <br>
    <!-- Bible Verses -->
    <div v-for="section in store.state.sections" :key="section.id">
      <v-container v-if="section.title" class="pa-0" style="max-width:none">
        <h3>{{ section.title }}</h3>
      </v-container>
      <p v-for="(verse, i) in section.verses" :key="i+verse.ref">
        <sup>{{ verse.ref.split(':')[1] }}</sup>
        {{ " " + verse.text }}
      </p>
    </div>

    <br>
    <!-- Navigation Buttons -->
    <div v-show="store.state.isChapter" class="navbuttons">
      <v-fade-transition>
        <v-btn-group>
          <v-btn-group class="mx-1">
            <v-btn
              rounded="pill"
              class="nav-btn"
              size="small"
              @click="navigate('previousBook')"
              color="primary"
              density="compact"
            >
              &laquo;
            </v-btn>

            <v-btn
              rounded="pill"
              class="nav-btn"
              size="small"
              @click="navigate('previousChapter')"
              color="primary"
              density="compact"
            >
              &lsaquo;
            </v-btn>
          </v-btn-group>

          <v-btn-group class="mx-2">
            <v-btn
              rounded="pill"
              class="nav-btn"
              size="small"
              @click="navigate('nextChapter')"
              color="primary"
              density="compact"
            >
              &rsaquo;
            </v-btn>

            <v-btn
              rounded="pill"
              class="nav-btn"
              size="small"
              @click="navigate('nextBook')"
              color="primary"
              density="compact"
            >
              &raquo;
            </v-btn>
          </v-btn-group>
        </v-btn-group>
      </v-fade-transition>
    </div>



    <!-- Copyright -->
    <div class="copyright text-body-2">
      Verses accessed from the Holy Bible Recovery Version (text-only edition) ©
      2024 Living Stream Ministry www.lsm.org
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'

const store = useStore()

// Methods
const navigate = async (instruction) => {
  const books = store.state.books
  let bookName = store.state.bookName
  let chapterNum = store.state.chapterNum
  let index = books.findIndex((book) => book.name === bookName)
  const totalChapters = books[index].chapters
  const resetVerses = true

  switch (instruction) {
    case 'previousChapter':
      if (chapterNum !== 1) {
        chapterNum -= 1
      } else if (bookName === 'Genesis' && chapterNum === 1) {
        bookName = 'Revelation'
        chapterNum = 22
      } else {
        index -= 1
        bookName = books[index].name
        chapterNum = books[index].chapters
      }
      break

    case 'nextChapter':
      if (chapterNum !== totalChapters) {
        chapterNum += 1
      } else if (bookName === 'Revelation' && chapterNum === books[index].chapters) {
        bookName = 'Genesis'
        chapterNum = 1
      } else {
        index += 1
        bookName = books[index].name
        chapterNum = 1
      }
      break

    case 'previousBook':
      if (bookName === 'Genesis') {
        bookName = 'Revelation'
        chapterNum = 1
      } else {
        index -= 1
        bookName = books[index].name
        chapterNum = 1
      }
      break

    case 'nextBook':
      if (bookName !== 'Revelation') {
        index += 1
        bookName = books[index].name
        chapterNum = 1
      } else {
        bookName = 'Genesis'
        chapterNum = 1
      }
      break
  }

  store.commit('CHAPTER_SELECTED', { bookName, chapterNum })
  await store.dispatch('getVerses', { bookName, chapterNum, resetVerses })
}

const reloadPage = () => {
  store.commit('RELOAD_PAGE')
}
</script>

<style scoped>
/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Navigation buttons */
.navbuttons {
  position: fixed;
  bottom: 60px;
  display: flex;
  align-items: flex-end;
  left: 15px;
  z-index: 5;
}

.mx-2 {
  margin-left: 175px !important;
}

/* Return button */
.return_button {
  height: 42px !important;
  position: sticky !important;
  top: 0 !important;
  z-index: 4;
  text-transform: none !important;
  border-radius: 0 !important;
}

/* Navigation button styles */
.nav-btn {
  min-width: 36px !important;
  width: 36px !important;
  height: 36px !important;
  padding: 0 !important;
  background-color: rgb(48, 65, 72) !important;
  color: white !important;
}

.rounded {
  margin-right: 8px !important;
}

/* Text styles */
h3 {
  font-size: 28px;
  font-weight: 500;
}

h3, p {
  text-align: left;
  margin-left: 15px;
  margin-right: 10px;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.copyright {
  margin: 20px 15px;
  color: rgba(0, 0, 0, 0.6);
}

/* Vuetify overrides */
:deep(.v-btn__content) {
  font-weight: normal;
  width: 100%;
  padding: 0 16px;
}

:deep(.v-btn-group) {
  gap: 4px !important;
}

/* Navigation button content override */
.nav-btn :deep(.v-btn__content) {
  padding: 0 !important;
  font-size: 1rem !important;
}

/* General button style */
.v-btn {
  background-color: rgb(48, 65, 72) !important;
  color: white !important;
}
</style>