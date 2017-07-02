/**
 * Type declaration required to allow imports of .vue files in TypeScript source code.
 */
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
