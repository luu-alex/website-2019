function TimerQueue(){
  this.currentTimer = null;
  this.tasks = [];
}

TimerQueue.prototype.addTask = function(callback, delay){
  this.tasks.push({ callback: callback, delay: delay });

  // If there's a scheduled task, bail out.
  if(this.currentTimer) return;

  // Otherwise, start kicking tires
  this.launchNextTask();
};

TimerQueue.prototype.launchNextTask = function(){

  // If there's a scheduled task, bail out.
  if(this.currentTimer) return;

  var self = this;
  var nextTask = this.tasks.shift();

  // There's no more tasks, clean up.
  if(!nextTask) return this.clear();

  // Otherwise, schedule the next task.
  this.currentTimer = setTimeout(function(){
    nextTask.callback.call();

    self.currentTimer = null;

    // Call this function again to set up the next task.
    self.launchNextTask();
  }, nextTask.delay);
};

TimerQueue.prototype.clear = function(){
  if (this.currentTimer) clearTimeout(this.currentTimer);

  // Timer clears only destroy the timer. It doesn't null references.
  this.currentTimer = null;

  // Fast way to clear the task queue
  this.tasks.length = 0;
};

var queue = new TimerQueue();
var id = 1;
var phrases = {
    help : "this is the help tab!",
    about : "this is the about tab!"
}

function delay(t, v) {
   return new Promise(function(resolve) {
       setTimeout(resolve.bind(null, v), t)
   });
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
    list: [],
    nextId: 3,
    inp: ''

},
methods: {
    submitCommand: function() {
        if (phrases.hasOwnProperty(this.inp)) {
            this.commandList(this.inp);
        }
        this.list.push({
            id: id++,
            text: 'User$ '+this.inp
        });
        this.inp = '';
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
    commandList: function(phrase) {
        phrase = phrase.toLowerCase();
        if (phrase == "help") {
            this.pushPhrase("To learn more about me enter 'about'");
            this.pushPhrase("If you are curous on how I built this, enter 'how'");
        } else if (phrase == "about") {
            this.pushPhrase("I currently intern at Loopio, a start up in Toronto as a full-stack Software developer");
            this.pushPhrase("I worked for the University of Toronto as a Teaching Assistant for Computer Science");
            this.pushPhrase("I've attended Hack the North and UofT Hacks, they were both great opportunities meeting amazing people");
            this.pushPhrase("And was able to bring some amazing ideas to life :)");
        } else if (phrase == "how") {
            this.pushPhrase("This site was built using Vue.js and Javascript by me :), the source code is available on my Github.");
            this.pushPhrase("I use a queue to push strings that will show up on to this screen!");
            this.pushPhrase("And I use key press events to display text when you type");
        }
    },
    pushPhrase: function(phrase, delay = 1000) {
        var lst = this.list;

        queue.addTask(function () {
            lst.push(
                {
                    id: id++,
                    text: phrase
                }
            )
        }, delay);

    }
},
mounted() {
    window.addEventListener("keypress", function(e) {
        if (e.keyCode !=13){
          this.changeInp(String.fromCharCode(e.keyCode));
          console.log(String.fromCharCode(e))
        }
    }.bind(this));

    window.addEventListener("keydown", function(e) {
        if (e.keyCode == 8) {
            this.removeLastInp();
        } else if (e.keyCode == 13) {
            this.submitCommand();
        }
      }.bind(this));
      this.pushPhrase('Welcome!');
      this.pushPhrase('My name is Alex Luu and I am a Third year UofT student studying Computer Science');
      this.pushPhrase("For more commands enter 'help'", 1000);
  }
})
