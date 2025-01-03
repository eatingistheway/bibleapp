<template>
  <div v-show="store.state.mainView" style="margin-top:45px">
    <div
      v-for="(day, index) in days" 
      :key="index"
    >
      <div 
        :ref="el => setDayRef(el, index)"
        class="row" 
        @click="getVerseList(day)"
      >
        <div class="date">
          <div class="date-header">
            {{ day.date.toLocaleString('default', { month: 'long' }) }}
          </div>
          <span>{{ day.date.getDate() }}</span>
        </div>

        <span class="column">
          <span id="Day">
            {{ day.date.toLocaleDateString('default', { weekday: 'long' }) }}
          </span>
          <span id="Reading">{{ day.verses }}</span>
        </span>
        <i class="caret_right fa fa-angle-right"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { event } from 'vue-gtag-next'

// Store
const store = useStore()

// Reactive state
const days = ref([])
const today = ref(0)
const dayRefs = ref({})

// Methods
const setDayRef = (el, index) => {
  if (el) {
    dayRefs.value[`day-ref-${index}`] = el
  }
}

const scrollToToday = () => {
  const element = dayRefs.value[`day-ref-${today.value}`]
  if (element) {
    const top = element.offsetTop - 45 // Subtract 45px from the scroll position
    window.scrollTo({
      top: top,
      behavior: 'smooth'
    })
  }
}

const loadPlans = () => {
  const key = Object.keys(store.state.plan)[0]
  const verseList = store.state.plan[key]

  const daysArray = []
  let todayIndex = 0

  const todaysDate = new Date()
  const nextDate = new Date(key)
  
  for (let i = 0; i < verseList.length; i++) {
    const date = new Date(nextDate)
    if (date.toLocaleDateString() === todaysDate.toLocaleDateString()) {
      todayIndex = i
    }
    daysArray.push({
      date: date,
      verses: verseList[i]
    })
    nextDate.setDate(nextDate.getDate() + 1)
  }
  
  days.value = daysArray
  today.value = todayIndex
}

const getVerseList = (day) => {
  const verseList = day.verses
  store.commit('PLAN_SELECTED')
  store.dispatch('getVerseList', verseList)

  event('PLAN_SELECTED', {
    event_category: 'Plans',
    event_label: day.date.toLocaleDateString()
  })
}

// Lifecycle hooks
onMounted(() => {
  loadPlans()
  store.commit('SET_TODAYSREADING', today.value)
  // Add a small delay to ensure refs are properly set
  setTimeout(scrollToToday, 100)
})

</script>

<style scoped>
.row {
  position: relative;
  display: flex;
  width: 100%;
  background-color: white;
  transition: all 0.2s linear;
  text-align: left;
  font-size: 20px;
  margin-left: 0;
  padding: 10px 0;
  cursor: pointer;
}

.row:hover {
  background-color: #f5f5f5;
}

.date {
  background-color: white;
  margin: 5px 10px;
  width: 52px;
  height: 52px;
  border: 1px solid #ef9a9a;
  border-radius: 4px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.25),
    -1px -1px 1px 1px rgba(0, 0, 0, 0.22);
  text-align: center;
  overflow: hidden;
  justify-content: center;
  display: flex;
  flex-direction: column;
}

.date-header {
  color: #d32f2f;
  text-align: center;
  font-size: 9px;
  font-weight: 600;
  border-bottom: 1px solid #ef9a9a;
  background-color: #ffebee;
  padding: 5px 0;
}

.date span {
  font-family: "Times New Roman";
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.column {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0;
  overflow: hidden;
  flex: 1;
}

#Day {
  font-size: 1.5rem;
  line-height: 1.8rem;
  margin-bottom: 4px;
}

#Reading {
  font-size: 1rem;
  line-height: 1.2rem;
  color: rgba(0, 0, 0, 0.7);
}

.caret_right {
  width: 30px;
  height: 30px;
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.5);
}
</style>