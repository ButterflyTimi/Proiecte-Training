(function (global) {
    global.myModule = global.myModule || {};
    var namespace = global.myModule;
    if(typeof(jQuery) === "undefined") {
        throw new Error("We don't have (jQuery)");
    }

namespace.nextButton = function (formOne , formTwo) {
    	$(formOne).animate ({
      						"left":"0%",
      						"opacity":"0"}, "slow");
		$(formTwo).animate ({
							"left" : "35%",
							"opacity" : "1"}, "slow");
    	};
namespace.previousButton = function (formOne , formTwo) {
		$(formOne).animate ({
							"left" : "70%",
							"opacity" : "0"}, "slow");
    	$(formTwo).animate ({
							"left":"35%",
      						"opacity":"1"}, "slow");
    	};
namespace.WizardElement = function(elementIndex , htmlElement , nextButton , previousButton) {
	this.elementIndex = elementIndex;
	this.element = htmlElement;
	this.nextButton = nextButton;
	this.previousButton = previousButton;
	};
namespace.addClickNextEvent = function (currNext , currElement , nextElement) {
	$(currNext).click (function() {
    	namespace.nextButton ( currElement , nextElement);	
    	});
	};
namespace.addClickPreviousEvent = function (currPrevious , currElement , previousElement) {
	$(currPrevious).click (function() {
    	namespace.previousButton (currElement , previousElement);	
    	});
	};
(function($) {
	var wrapperId=undefined;
   	$.fn.wizard = function() {
    	var wrapper = this;
    	wrapperId = $(this).attr("id");
		var index=0;
		var wizardElementArray = [];
    	$("#"+wrapperId+" div").each (function() {
    	 	wizardElementArray[index] = new namespace.WizardElement(index , this , $(this).children(".next")[0] , $(this).children(".previous")[0]);
    	 	index++;
    		})
    	$(wizardElementArray[0].element).css ({'left' : '35%',
    										   'opacity' : '1'});
    	for (var i = 0 ; i < wizardElementArray.length ; i++) {
    		if (i < wizardElementArray.length-1) {
    			var currElement = wizardElementArray[i].element;
    			var nextElement = wizardElementArray[i+1].element;
    			var currNext = wizardElementArray[i].nextButton;
    			namespace.addClickNextEvent(currNext , currElement , nextElement);
    			}
			}
		for (var i = 1; i < wizardElementArray.length ; i++) {
			if(i < wizardElementArray.length) {
    			var currElement = wizardElementArray[i].element;
    			var previousElement = wizardElementArray[i-1].element;
    			var currPrevious = wizardElementArray[i].previousButton;
    			namespace.addClickPreviousEvent(currPrevious , currElement , previousElement);
    			}
			}
		}
	})($);
}(window));