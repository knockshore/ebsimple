var Data = {
  correct: null,
  selected: null,
  current_question: () => {
    var question = 
      Data.questions.list.find(
        i => Data.question_index === i.uuid
      )
    // console.log('qn', question)
    return question;
  },
  question_index: null,
  questions: {
    list: [],
    fetch: () => {
      m.request({
          method: "GET",
          url: "/questions",
      })
      .then(function(data) {
        Data.questions.list = data.questions;
        Data.question_index = data.question_index;
        // m.redraw(false)
      })
    }
  },

}

var Question = {
  view: (vnode) => {
    if (Data.question_index !== null) {
      return m('.question_wrapper', [
        m('.question', Data.current_question().questionText),
        m(Choice,{index: 'A'}),
        m(Choice,{index: 'B'}),
        m(Choice,{index: 'C'}),
        m(Choice,{index: 'D'}),
      ])
    }
  }
}

var Correct = {
  view: (vnode) => {
    if (Data.correct) {
      return m('article', 
        m('.correct', 'Correct option is:'),
        m('.correct', 
          Data.current_question()
            ['option'+Data.correct])
      )
    }
  }
}

var Choice = {
  click: function(n){
    return function(){
      Data.selected = n
    }
  },
  classes: function(n){
    if (Data.selected === n){
      return 'active'
    } else {
      return ''
    }
  },
  view: function(vnode){
    var n = vnode.attrs.index
    return m('.choice',{ class: Choice.classes(n), onclick: Choice.click(n) },
      m('span.l'),
      m('span.v',Data.current_question()['option'+n])
    )
  }
}
var App = {
  oninit: Data.questions.fetch,
  next: () => {
    location.reload()
  },
  submit: function(){
    m.request({
        method: "PUT",
        url: "/submit",
        body: {
          selected: Data.selected,
          uuid: Data.question_index,
        },
    })
    .then(function(data) {
      Data.correct = data.correct;
      console.log('data',data)
    })
  },
  view: function() {
    return m('main', [
      m("h1", 'Study sync'),
      m('article',
        m(Question),
        m('.submit',
          m("button", {onclick: App.submit}, 'Submit')
        ),
        m('.submit',
          m("button", {onclick: App.next}, 'Next')
        )
      ),
      m(Correct)
    ])
  }
}

m.mount(document.body, App)
