// thatmikeflynn.com/egg.js/

function Egg(/* keySequence, fn, metadata */) {
  this.eggs = [];
  this.hooks = [];
  this.kps = [];
  this.activeEgg = '';
  // for now we'll just ignore the shift key to allow capital letters
  this.ignoredKeys = [16];

  if(arguments.length) {
    this.AddCode.apply(this, arguments);
  }
}

// attempt to call passed function bound to Egg object instance
Egg.prototype.__execute = function(fn) {
  return typeof fn === 'function' && fn.call(this);
}

// converts literal character values to keyCodes
Egg.prototype.__toCharCodes = function(keys) {
  var special = {
      "up": 38, "down": 40, "left": 37, "right": 39, "enter": 13, "space": 32, "ctrl": 7, "alt": 8, "tab": 9
    },
    specialKeys = Object.keys(special);

  if(typeof keys === 'string') {
    // make sure there isn't any whitespace
    keys = keys.split(',').map(function(key){
      return key.trim();
    });
  }

  var characterKeyCodes = keys.map(function(key) {
    // check if it's already a keycode
    if(Number.isInteger(parseInt(key, 10))) {
      return key;
    }

    // lookup in named key map
    if(specialKeys.indexOf(key) > -1) {
      return special[key];
    }
    // it's a letter, return the char code for it
    return (key).charCodeAt(0);
  });

  return characterKeyCodes.join(',');
}

// Keycode lookup: http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
Egg.prototype.AddCode = function(keys, fn, metadata) {
  this.eggs.push({keys: this.__toCharCodes(keys), fn: fn, metadata: metadata});

  return this;
}

Egg.prototype.AddHook = function(fn) {
  this.hooks.push(fn);

  return this;
}

Egg.prototype.Listen = function() {
  if(window.addEventListener) {
    window.addEventListener("keydown", function keydownHandler(e) {
      var keyCode = e.keyCode;
      // keydown defaults all letters to uppercase
      if(keyCode >= 65 && keyCode <= 90) {
        if(!e.shiftKey) {
          // convert to lower case letter
          keyCode = keyCode + 32;
        }
      }

      // make sure that it's not an ignored key (shift for one)
      if(this.ignoredKeys.indexOf(keyCode) === -1) {
        this.kps.push(keyCode);
      }

      this.eggs.forEach(function(currentEgg, i) {
        var foundEgg = this.kps.toString().indexOf(currentEgg.keys) >= 0;

        if(foundEgg) {
          // Reset keys; if more keypresses occur while the callback is executing, it could retrigger the match
          this.kps = [];
          // Set the activeEgg to this one
          this.activeEgg = currentEgg;
          // if callback is a function, call it
          this.__execute(currentEgg.fn, this);
          // Call the hooks
          this.hooks.forEach(this.__execute, this);
          
          this.activeEgg = '';
        }
      }, this);

    }.bind(this));
  }
}

// EGGSAMPLE
 var egg = new Egg();
 egg
   .AddCode("up,up,down,down,left,right,left,right,b,a", function() {
     alert("Konami!");
   }, "konami-code")
  .AddHook(function(){
     console.log("Hook called for: " + this.activeEgg.keys);
     console.log(this.activeEgg.metadata);
   }).Listen();