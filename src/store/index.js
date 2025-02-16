// store/index.js
import { createStore } from "vuex";
import axios from "axios";
import plan from "../store/plan.json";

// API credentials
const API_USERNAME = process.env.VUE_APP_API_ID;
const API_TOKEN = process.env.VUE_APP_API_TOKEN;

// Configure axios with authentication
const api = axios.create({
  auth: {
    username: API_USERNAME,
    password: API_TOKEN,
  },
});

export default createStore({
  state() {
    return {
      // Visibilty states
      mainView: true,
      isChapter: false,
      buttonVisible: false,
      // current book & chapter
      bookName: "",
      chapterNum: 0,
      // data for plan, bibleBook, and verseView components
      sections: [],
      plan: plan,
      today: 0,
      books: [
        { name: "Genesis", chapters: 50, abbrev: "Gen", verseCounts: [31, 25, 24, 26, 32, 22, 24, 22, 29, 32, 32, 20, 18, 24, 21, 16, 27, 33, 38, 18, 34, 24, 20, 67, 34, 35, 46, 22, 35, 43, 55, 32, 20, 31, 29, 43, 36, 30, 23, 23, 57, 38, 34, 34, 28, 34, 31, 22, 33, 26] },
        { name: "Exodus", chapters: 40, abbrev: "Exo", verseCounts: [22, 25, 22, 31, 23, 30, 25, 32, 35, 29, 10, 51, 22, 31, 27, 36, 16, 27, 25, 26, 36, 31, 33, 18, 40, 37, 21, 43, 46, 38, 18, 35, 23, 35, 35, 38, 29, 31, 43, 38] },
        { name: "Leviticus", chapters: 27, abbrev: "Lev", verseCounts: [17, 16, 17, 35, 19, 30, 38, 36, 24, 20, 47, 8, 59, 57, 33, 34, 16, 30, 37, 27, 24, 33, 44, 23, 55, 46, 34] },
        { name: "Numbers", chapters: 36, abbrev: "Num", verseCounts: [54, 34, 51, 49, 31, 27, 89, 26, 23, 36, 35, 16, 33, 45, 41, 50, 13, 32, 22, 29, 35, 41, 30, 25, 18, 65, 23, 31, 40, 16, 54, 42, 56, 29, 34, 13] },
        { name: "Deuteronomy", chapters: 34, abbrev: "Deut", verseCounts: [46, 37, 29, 49, 33, 25, 26, 20, 29, 22, 32, 32, 18, 29, 23, 22, 20, 22, 21, 20, 23, 30, 25, 22, 19, 19, 26, 68, 29, 20, 30, 52, 29, 12] },
        { name: "Joshua", chapters: 24, abbrev: "Josh", verseCounts: [18, 24, 17, 24, 15, 27, 26, 35, 27, 43, 23, 24, 33, 15, 63, 10, 18, 28, 51, 9, 45, 34, 16, 33] },
        { name: "Judges", chapters: 21, abbrev: "Judg", verseCounts: [36, 23, 31, 24, 31, 40, 25, 35, 57, 18, 40, 15, 25, 20, 20, 31, 13, 31, 30, 48, 25] },
        { name: "Ruth", chapters: 4, abbrev: "Ruth", verseCounts: [22, 23, 18, 22] },
        { name: "1 Samuel", chapters: 31, abbrev: "1 Sam", verseCounts: [28, 36, 21, 22, 12, 21, 17, 22, 27, 27, 15, 25, 23, 52, 35, 23, 58, 30, 24, 42, 15, 23, 29, 22, 44, 25, 12, 25, 11, 31, 13] },
        { name: "2 Samuel", chapters: 24, abbrev: "2 Sam", verseCounts: [27, 32, 39, 12, 25, 23, 29, 18, 13, 19, 27, 31, 39, 33, 37, 23, 29, 33, 43, 26, 22, 51, 39, 25] },
        { name: "1 Kings", chapters: 22, abbrev: "1 Kings", verseCounts: [53, 46, 28, 34, 18, 38, 51, 66, 28, 29, 43, 33, 34, 31, 34, 34, 24, 46, 21, 43, 29, 53] },
        { name: "2 Kings", chapters: 25, abbrev: "2 Kings", verseCounts: [18, 25, 27, 44, 27, 33, 20, 29, 37, 36, 21, 21, 25, 29, 38, 20, 41, 37, 37, 21, 26, 20, 37, 20, 30] },
        { name: "1 Chronicles", chapters: 29, abbrev: "1 Chron", verseCounts: [54, 55, 24, 43, 26, 81, 40, 40, 44, 14, 47, 40, 14, 17, 29, 43, 27, 17, 19, 8, 30, 19, 32, 31, 31, 32, 34, 21, 30] },
        { name: "2 Chronicles", chapters: 36, abbrev: "2 Chron", verseCounts: [17, 18, 17, 22, 14, 42, 22, 18, 31, 19, 23, 16, 22, 15, 19, 14, 19, 34, 11, 37, 20, 12, 21, 27, 28, 23, 9, 27, 36, 27, 21, 33, 25, 33, 27, 23] },
        { name: "Ezra", chapters: 10, abbrev: "Ezra", verseCounts: [11, 70, 13, 24, 17, 22, 28, 36, 15, 44] },
        { name: "Nehemiah", chapters: 13, abbrev: "Neh", verseCounts: [11, 20, 32, 23, 19, 19, 73, 18, 38, 39, 36, 47, 31] },
        { name: "Esther", chapters: 10, abbrev: "Esth", verseCounts: [22, 23, 15, 17, 14, 14, 10, 17, 32, 3] },
        { name: "Job", chapters: 42, abbrev: "Job", verseCounts: [22, 13, 26, 21, 27, 30, 21, 22, 35, 22, 20, 25, 28, 22, 35, 22, 16, 21, 29, 29, 34, 30, 17, 25, 6, 14, 23, 28, 25, 31, 40, 22, 33, 37, 16, 33, 24, 41, 30, 24, 34, 17] },
        { name: "Psalms", chapters: 150, abbrev: "Psa", verseCounts: [6, 12, 8, 8, 12, 10, 17, 9, 20, 18, 7, 8, 6, 7, 5, 11, 15, 50, 14, 9, 13, 31, 6, 10, 22, 12, 14, 9, 11, 12, 24, 11, 22, 22, 28, 12, 40, 22, 13, 17, 13, 11, 5, 26, 17, 11, 9, 14, 20, 23, 19, 9, 6, 7, 23, 13, 11, 11, 17, 12, 8, 12, 11, 10, 13, 20, 7, 35, 36, 5, 24, 20, 28, 23, 10, 12, 20, 72, 13, 19, 16, 8, 18, 12, 13, 17, 7, 18, 52, 17, 16, 15, 5, 23, 11, 13, 12, 9, 9, 5, 8, 28, 22, 35, 45, 48, 43, 13, 31, 7, 10, 10, 9, 8, 18, 19, 2, 29, 176, 7, 8, 9, 4, 8, 5, 6, 5, 6, 8, 8, 3, 18, 3, 3, 21, 26, 9, 8, 24, 13, 10, 7, 12, 15, 21, 10, 20, 14, 9, 6] },
        { name: "Proverbs", chapters: 31, abbrev: "Prov", verseCounts: [33, 22, 35, 27, 23, 35, 27, 36, 18, 32, 31, 28, 25, 35, 33, 33, 28, 24, 29, 30, 31, 29, 35, 34, 28, 28, 27, 28, 27, 33, 31] },
        { name: "Ecclesiastes", chapters: 12, abbrev: "Eccl", verseCounts: [18, 26, 22, 16, 20, 12, 29, 17, 18, 20, 10, 14] },
        { name: "Song of Solomon", chapters: 8, abbrev: "SS", verseCounts: [17, 17, 11, 16, 16, 13, 13, 14] },
        { name: "Isaiah", chapters: 66, abbrev: "Isa", verseCounts: [31, 22, 26, 6, 30, 13, 25, 22, 21, 34, 16, 6, 22, 32, 9, 14, 14, 7, 25, 6, 17, 25, 18, 23, 12, 21, 13, 29, 24, 33, 9, 20, 24, 17, 10, 22, 38, 22, 8, 31, 29, 25, 28, 28, 25, 13, 15, 22, 26, 11, 23, 15, 12, 17, 13, 12, 21, 14, 21, 22, 11, 12, 19, 12, 25, 24] },
        { name: "Jeremiah", chapters: 52, abbrev: "Jer", verseCounts: [19, 37, 25, 31, 31, 30, 34, 22, 26, 25, 23, 17, 27, 22, 21, 21, 27, 23, 15, 18, 14, 30, 40, 10, 38, 24, 22, 17, 32, 24, 40, 44, 26, 22, 19, 32, 21, 28, 18, 16, 18, 22, 13, 30, 5, 28, 7, 47, 39, 46, 64, 34] },
        { name: "Lamentations", chapters: 5, abbrev: "Lam", verseCounts: [22, 22, 66, 22, 22] },
        { name: "Ezekiel", chapters: 48, abbrev: "Ezek", verseCounts: [28, 10, 27, 17, 17, 14, 27, 18, 11, 22, 25, 28, 23, 23, 8, 63, 24, 32, 14, 49, 32, 31, 49, 27, 17, 21, 36, 26, 21, 26, 18, 32, 33, 31, 15, 38, 28, 23, 29, 49, 26, 20, 27, 31, 25, 24, 23, 35] },
        { name: "Daniel", chapters: 12, abbrev: "Dan", verseCounts: [21, 49, 30, 37, 31, 28, 28, 27, 27, 21, 45, 13] },
        { name: "Hosea", chapters: 14, abbrev: "Hosea", verseCounts: [11, 23, 5, 19, 15, 11, 16, 14, 17, 15, 12, 14, 16, 9] },
        { name: "Joel", chapters: 3, abbrev: "Joel", verseCounts: [20, 32, 21] },
        { name: "Amos", chapters: 9, abbrev: "Amos", verseCounts: [15, 16, 15, 13, 27, 14, 17, 14, 15] },
        { name: "Obadiah", chapters: 1, abbrev: "Oba", verseCounts: [21] },
        { name: "Jonah", chapters: 4, abbrev: "Jonah", verseCounts: [17, 10, 10, 11] },
        { name: "Micah", chapters: 7, abbrev: "Micah", verseCounts: [16, 13, 12, 13, 15, 16, 20] },
        { name: "Nahum", chapters: 3, abbrev: "Nahum", verseCounts: [15, 13, 19] },
        { name: "Habakkuk", chapters: 3, abbrev: "Hab", verseCounts: [17, 20, 19] },
        { name: "Zephaniah", chapters: 3, abbrev: "Zeph", verseCounts: [18, 15, 20] },
        { name: "Haggai", chapters: 2, abbrev: "Hag", verseCounts: [15, 23] },
        { name: "Zechariah", chapters: 14, abbrev: "Zech", verseCounts: [21, 13, 10, 14, 11, 15, 14, 23, 17, 12, 17, 14, 9, 21] },
        { name: "Malachi", chapters: 4, abbrev: "Mal", verseCounts: [14, 17, 18, 6] },
        { name: "Matthew", chapters: 28, abbrev: "Matt", verseCounts: [25, 23, 17, 25, 48, 34, 29, 34, 38, 42, 30, 50, 58, 36, 39, 28, 27, 35, 30, 34, 46, 46, 39, 51, 46, 75, 66, 20] },
        { name: "Mark", chapters: 16, abbrev: "Mark", verseCounts: [45, 28, 35, 41, 43, 56, 37, 38, 50, 52, 33, 44, 37, 72, 47, 20] },
        { name: "Luke", chapters: 24, abbrev: "Luke", verseCounts: [80, 52, 38, 44, 39, 49, 50, 56, 62, 42, 54, 59, 35, 35, 32, 31, 37, 43, 48, 47, 38, 71, 56, 53] },
        { name: "John", chapters: 21, abbrev: "John", verseCounts: [51, 25, 36, 54, 47, 71, 53, 59, 41, 42, 57, 50, 38, 31, 27, 33, 26, 40, 42, 31, 25] },
        { name: "Acts", chapters: 28, abbrev: "Acts", verseCounts: [26, 47, 26, 37, 42, 15, 60, 40, 43, 48, 30, 25, 52, 28, 41, 40, 34, 28, 41, 38, 40, 30, 35, 27, 27, 32, 44, 31] },
        { name: "Romans", chapters: 16, abbrev: "Rom", verseCounts: [32, 29, 31, 25, 21, 23, 25, 39, 33, 21, 36, 21, 14, 23, 33, 27] },
        { name: "1 Corinthians", chapters: 16, abbrev: "1 Cor", verseCounts: [31, 16, 23, 21, 13, 20, 40, 13, 27, 33, 34, 31, 13, 40, 58, 24] },
        { name: "2 Corinthians", chapters: 13, abbrev: "2 Cor", verseCounts: [24, 17, 18, 18, 21, 18, 16, 24, 15, 18, 33, 21, 14] },
        { name: "Galatians", chapters: 6, abbrev: "Gal", verseCounts: [24, 21, 29, 31, 26, 18] },
        { name: "Ephesians", chapters: 6, abbrev: "Eph", verseCounts: [23, 22, 21, 32, 33, 24] },
        { name: "Philippians", chapters: 4, abbrev: "Phil", verseCounts: [30, 30, 21, 23] },
        { name: "Colossians", chapters: 4, abbrev: "Col", verseCounts: [29, 23, 25, 18] },
        { name: "1 Thessalonians", chapters: 5, abbrev: "1 Thes", verseCounts: [10, 20, 13, 18, 28] },
        { name: "2 Thessalonians", chapters: 3, abbrev: "2 Thes", verseCounts: [12, 17, 18] },
        { name: "1 Timothy", chapters: 6, abbrev: "1 Tim", verseCounts: [20, 15, 16, 16, 25, 21] },
        { name: "2 Timothy", chapters: 4, abbrev: "2 Tim", verseCounts: [18, 26, 17, 22] },
        { name: "Titus", chapters: 3, abbrev: "Titus", verseCounts: [16, 15, 15] },
        { name: "Philemon", chapters: 1, abbrev: "Philem", verseCounts: [25] },
        { name: "Hebrews", chapters: 13, abbrev: "Heb", verseCounts: [14, 18, 19, 16, 14, 20, 28, 13, 28, 39, 40, 29, 25] },
        { name: "James", chapters: 5, abbrev: "James", verseCounts: [27, 26, 18, 17, 20] },
        { name: "1 Peter", chapters: 5, abbrev: "1 Pet", verseCounts: [25, 25, 22, 19, 14] },
        { name: "2 Peter", chapters: 3, abbrev: "2 Pet", verseCounts: [21, 22, 18] },
        { name: "1 John", chapters: 5, abbrev: "1 John", verseCounts: [10, 29, 24, 21, 21] },
        { name: "2 John", chapters: 1, abbrev: "2 John", verseCounts: [13] },
        { name: "3 John", chapters: 1, abbrev: "3 John", verseCounts: [14] },
        { name: "Jude", chapters: 1, abbrev: "Jude", verseCounts: [25] },
        { name: "Revelation", chapters: 22, abbrev: "Rev", verseCounts: [20, 29, 22, 11, 14, 17, 17, 13, 21, 11, 19, 18, 18, 20, 8, 21, 18, 24, 21, 15, 27, 21] },
      ],
    };
  },

  actions: {
    // async Break verse list sections by book & chapter then getVerses()
    // "Matt. 1; Matthew 2:4; Matt. 5:18-20; Psa. 145-146; Psalm 140:12-141:9"
    async getVerseList({ dispatch, state }, verseString) {
      console.log(`Requested ${verseString}`); // Log requested verses

      // Make sure books with one chapter have a 1 as the chapter ie "Philemon; 1 Sam 2:12-36" to "Philemon 1; 1 Sam 2:12-36"
      verseString = verseString.replace(/(\D);/g, "$1 1;");
      verseString = verseString.replace(/(\D$)/g, "$1 1");

      // Split into sectons: [Matt. 1, ..., Psalm 140:12-141:9]
      const verseList = verseString.replace(/; /g, ";").split(";");

      // Loop through verseList
      for (let i = 0; i < verseList.length; i++) {
        // Split by space between bookname and section
        const str = verseList[i];
        var bookName = str.substr(0, str.lastIndexOf(" "));
        const section = str.substr(str.lastIndexOf(" ") + 1, str.length);

        // Replace any abbreviations
        bookName = bookName.replace(/\./g, "");
        if (bookName == "Psalm") {
          bookName = "Psalms";
        }
        state.books.forEach((book) => {
          if (bookName == book.abbrev) {
            bookName = book.name;
          }
        });

        // Check if colons and dashes in section
        const countDash = (section.match(/-/g) || []).length;
        const countColon = (section.match(/:/g) || []).length;

        // Initialize vars
        var chapterNum;
        var start;
        var end;
        const sectionTitle = true;

        // John 5:12-6:10
        if (countDash == 1 && countColon == 2) {
          // Split into chapter and verse
          [chapterNum, start] = section.split("-")[0].split(":");
          await dispatch("getVerses", { bookName, chapterNum, start, sectionTitle });
          [chapterNum, end] = section.split("-")[1].split(":");
          start = 1;
          await dispatch("getVerses", { bookName, chapterNum, start, end, sectionTitle });
        }

        // Matt. 5:18-20
        else if (countDash == 1 && countColon == 1) {
          [chapterNum, start] = section.split("-")[0].split(":");
          end = section.split("-")[1];
          await dispatch("getVerses", { bookName, chapterNum, start, end, sectionTitle });
        }

        // John 3-4
        else if (countDash == 1 && countColon == 0) {
          const chapterStart = parseInt(section.split("-")[0]);
          const chapterEnd = parseInt(section.split("-")[1]);
          for (chapterNum = chapterStart; chapterNum <= chapterEnd; chapterNum++) {
            await dispatch("getVerses", { bookName, chapterNum });
          }
        }

        // Matthew 2:4;
        else if (countDash == 0 && countColon == 1) {
          [chapterNum, start] = section.split(":");
          end = start;
          await dispatch("getVerses", { bookName, chapterNum, start, end, sectionTitle });
        }

        // Matt. 1
        else if (countDash == 0 && countColon == 0) {
          chapterNum = section;
          await dispatch("getVerses", { bookName, chapterNum });
        }
      }
    },

    async getVerses({ commit, getters }, payload) {
      try {
        // Destructure payload and set default values
        let { bookName, chapterNum, start = 1, end, sectionTitle = false, resetVerses = false } = payload;

        if (!bookName || !chapterNum) {
          throw new Error("Book name and chapter number are required");
        }

        // Reset verses if requested
        if (resetVerses) {
          commit("RESET_Verses");
        }

        // Ensure chapterNum and start are integers
        chapterNum = parseInt(chapterNum);
        start = parseInt(start);

        // Set and validate end value
        const chapterEnd = getters.getVerseCount(bookName, chapterNum);
        end = Math.min(parseInt(end || chapterEnd), chapterEnd);

        // Determine the title format based on sectionTitle flag
        let title = sectionTitle ? `${bookName} ${chapterNum}:${start}-${end}` : `${bookName} ${chapterNum}`;

        // Define retry mechanism parameters
        const maxRetries = 3; // Maximum number of retry attempts
        let attempt = 0; // Current attempt counter
        let success = false; // Flag to track success of data fetching

        // Retry loop for fetching data
        while (attempt < maxRetries && !success) {
          try {
            console.log(`Requesting ${bookName} ${chapterNum}:${start}-${end}`); // Log requested verses

            // Make API request to fetch verses
            const encodedBookName = encodeURIComponent(bookName);
            const url = `https://com.acsrcv.io:web_691b5280-229a-4859-be88-bd6cd4e76451@api.lsm.org/recver/txo.php?String=${encodedBookName}+${chapterNum}:${start}-${end}&Out=json`;

            const response = await api.get(url);
            let data = response.data;

            // Process each verse in the response
            for (var index = 0; index < data.verses.length; index++) {
              const verse = data.verses[index];

              // Break loop if a non-existent verse is encountered
              if (verse.text.startsWith("No such verse")) {
                break;
              }
            }
            data.verses = data.verses.slice(0, index); // Trim verses to valid ones

            // Create section object with title and verses
            const section = {
              title: title,
              verses: data.verses,
            };

            // Commit section to store if it contains verses
            if (section.verses.length != 0) {
              commit("SET_VERSES", section);
            }

            // Disable title for subsequent requests in the same section
            title = "";
            success = true; // Mark success if no errors occur
          } catch (error) {
            console.log(`Attempt ${attempt + 1} failed:`, error); // Log error with attempt number
            attempt++; // Increment attempt counter
            if (attempt >= maxRetries) {
              console.error("Failed to load verses after multiple attempts."); // Log final failure
            }
          }
        }
        commit("FINISHED_LOADING_SECTION"); // Indicate loading completion
      } catch (error) {
        console.error("Error in getVerses:", error);
        throw error;
      }
    },
  },

  mutations: {
    RELOAD_PAGE(state) {
      state.isChapter = false;
      state.mainView = true;
      state.buttonVisible = false;
      state.sections = [];
    },

    RESET_Verses(state) {
      state.buttonVisible = false;
      state.sections = [];
    },

    SET_TODAYSREADING(state, today) {
      state.today = today;
    },

    SET_VERSES(state, section) {
      state.sections.push(section);
    },

    // When a user presses the button of a chapter number this variable sets to false and hides
    // the Bible book component
    CHAPTER_SELECTED(state, payload) {
      const { bookName, chapterNum } = payload;
      state.bookName = bookName;
      state.chapterNum = chapterNum;
      state.mainView = false;
      state.isChapter = true;
    },

    PLAN_SELECTED(state) {
      state.mainView = false;
    },

    FINISHED_LOADING_SECTION(state) {
      state.buttonVisible = true;
    },
  },

  // Optionally, you can add getters if needed
  getters: {
    // Example getter
    getCurrentBook: (state) => state.bookName,
    getCurrentChapter: (state) => state.chapterNum,
    isMainViewVisible: (state) => state.mainView,
    getVerseCount: (state) => (bookName, chapterNum) => {
      const book = state.books.find((b) => b.name === bookName);
      if (!book) {
        console.error(`Book not found: ${bookName}`);
        return null;
      }
      if (chapterNum < 1 || chapterNum > book.chapters) {
        console.error(`Invalid chapter ${chapterNum} for ${bookName}`);
        return null;
      }
      return book.verseCounts[chapterNum - 1];
    },
  },
});
