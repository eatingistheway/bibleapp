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
        { name: "Genesis", chapters: 50, abbrev: "Gen" },
        { name: "Exodus", chapters: 40, abbrev: "Exo" },
        { name: "Leviticus", chapters: 27, abbrev: "Lev" },
        { name: "Numbers", chapters: 36, abbrev: "Num" },
        { name: "Deuteronomy", chapters: 34, abbrev: "Deut" },
        { name: "Joshua", chapters: 24, abbrev: "Josh" },
        { name: "Judges", chapters: 21, abbrev: "Judg" },
        { name: "Ruth", chapters: 4, abbrev: "Ruth" },
        { name: "1 Samuel", chapters: 31, abbrev: "1 Sam" },
        { name: "2 Samuel", chapters: 24, abbrev: "2 Sam" },
        { name: "1 Kings", chapters: 22, abbrev: "1 Kings" },
        { name: "2 Kings", chapters: 25, abbrev: "2 Kings" },
        { name: "1 Chronicles", chapters: 29, abbrev: "1 Chron" },
        { name: "2 Chronicles", chapters: 36, abbrev: "2 Chron" },
        { name: "Ezra", chapters: 10, abbrev: "Ezra" },
        { name: "Nehemiah", chapters: 13, abbrev: "Neh" },
        { name: "Esther", chapters: 10, abbrev: "Esth" },
        { name: "Job", chapters: 42, abbrev: "Job" },
        { name: "Psalms", chapters: 150, abbrev: "Psa" },
        { name: "Proverbs", chapters: 31, abbrev: "Prov" },
        { name: "Ecclesiastes", chapters: 12, abbrev: "Eccl" },
        { name: "Song of Solomon", chapters: 8, abbrev: "SS" },
        { name: "Isaiah", chapters: 66, abbrev: "Isa" },
        { name: "Jeremiah", chapters: 52, abbrev: "Jer" },
        { name: "Lamentations", chapters: 5, abbrev: "Lam" },
        { name: "Ezekiel", chapters: 48, abbrev: "Ezek" },
        { name: "Daniel", chapters: 12, abbrev: "Dan" },
        { name: "Hosea", chapters: 14, abbrev: "Hosea" },
        { name: "Joel", chapters: 3, abbrev: "Joel" },
        { name: "Amos", chapters: 9, abbrev: "Amos" },
        { name: "Obadiah", chapters: 1, abbrev: "Oba" },
        { name: "Jonah", chapters: 4, abbrev: "Jonah" },
        { name: "Micah", chapters: 7, abbrev: "Micah" },
        { name: "Nahum", chapters: 3, abbrev: "Nahum" },
        { name: "Habakkuk", chapters: 3, abbrev: "Hab" },
        { name: "Zephaniah", chapters: 3, abbrev: "Zeph" },
        { name: "Haggai", chapters: 2, abbrev: "Hag" },
        { name: "Zechariah", chapters: 14, abbrev: "Zech" },
        { name: "Malachi", chapters: 4, abbrev: "Mal" },
        { name: "Matthew", chapters: 28, abbrev: "Matt" },
        { name: "Mark", chapters: 16, abbrev: "Mark" },
        { name: "Luke", chapters: 24, abbrev: "Luke" },
        { name: "John", chapters: 21, abbrev: "John" },
        { name: "Acts", chapters: 28, abbrev: "Acts" },
        { name: "Romans", chapters: 16, abbrev: "Rom" },
        { name: "1 Corinthians", chapters: 16, abbrev: "1 Cor" },
        { name: "2 Corinthians", chapters: 13, abbrev: "2 Cor" },
        { name: "Galatians", chapters: 6, abbrev: "Gal" },
        { name: "Ephesians", chapters: 6, abbrev: "Eph" },
        { name: "Philippians", chapters: 4, abbrev: "Phil" },
        { name: "Colossians", chapters: 4, abbrev: "Col" },
        { name: "1 Thessalonians", chapters: 5, abbrev: "1 Thes" },
        { name: "2 Thessalonians", chapters: 3, abbrev: "2 Thes" },
        { name: "1 Timothy", chapters: 6, abbrev: "1 Tim" },
        { name: "2 Timothy", chapters: 4, abbrev: "2 Tim" },
        { name: "Titus", chapters: 3, abbrev: "Titus" },
        { name: "Philemon", chapters: 1, abbrev: "Philem" },
        { name: "Hebrews", chapters: 13, abbrev: "Heb" },
        { name: "James", chapters: 5, abbrev: "James" },
        { name: "1 Peter", chapters: 5, abbrev: "1 Pet" },
        { name: "2 Peter", chapters: 3, abbrev: "2 Pet" },
        { name: "1 John", chapters: 5, abbrev: "1 John" },
        { name: "2 John", chapters: 1, abbrev: "2 John" },
        { name: "3 John", chapters: 1, abbrev: "3 John" },
        { name: "Jude", chapters: 1, abbrev: "Jude" },
        { name: "Revelation", chapters: 22, abbrev: "Rev" },
      ],
    };
  },

  actions: {
    // async Break verse list sections by book & chapter then getVerses()
    // "Matt. 1; Matthew 2:4; Matt. 5:18-20; Psa. 145-146; Psalm 140:12-141:9"
    async getVerseList({ dispatch, state }, verseString) {
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

    async getVerses({ commit }, payload) {
      // Destructure payload and set default values
      let { bookName, chapterNum, start = 1, end, sectionTitle = false, resetVerses = false } = payload;

      // Reset verses if requested
      if (resetVerses) {
        commit("RESET_Verses");
      }

      // Ensure chapterNum and start are integers
      chapterNum = parseInt(chapterNum);
      start = parseInt(start);

      // Set default end value if not provided
      if (end === undefined) {
        if (bookName == "Psalms" && chapterNum == "119") {
          end = 176; // The longest chapter in the Bible
        } else {
          end = 89; // Default to 89, the second longest chapter in the Bible
        }
      } else {
        end = parseInt(end);
      }

      // Determine the title format based on sectionTitle flag
      let title = sectionTitle ? `${bookName} ${chapterNum}:${start}-${end}` : `${bookName} ${chapterNum}`;

      // Define retry mechanism parameters
      const maxRetries = 3; // Maximum number of retry attempts
      let attempt = 0; // Current attempt counter
      let success = false; // Flag to track success of data fetching

      // Retry loop for fetching data
      while (attempt < maxRetries && !success) {
        try {
          // Api request accepts a range of verses, only 30 verses or less at a time.
          // Loop to fetch verses in chunks of 30 or less
          let next = 0;
          while (next != end) {
            next = start + 29; // Calculate the next verse range
            if (next > end) {
              next = end; // Adjust if next exceeds the end
            }

            // Make API request to fetch verses
            const encodedBookName = encodeURIComponent(bookName);
            const url = `https://com.acsrcv.io:web_691b5280-229a-4859-be88-bd6cd4e76451@api.lsm.org/recver/txo.php?String=${encodedBookName}+${chapterNum}:${start}-${next}&Out=json`;

            const response = await api.get(url);
            let data = response.data;

            // The response format is a "\[ *verse* \]" string returned for "Rom. 16:24", "Mark 9:44", and "Mark 9:46" for json parsing
            // The replace function will look for all backslashes and replace them with nothing
            // Then the JSON.parse function will turn the json string variable into an array
            // Handle string response by removing escape characters and parsing JSON
            if (typeof data === "string") {
              data = JSON.parse(data.replace(/\\/g, "").replace(/\//g, ""));
            }

            // Process each verse in the response
            for (var index = 0; index < data.verses.length; index++) {
              const verse = data.verses[index];

              // Italicize bracketed text TBD
              if (verse.ref !== "Rom. 16:24" && verse.ref !== "Mark 9:44" && verse.ref !== "Mark 9:46") {
                // verse.text = verse.text.replace(/$$(.*?)$$/g, '<span class="italic">$1</span>');
              }

              // Break loop if a non-existent verse is encountered
              if (verse.text.startsWith("No such verse")) {
                next = end;
                break;
              }

              // Handle non-existent references as reading catchup days with a default message
              if (verse.text.startsWith("No such ref")) {
                if (title.slice(-3, -1) == " 1") {
                  title = title.slice(0, -2); // Adjust title for single-chapter books
                }
                verse.text = "Enjoy my fav verse :) Phil. 4:19 And my God will fill your every need according to His riches, in glory, in Christ Jesus.";
                next = end;
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
            start += 30; // Move to the next set of verses
          }
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
  },
});
