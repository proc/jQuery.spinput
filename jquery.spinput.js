// jQuery.spinput
// http://github.com/proc


(function() {
  $.fn.spinput = function(options) {

    var Spinput = function(element, options) {
      this.settings = {
        step: 1,
        max: null,
        min: null
      };
      $.extend(this.settings, options);
      this.element = $(element);
      this.initialize();
    };

    Spinput.prototype.initialize = function() {
      var that = this;

      this.element.on('keydown', function(event) {
        switch( event.which ) {
          case 38:
            that.increment();
            break;
          case 40:
            that.decrement();
            break;
        };
      });
    };

    Spinput.prototype.clean = function(val) {
      var cleaned_val = parseInt(this.element.val());
      return (isNaN(cleaned_val) ? 0 : cleaned_val);
    };

    Spinput.prototype.update = function(optype) {
      this.element.val(this.counter);
      this.element.trigger('spinput-update', {
        optype: optype
      });
    };

    Spinput.prototype.increment = function() {
      if(this.counter === this.settings.max) {
        return;
      }

      this.counter = this.clean(this.element.val()) + this.settings.step;

      if(this.settings.max && (this.counter >= this.settings.max)) {
        this.counter = this.settings.max
      }
      this.update('increment');
    };

    Spinput.prototype.decrement = function() {
      if(this.counter === this.settings.min) {
        return;
      }

      this.counter = this.clean(this.element.val()) - this.settings.step;

      if(this.settings.min && (this.counter <= this.settings.min)) {
        this.counter = this.settings.min
      }
      this.update('decrement');
    };

    var spinput = new Spinput(this, options);

    return this;
  }
})();
