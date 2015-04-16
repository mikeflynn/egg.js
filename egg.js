// thatmikeflynn.com/egg.js/

function Egg() {
  this.eggs = [];
  this.hooks = [];
  this.kps = [];
  this.activeEgg = '';
}

// Keycode lookup: http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
Egg.prototype.AddCode = function(keys, fn, metadata) {
  this.eggs.push({keys: keys, fn: fn, metadata: metadata});

  return this;
}

Egg.prototype.AddHook = function(fn) {
  this.hooks.push(fn);

  return this;
}

Egg.prototype.Listen = function() {
  if(window.addEventListener) {
    window.addEventListener("keydown", function(e) {
      this.kps.push(e.keyCode);

      this.eggs.forEach(function(v, i, a) {
        if(this.kps.toString().indexOf(this.eggs[i].keys) >= 0) {
          // Call the fired egg function
          this.activeEgg = this.eggs[i];
          this.eggs[i].fn();

          // Call the hooks
          this.hooks.forEach(function(hook, i, a) {
            hook.call(this);
          }.bind(this));

          // Reset
          this.kps = [];
          this.activeEgg = '';
        }
      }.bind(this));
    }.bind(this));
  }
}

// Example:
// var egg = new Egg();
// egg.AddCode("38,38,40,40,37,39,37,39,66,65", function() {
//   alert("Konami!");
// }, "konami-code");
// egg.AddHook(function(){
//   console.log("Hook called for: " + this.activeEgg.keys);
//   console.log(this.activeEgg.metadata);
// });
// egg.Listen();