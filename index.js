
Vue.component('screen', {
    props: ['item'],
    template: '<p>{{item.text}}</p>'
})

Vue.component('v-input', {
    template: '<input/>',
    props: ['message']
})

Vue.component('v-submit', {
    template:'<button/>',
    data: function() {
        return ['message']
    }
})

Vue.component('v-output', {
    props: ['inp'],
    template:`<p>{{inp.text}}</p>`
})

var app = new Vue({
  el: '#app',
  data: {
    list: [],
    message: '',
    nextId: 0,
    inp: ''

},
methods: {
    submitCommand: function() {
        this.list.push({
            id: this.nextId++,
            text: 'User$ '+this.message
        })
        this.message = ''
    },
    changeInp: function(char) {
        this.inp += char;
    }
},
mounted() {
    window.addEventListener("keypress", function(e) {
      console.log(String.fromCharCode(e.keyCode));
    }.bind(this));
  }
})
