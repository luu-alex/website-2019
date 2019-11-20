var phrases = {
    help : "this is the help tab!",
    about : "this is the about tab!"
}
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
            text:"For more commands enter 'help'"
        }
    ],
    nextId: 3,
    inp: ''

},
methods: {
    submitCommand: function() {
        if (this.inp == "help") {
            this.list.push({
                id: this.nextId++,
                text: 'help'
            })
        }
        this.list.push({
            id: this.nextId++,
            text: 'User$ '+this.inp
        })
        //this.inp = ''
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
    },
    commandList: function() {
        if (this.inp == "help") {
            this.list.push(
                {
                    id: this.nextId++,
                    text: "help cd ls other things that are for commnads"
                }
            )
        } else if (this.inp == "about") {
            this.list.push(
                {
                    id: this.nextId++,
                    text: "this is the about text"
                }
            )
        }
        console.log(this.list)
    },
},
mounted() {
    window.addEventListener("keypress", function(e) {
      this.changeInp(String.fromCharCode(e.keyCode));
      console.log(String.fromCharCode(e.keyCode))
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
