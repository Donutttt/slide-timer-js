(function($) {

    var SlideTimer = function(options) {
        var self = this;

        self.id = String(Math.floor((Math.random() * 1000))) + String(new Date().getMilliseconds());

        //TODO: refactor a few of these to options
        self.tickAmount = options.tickAmount || 1000;

        self.element = options.element || $(document);
        self.innerElement = null;

        self.innerHeight = options.innerHeight || 10;

        self.duration = options.duration || 0;

        self.endCb = options.endCb || function(){};
        self.tickCb = options.tickCb || function(){};

        self.currentVal = 0;

        self.tick = function(){
            self.currentVal += self.tickAmount;

            if (self.currentVal >= self.duration){
                self.endCb();
            } else {
                var topDistance = ((self.currentVal / self.duration) * (100-self.innerHeight));
                self.innerElement.css('top', String(topDistance) + '%');
                self.tickCb(self.currentVal);
                self.initTick();
            }
        };

        self.initTick = function(){
            setTimeout(self.tick, self.tickAmount);
        };

        self.init = function(){
            $(self.element).append(
              '<div class="timer-inner" id="timer-inner' + self.id + '"' + '></div>'
            );

            self.innerElement = $('#timer-inner' + self.id);

            $(self.innerElement).css('height', self.innerHeight + '%');

            self.initTick();
        };

        self.init();
    };

    var timerTest = new SlideTimer({
        element: $('#timer-wrapper'),
        innerHeight: 50,
        duration: 10000,
        tickAmount: 100,
        endCb: function() {
            console.log("timer is now finished");
        },
        tickCb: function(currentTime) {
            console.log("current time is: " + currentTime);
        }
    });

}(jQuery));
