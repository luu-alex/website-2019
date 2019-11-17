
Vue.component('screen', {
    props: ['item'],
    template: '<p>{{item.text}}</p>'
})

Vue.component('v-mac-tabs', {
    template: `
    <div>
        <i class="fas fa-circle" style="color:red"></i>
        <i class="fas fa-circle" style="color:green"></i>
        <i class="fas fa-circle" style="color:grey"></i>
    </div>
    `
})
var app = new Vue({
  el: '#app',
  data: {
    list: [
        {
            id:1, 
            text:'Welcome! My name is Alex Luu and I am a Third year UofT student studying Computer Science, I\'m currently interning at Toronto start up Loopio. '
        }, 
        {
            id:2, 
            text:'I\'m a passionate programmer attending Hackathons such as Uoft Hacks and Hack the North and on my free time and love bringing ideas to life through side projects' 
        },
        {
            id:3,
            text:"For more commands enter 'help'"
        }
    ],
    message: '',
    nextId: 3,
    inp: ''

},
methods: {
    submitCommand: function() {
        this.list.push({
            id: this.nextId++,
            text: 'User$ '+this.inp
        })
        this.inp = ''
    },
    changeInp: function(char) {
        if(this.inp.length <= 50) {
            this.inp += char;
        }
    },
    removeLastInp: function() {
        if(this.inp.length > 0) {
            this.inp = this.inp.substring(0, this.inp.length - 1);
        }
    }
},
mounted() {
    window.addEventListener("keypress", function(e) {
      this.changeInp(String.fromCharCode(e.keyCode));
    }.bind(this));

    window.addEventListener("keydown", function(e) {
        if (e.keyCode == 8) {
            this.removeLastInp();
        } else if (e.keyCode == 13) {
            this.submitCommand();
        }
      }.bind(this));
  }
})
