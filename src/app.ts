import Vue from 'vue';
import SelfContainedComponent from './self-contained/self-contained-component.vue';
import SimpleComponent from './simple/simple-component';

// Entry point for the application.

// Bind an instance of the simple component to the DOM element with id="simple-component".
new SimpleComponent({
  el: '#simple-component',
});

// Bind an instance of the self-contained component to the DOM element with id="self-contained".
new Vue({
  el: '#self-contained',
  render: (h) => h(SelfContainedComponent),
});
