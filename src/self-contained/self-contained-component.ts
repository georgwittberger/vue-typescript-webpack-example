import Vue from 'vue';
import Component from 'vue-class-component';

const NAME_REGEX = /^[A-Za-z\s]+$/;
const EMAIL_REGEX = /^\S+@\S+$/;

/**
 * The class definition of the self-contained component.
 */
@Component
export default class SelfContainedComponent extends Vue {
  /**
   * The fields 'name' and 'email' are data properties which can be accessed in the template and bound as model.
   */
  public name = '';
  public email = '';

  /**
   * The 'valid' property is a computed value and automatically retrieved again when data changes.
   */
  get valid(): boolean {
    return NAME_REGEX.test(this.name) && EMAIL_REGEX.test(this.email);
  }
}
