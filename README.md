# EventKillerWidget
An extension to "kill" events.

**This Extension is provided as-is and without warranty or support. It is not part of the PTC product suite and there is no PTC support.**

## Description
This extension provides a widget to "kill" events occurring within a certain interval (temporal or numerical). Sometimes it is necessary to reject/kill some events occuring in a mashup. This widget provides an useful tool to perform this task. The widget has several logics to reject an event:
- Time = the "extermination" occurs on a temporal basis
- Time, keep the first alive = the "extermination" occurs on a temporal basis, but the first event is preserved
- Time, wait for = the "extermination" occurs on a temporal basis, after receiving the first event the widget waits for a time interval and then sends the event, during the time interval all events are killed
- Count = the "extermination" occurs on a numerical basis
- Count, keep the first alive = the "extermination" occurs on a numerical basis, but the first event is preserved
- Count, wait for = the "extermination" occurs on a numerical basis, after receiving the first event the widget waits for a count interval and then sends the event, during the count interval all events are killed

## Properties
- debugMode - BOOLEAN (default = false): if set to true it sends to the browser's JS console a set of information useful for debugging the widget
- killerMode - STRING (default = 'timeKeep'): the killer modes described above (options: time, timeKeep, timeWait, count, countKeep, countWait)
- killerInterval - INTEGER (default = 1000): The time interval (in milliseconds) within which to "kill" the events (for time-based killer modes)
- killerCount - INTEGER (default = 5): The number of events to "kill" (for count-based killer modes)
- numberOfEvents - INTEGER (default = 5): The number of events
- oneShot - BOOLEAN (default = false): true if the "extermination" must take place only once (it will apply in both killer mode options)

## Services
- Event1, ..., Event\<numberOfEvents\>: dynamic services to call for events

## Events
- Triggered: event to notify a triggering
  
## Donate
If you would like to support the development of this and/or other extensions, consider making a [donation](https://www.paypal.com/donate/?business=HCDX9BAEYDF4C&no_recurring=0&currency_code=EUR).
