# `Egg.js`

![Egg.js](http://thatmikeflynn.com/egg.js/eggjs.png)

Egg.js is a simple JS library that has no prerequisites and allows you to easily add web easter eggs by watching the user's key strokes.

### Example

It's really easy to use. Just include the egg.js file on the page...

```html
<script type="text/javascript" src="/path/to/egg.js"></script>
```

...then use the `addCode()` function to add in your easter eggs. You need to pass it the character sequence to trigger the easter egg callback (which can either be in plain English or Javascript key codes), a function to trigger when it happens, and an optional set of metadata. Metadata can be anything from a string to an object.

```js
var egg = new Egg();
egg
  .addCode("up,up,down,down,left,right,left,right,b,a", function() {
    jQuery('#egggif').fadeIn(500, function() {
      window.setTimeout(function() { jQuery('#egggif').hide(); }, 5000);
    }, "konami-code");
  })
  .addHook(function(){
    console.log("Hook called for: " + this.activeEgg.keys);
    console.log(this.activeEgg.metadata);
  })
  .listen();
```

You can also define the easter egg using the constructor:

```js
var egg = new Egg("up,up,down,down,left,right,left,right,b,a", function() {
  jQuery('#egggif').fadeIn(500, function() {
    window.setTimeout(function() { jQuery('#egggif').hide(); }, 5000);
  }, "konami-code");
}).listen();
```

You can also add a hook, as shown above using `addHook()`, that will run after any egg code is triggered. You could use it to fire a Google Analytics event or send out a tweet that someone finally found your easter egg. Hooks get access to the whole Egg.js object so you can pull information about the easter egg that fired via `this.activeEgg`

You can see a live example of this on `egg.js` [website](http://thatmikeflynn.com/egg.js/).


### Why?

I put an easter egg in pretty much everything I make and after copying the same basic code over and over again I figured I should make it in to a simple library for my own use.

### Credits

Created by Mike Flynn / [@thatmikeflynn](http://twitter.com/thatmikeflynn) and Rob McVey / [@negative_sleep](http://twitter.com/negative_sleep)
