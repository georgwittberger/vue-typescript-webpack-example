import Vue from 'vue';
import Component from 'vue-class-component';

/**
 * This component provides a computed property 'message' and an event handler method 'changeMessage'.
 * It does not define any element selector, so the app developer can decide how to bind the component to a DOM element
 * by passing { el: 'selector' } to the constructor. See /src/app.ts
 */
@Component
export default class SimpleComponent extends Vue {
  private messages: string[] = [
    'Hello my friend!', 'How are you today?', 'Nice to see you.',
  ];
  private messageIndex: number = 0;

  /**
   * The 'message' is a computed property. It is automatically retrieved again when data changes.
   */
  public get message(): string {
    return this.messages[this.messageIndex];
  }

  /**
   * This is a method which can be called as an event handler from the template (e.g. when a button is clicked).
   */
  public changeMessage(): void {
    this.messageIndex = this.messageIndex < 2 ? this.messageIndex + 1 : 0;
  }
}
