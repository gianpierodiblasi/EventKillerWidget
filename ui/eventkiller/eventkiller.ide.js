/* global TW */
TW.IDE.Widgets.eventkiller = function () {
  this.widgetIconUrl = function () {
    return '../Common/extensions/EventKillerWidget/ui/eventkiller/gun.png';
  };

  this.widgetProperties = function () {
    return {
      'name': 'EventKiller',
      'description': 'Widget to "kill" events occurring within a certain interval (temporal or numerical)',
      'category': ['Common'],
      'iconImage': 'gun.png',
      'properties': {
        'Width': {
          'description': 'width',
          'defaultValue': 200
        },
        'Height': {
          'description': 'height',
          'defaultValue': 28
        },
        'killerMode': {
          'isBindingTarget': false,
          'description':
                  'Time = the "extermination" occurs on a temporal basis; ' +
                  'Time, keep the first alive = the "extermination" occurs on a temporal basis, but the first event is preserved; ' +
                  'Time, wait for = the "extermination" occurs on a temporal basis, after receiving the first event the widget waits for a time interval and then sends the event, during the time interval all events are killed; ' +
                  'Count = the "extermination" occurs on a numerical basis; ' +
                  'Count, keep the first alive = the "extermination" occurs on a numerical basis, but the first event is preserved; ' +
                  'Count, wait for = the "extermination" occurs on a numerical basis, after receiving the first event the widget waits for a count interval and then sends the event, during the count interval all events are killed',
          'baseType': 'STRING',
          'defaultValue': 'timeKeep',
          'selectOptions': [
            {value: 'time', text: 'Time'},
            {value: 'timeKeep', text: 'Time, keep the first alive'},
            {value: 'timeWait', text: 'Time, wait for'},
            {value: 'count', text: 'Count'},
            {value: 'countKeep', text: 'Count, keep the first alive'},
            {value: 'countWait', text: 'Count, wait for'}
          ]
        },
        'killerInterval': {
          'description': 'The time interval (in milliseconds) within which to "kill" the events',
          'defaultValue': 1000,
          'baseType': 'INTEGER',
          'isEditable': true
        },
        'killerCount': {
          'description': 'The number of events to "kill"',
          'defaultValue': 5,
          'baseType': 'INTEGER',
          'isEditable': true,
          'isVisible': false
        },
        'numberOfEvents': {
          'description': 'The number of events',
          'baseType': 'INTEGER',
          'defaultValue': 5
        },
        'oneShot': {
          'description': 'true if the "extermination" must take place only once (it will apply in both killerMode options)',
          'defaultValue': false,
          'baseType': 'BOOLEAN',
          'isEditable': true
        },
        'debugMode': {
          'isVisible': true,
          'baseType': 'BOOLEAN',
          'isEditable': true,
          'defaultValue': false,
          'description': 'true to activate the debug'
        }
      }
    };
  };

  this.widgetEvents = function () {
    return {
      'Triggered': {}
    };
  };

  this.renderHtml = function () {
    return '<div class="widget-content widget-eventkiller">' + '<span class="eventkiller-property">Event Killer</span>' + '</div>';
  };

  this.afterRender = function () {
    this.addNewEventParameters(this.getProperty('numberOfEvents'));
    this.setKillerMode(this.getProperty('killerMode'));
  };

  this.afterSetProperty = function (name, value) {
    if (name === 'numberOfEvents') {
      this.deleteOldEventParameters();
      this.addNewEventParameters(value);
    } else if (name === 'killerMode') {
      this.setKillerMode(value);
    }

    return false;
  };

  this.deleteOldEventParameters = function () {
    var properties = this.allWidgetProperties().properties;

    for (var key in properties) {
      if (key.toLowerCase().startsWith("event")) {
        delete properties[key];
      }
    }
  };

  this.addNewEventParameters = function (numberOfEvents) {
    var properties = this.allWidgetProperties().properties;

    for (var eventN = 1; eventN <= numberOfEvents; eventN++) {
      properties['Event' + eventN] = {
        name: "Event" + eventN,
        type: "service",
        description: 'Service to call for event N. ' + eventN,
        isVisible: true
      };
    }

    this.updatedProperties({
      updateUI: true
    });
  };

  this.setKillerMode = function (killerMode) {
    var properties = this.allWidgetProperties().properties;
    properties["killerInterval"].isVisible = killerMode.startsWith("time");
    properties["killerCount"].isVisible = killerMode.startsWith("count");

    this.updatedProperties({
      updateUI: true
    });
  };
};