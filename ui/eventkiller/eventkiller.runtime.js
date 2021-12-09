/* global TW */
TW.Runtime.Widgets.eventkiller = function () {
  var thisWidget = this;
  var killingByTime = false;
  var killingByCount = 0;
  var firstShotDone = false;

  this.runtimeProperties = function () {
    return {
      'needsDataLoadingAndError': false
    };
  };

  this.renderHtml = function () {
    var html = '';
    html = '<div class="widget-content widget-eventkiller" style="display:none;"></div>';
    return html;
  };

  this.afterRender = function () {
  };

  this.serviceInvoked = function (serviceName) {
    var debugMode = thisWidget.getProperty('debugMode');
    var killerMode = thisWidget.getProperty('killerMode');
    var killerInterval = thisWidget.getProperty('killerInterval');
    var killerCount = thisWidget.getProperty('killerCount');
    var oneShot = thisWidget.getProperty('oneShot');

    if (debugMode) {
      console.log("EventKiller -> Start");
      console.log("EventKiller -> serviceName = " + serviceName + ", killerMode = " + killerMode + ", oneShot = " + oneShot);
    }

    if (oneShot && firstShotDone) {
      if (debugMode) {
        console.log("EventKiller -> firstShotDone");
      }

      this.jqElement.triggerHandler('Triggered');
    } else {
      if (killerMode.startsWith("time")) {
        this.manageTime(killerMode, killerInterval, serviceName, debugMode);
      } else {
        this.manageCount(killerMode, killerCount, serviceName, debugMode);
      }
    }

    if (debugMode) {
      console.log("EventKiller -> Stop");
    }
  };

  this.manageTime = function (killerMode, killerInterval, serviceName, debugMode) {
    if (debugMode) {
      console.log("EventKiller -> killerInterval = " + killerInterval + ", killingByTime = " + killingByTime);
    }

    if (!killingByTime) {
      if (debugMode) {
        console.log("EventKiller -> killingByTime ON");
      }

      killingByTime = true;
      switch (killerMode) {
        case "timeKeep":
          this.jqElement.triggerHandler('Triggered');
          break;
        case "timeWait":
          if (debugMode) {
            console.log("EventKiller -> serviceName = " + serviceName + " postponed");
          }
          break;
        case "time":
          if (debugMode) {
            console.log("EventKiller -> serviceName = " + serviceName + " killed");
          }
          break;
      }

      setTimeout(function () {
        if (killerMode === "timeWait") {
          thisWidget.jqElement.triggerHandler('Triggered');
        }

        if (debugMode) {
          console.log("EventKiller -> killingByTime OFF");
        }
        killingByTime = false;
        firstShotDone = true;
      }, killerInterval);
    } else if (debugMode) {
      console.log("EventKiller -> serviceName = " + serviceName + " killed");
    }
  };

  this.manageCount = function (killerMode, killerCount, serviceName, debugMode) {
    if (debugMode) {
      console.log("EventKiller -> killerCount = " + killerCount + ", killingByCount = " + killingByCount);
    }

    if (killingByCount === 0) {
      if (debugMode) {
        console.log("EventKiller -> killingByCount ON");
      }

      switch (killerMode) {
        case "countKeep":
          this.jqElement.triggerHandler('Triggered');
          break;
        case "countWait":
          if (debugMode) {
            console.log("EventKiller -> serviceName = " + serviceName + " postponed");
          }
          break;
        case "count":
          if (debugMode) {
            console.log("EventKiller -> serviceName = " + serviceName + " killed");
          }
          break;
      }
    } else if (debugMode) {
      console.log("EventKiller -> serviceName = " + serviceName + " killed");
    }

    killingByCount++;
    if (killingByCount === killerCount) {
      if (killerMode === "countWait") {
        this.jqElement.triggerHandler('Triggered');
      }

      if (debugMode) {
        console.log("EventKiller -> killingByCount OFF");
      }
      killingByCount = 0;
      firstShotDone = true;
    }
  };
};