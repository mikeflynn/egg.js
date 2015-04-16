function Egg() {
  this.eggs = [];
  this.hooks = [];
  this.kps = [];
  this.activeEgg = '';
}

Egg.prototype.AddCode = function(keys, fn, metadata) {
  this.eggs.push({keys: keys, fn: fn, metadata: metadata});
}

Egg.prototype.AddHook = function(fn) {
  this.hooks.push(fn);
}

Egg.prototype.Listen = function() {
  var $this = this;
  if(window.addEventListener) {
    window.addEventListener("keydown", function(e) {
      $this.kps.push(e.keyCode);

      for(i in $this.eggs) {
        if($this.kps.toString().indexOf($this.eggs[i].keys) >= 0) {
          // Call the fired egg function
          $this.activeEgg = $this.eggs[i];
          $this.eggs[i].fn.call();

          // Call the hooks
          for(x in $this.hooks) {
            $this.hooks[x].call($this);
          }

          // Reset
          $this.kps = [];
          $this.activeEgg = '';
        }
      }
    });
  }
}
