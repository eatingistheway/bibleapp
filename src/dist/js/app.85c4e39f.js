(function(e) {
  function t(t) {
    for (var n, o, i=t[0], c=t[1], u=t[2], b=0, p=[]; b<i.length; b++)o=i[b], Object.prototype.hasOwnProperty.call(r, o)&&r[o]&&p.push(r[o][0]), r[o]=0; for (n in c)Object.prototype.hasOwnProperty.call(c, n)&&(e[n]=c[n]); l&&l(t); while (p.length)p.shift()(); return s.push.apply(s, u||[]), a();
  } function a() {
    for (var e, t=0; t<s.length; t++) {
      for (var a=s[t], n=!0, i=1; i<a.length; i++) {
        const c=a[i]; 0!==r[c]&&(n=!1);
      }n&&(s.splice(t--, 1), e=o(o.s=a[0]));
    } return e;
  } const n={}; var r={app: 0}; var s=[]; function o(t) {
    if (n[t]) return n[t].exports; const a=n[t]={i: t, l: !1, exports: {}}; return e[t].call(a.exports, a, a.exports, o), a.l=!0, a.exports;
  }o.m=e, o.c=n, o.d=function(e, t, a) {
    o.o(e, t)||Object.defineProperty(e, t, {enumerable: !0, get: a});
  }, o.r=function(e) {
    'undefined'!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e, Symbol.toStringTag, {value: 'Module'}), Object.defineProperty(e, '__esModule', {value: !0});
  }, o.t=function(e, t) {
    if (1&t&&(e=o(e)), 8&t) return e; if (4&t&&'object'===typeof e&&e&&e.__esModule) return e; const a=Object.create(null); if (o.r(a), Object.defineProperty(a, 'default', {enumerable: !0, value: e}), 2&t&&'string'!=typeof e) {
      for (const n in e) {
        o.d(a, n, function(t) {
          return e[t];
        }.bind(null, n));
      }
    } return a;
  }, o.n=function(e) {
    const t=e&&e.__esModule?function() {
      return e['default'];
    }:function() {
      return e;
    }; return o.d(t, 'a', t), t;
  }, o.o=function(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, o.p='/'; let i=window['webpackJsonp']=window['webpackJsonp']||[]; const c=i.push.bind(i); i.push=t, i=i.slice(); for (let u=0; u<i.length; u++)t(i[u]); var l=c; s.push([0, 'chunk-vendors']), a();
})({'0': function(e, t, a) {
  e.exports=a('8c74');
}, '15cf': function(e, t, a) {
  'use strict'; a('bcae');
}, '1e26': function(e, t, a) {
  'use strict'; a('248a');
}, '248a': function(e, t, a) {}, '4986': function(e, t, a) {}, 'bcae': function(e, t, a) {}, 'bcd5': function(e, t, a) {
  'use strict'; const n=function() {
    const e=this; const t=e.$createElement; const a=e._self._c||t; return a('div', {attrs: {id: 'app'}}, [a('meta', {attrs: {name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no'}}), a('link', {attrs: {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'}}), a('button', {directives: [{name: 'show', rawName: 'v-show', value: e.$store.state.mainView, expression: '$store.state.mainView'}], staticClass: 'buttontab', staticStyle: {left: '0'}, on: {click: function(t) {
      e.show=!0, e.scrollTop();
    }}}, [e._v(' Bible ')]), a('button', {directives: [{name: 'show', rawName: 'v-show', value: e.$store.state.mainView, expression: '$store.state.mainView'}], staticClass: 'buttontab', on: {click: function(t) {
      e.show=!1, e.readToday();
    }}}, [e._v(' Reading Plan ')]), a('div', {directives: [{name: 'show', rawName: 'v-show', value: e.show, expression: 'show'}]}, [a('BibleBook'), a('VerseView')], 1), a('div', {directives: [{name: 'show', rawName: 'v-show', value: !e.show, expression: '!show'}]}, [a('Plan', {ref: 'plan-ref'}), a('VerseView')], 1)]);
  }; const r=[]; const s=function() {
    const e=this; const t=e.$createElement; const a=e._self._c||t; return a('div', {directives: [{name: 'show', rawName: 'v-show', value: e.mainView, expression: 'mainView'}], key: e.componentKey, attrs: {role: 'tablist'}}, e._l(e.books, (function(t) {
      return a('b-card', {key: t.name, staticClass: 'mb-1', staticStyle: {'border-style': 'none', 'margin': '0px'}, attrs: {'no-body': ''}}, [a('b-card-header', {staticClass: 'p-1', staticStyle: {'border-style': 'none'}, attrs: {'header-tag': 'header', 'role': 'tab'}}, [a('b-button', {directives: [{name: 'b-toggle', rawName: 'v-b-toggle:[book.name]', arg: t.name}], staticClass: 'bible_button', attrs: {block: '', variant: 'info'}, on: {click: function(t) {
        e.rotate=!e.rotate;
      }}}, [e._v(' '+e._s(t.name)+' '), a('i', {staticClass: 'caret_right fa fa-angle-right'})])], 1), a('b-collapse', {staticStyle: {'margin-bottom': '10px'}, attrs: {id: t.name, invisible: '', accordion: 'my-accordion', role: 'tabpanel'}}, [a('b-row', {staticStyle: {margin: '0px'}, attrs: {cols: '6'}}, e._l(t.chapters, (function(n) {
        return a('b-button', {key: n, staticClass: 'chapter_card', attrs: {tabindex: '0', id: t.name}, on: {'&click': function(a) {
          return e.getVerses(t.name, n);
        }}}, [e._v(' '+e._s(n)+' ')]);
      })), 1)], 1)], 1);
    })), 1);
  }; const o=[]; const i=(a('5be1'), a('e791'), a('e2af')); const c=a('5702'); const u=a('94ea'); const l={name: 'BibleBook', data: function() {
    return {componentKey: 0, rotate: !0};
  }, computed: Object(c['a'])({}, Object(u['a'])(['mainView', 'books'])), methods: {getVerses: function(e, t) {
    const a=this; return Object(i['a'])(regeneratorRuntime.mark((function n() {
      return regeneratorRuntime.wrap((function(n) {
        while (1) {
          switch (n.prev=n.next) {
            case 0: return a.$store.commit('CHAPTER_SELECTED', {bookName: e, chapterNum: t}), n.next=3, a.$store.dispatch('getVerses', {bookName: e, chapterNum: t}); case 3: a.componentKey+=1, a.$gtag.event('CHAPTER_SELECTED', {event_category: 'Chapters', event_label: ''.concat(e, ' ').concat(t)}); case 5: case 'end': return n.stop();
          }
        }
      }), n);
    })))();
  }}}; const b=l; const p=(a('15cf'), a('5a82')); const d=Object(p['a'])(b, s, o, !1, null, '76b60b5e', null); const f=d.exports; const v=function() {
    const e=this; const t=e.$createElement; const a=e._self._c||t; return a('div', {directives: [{name: 'show', rawName: 'v-show', value: e.$store.state.mainView, expression: '$store.state.mainView'}]}, e._l(e.days, (function(t, n) {
      return a('div', {key: t.id, ref: 'day-ref-'+n, refInFor: !0}, [a('div', {staticClass: 'row', on: {click: function(a) {
        return e.getVerseList(t);
      }}}, [a('div', {staticClass: 'date'}, [a('div', {staticClass: 'date-header'}, [e._v(e._s(t.date.toLocaleString('default', {month: 'long'})))]), a('span', [e._v(e._s(t.date.getDate()))])]), a('span', {staticClass: 'column'}, [a('span', {attrs: {id: 'Day'}}, [e._v(e._s(t.date.toLocaleDateString('default', {weekday: 'long'})))]), a('span', {attrs: {id: 'Reading'}}, [e._v(e._s(t.verses))])]), a('i', {staticClass: 'caret_right fa fa-angle-right'})])]);
    })), 0);
  }; const h=[]; const m=(a('c1dd'), {name: 'Plan', data: function() {
    return {days: 0, today: 0};
  }, mounted: function() {
    this.loadPlans(), this.$store.commit('SET_TODAYSREADING', this.today);
  }, methods: {loadPlans: function() {
    for (var e=Object.keys(this.$store.state.plan)[0], t=this.$store.state.plan[e], a=[], n=0, r=new Date, s=new Date(e), o=0; o<t.length; o++) {
      const i=new Date(s); i.toLocaleDateString()===r.toLocaleDateString()&&(n=o), a.push({date: i, verses: t[o]}), s.setDate(s.getDate()+1);
    } this.days=a, this.today=n;
  }, getVerseList: function(e) {
    const t=e.verses; this.$store.commit('PLAN_SELECTED'), this.$store.dispatch('getVerseList', t), this.$gtag.event('PLAN_SELECTED', {event_category: 'Plans', event_label: e.date.toLocaleDateString()});
  }}}); const w=m; const g=(a('1e26'), Object(p['a'])(w, v, h, !1, null, 'ba4cc364', null)); const y=g.exports; const _=function() {
    const e=this; const t=e.$createElement; const a=e._self._c||t; return a('div', {directives: [{name: 'show', rawName: 'v-show', value: e.buttonVisible, expression: 'buttonVisible'}]}, [a('b-button', {staticClass: 'return_button', attrs: {block: '', variant: 'primary'}, on: {click: function(t) {
      return e.reloadPage();
    }}}, [a('i', {staticClass: 'fa fa-angle-left', staticStyle: {float: 'left'}}), e._v(' Main Page ')]), a('br'), e._l(e.sections, (function(t) {
      return a('div', {key: t.id}, [''!=t.title?a('span', [a('h3', [e._v(e._s(t.title))])]):e._e(), e._l(t.verses, (function(t, n) {
        return a('p', {key: n+t.ref}, [a('sup', [e._v(e._s(t.ref.split(':')[1]))]), e._v(' '+e._s(' '+t.text)+' ')]);
      }))], 2);
    })), a('br'), a('div', {directives: [{name: 'show', rawName: 'v-show', value: e.isChapter, expression: 'isChapter'}]}, [a('transition', {attrs: {name: 'fade'}}, [a('b-button-toolbar', {staticClass: 'center', attrs: {'key-nav': '', 'aria-label': 'Toolbar with button groups'}}, [a('b-button-group', {staticClass: 'mx-1', staticStyle: {'padding-right': '50px'}}, [a('b-button', {staticStyle: {'margin-right': '10px'}, on: {'&click': function(t) {
      return e.navigate('previousBook');
    }}}, [e._v('« ')]), a('b-button', {on: {'&click': function(t) {
      return e.navigate('previousChapter');
    }}}, [e._v('‹ ')])], 1), a('b-button-group', {staticClass: 'mx-1'}, [a('b-button', {staticStyle: {'margin-right': '10px'}, on: {'&click': function(t) {
      return e.navigate('nextChapter');
    }}}, [e._v('› ')]), a('b-button', {on: {'&click': function(t) {
      return e.navigate('nextBook');
    }}}, [e._v('» ')])], 1)], 1)], 1)], 1), a('div', {staticClass: 'copyright'}, [e._v(' Verses accessed from the Holy Bible Recovery Version (text-only edition) © 2012 Living Stream Ministry www.lsm.org ')])], 2);
  }; const k=[]; const x=(a('f46d'), a('1c1b'), {name: 'VerseView', computed: Object(c['a'])({}, Object(u['a'])(['sections', 'buttonVisible', 'isChapter'])), methods: {navigate: function(e) {
    const t=this; return Object(i['a'])(regeneratorRuntime.mark((function a() {
      let n; let r; let s; let o; let i; let c; return regeneratorRuntime.wrap((function(a) {
        while (1) {
          switch (a.prev=a.next) {
            case 0: n=t.$store.state.books, r=t.$store.state.bookName, s=t.$store.state.chapterNum, o=n.findIndex((function(e) {
              return e.name===r;
            })), i=n[o].chapters, c=!0, a.t0=e, a.next='previousChapter'===a.t0?9:'nextChapter'===a.t0?16:'previousBook'===a.t0?23:'nextBook'===a.t0?31:38; break; case 9: if (1==s) {
              a.next=13; break;
            }s-=1, a.next=15; break; case 13: return t.navigate('previousBook'), a.abrupt('return'); case 15: return a.abrupt('break', 38); case 16: if (s==i) {
              a.next=20; break;
            }s+=1, a.next=22; break; case 20: return t.navigate('nextBook'), a.abrupt('return'); case 22: return a.abrupt('break', 38); case 23: if ('Genesis'==r) {
              a.next=29; break;
            }o-=1, r=n[o].name, s=1, a.next=30; break; case 29: return a.abrupt('return'); case 30: return a.abrupt('break', 38); case 31: if ('Revelation'==r) {
              a.next=37; break;
            }o+=1, r=n[o].name, s=1, a.next=38; break; case 37: return a.abrupt('return'); case 38: return t.$store.commit('CHAPTER_SELECTED', {bookName: r, chapterNum: s}), a.next=41, t.$store.dispatch('getVerses', {bookName: r, chapterNum: s, resetVerses: c}); case 41: case 'end': return a.stop();
          }
        }
      }), a);
    })))();
  }, reloadPage: function() {
    this.$store.commit('RELOAD_PAGE');
  }}}); const C=x; const V=(a('e111'), Object(p['a'])(C, _, k, !1, null, '6170771d', null)); const $=V.exports; const S={name: 'App', data: function() {
    return {show: !0};
  }, components: {BibleBook: f, Plan: y, VerseView: $}, methods: {scrollTop: function() {
    window.scrollTo(0, 0);
  }, readToday: function() {
    const e=this.$refs['plan-ref'].$refs['day-ref-'+this.$store.state.today]; this.$nextTick((function() {
      const t=e[0].offsetTop; window.scrollTo({top: t, behavior: 'smooth'});
    }));
  }}}; const E=S; const O=(a('e5cd'), Object(p['a'])(E, n, r, !1, null, null, null)); t['a']=O.exports;
}, 'c68d': function(e, t, a) {}, 'e111': function(e, t, a) {
  'use strict'; a('4986');
}, 'e5cd': function(e, t, a) {
  'use strict'; a('c68d');
}});
// # sourceMappingURL=app.85c4e39f.js.map
