
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

var app = new Vue({
  el: '#app',
  data: {
    list: [
    ],
    message: '',
    nextId: 0
},
methods: {
    submitCommand: function() {
        this.list.push({
            id: this.nextId++,
            text: 'User$ '+this.message
        })
        this.message = ''
    }
}
})
