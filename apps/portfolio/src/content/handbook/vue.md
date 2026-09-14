# Vue

Vue applications are created with `createApp` in Vue 3 and mounted to a DOM container. Vue 2's `new Vue(...)` syntax remains relevant only when maintaining Vue 2 applications.

## Component lifecycle

Options API lifecycle hooks include `beforeCreate`, `created`, `beforeMount`, `mounted`, `beforeUpdate`, `updated`, `beforeUnmount`, `unmounted`, and `errorCaptured`. Vue 2 used `beforeDestroy` and `destroyed` for teardown. Composition API equivalents such as `onMounted` and `onUnmounted` make lifecycle work explicit inside `setup` logic.

Mixins and `extends` exist in both major versions, but can make property origins and conflicts difficult to trace. Vue 3 composables are usually the clearer reuse mechanism.

## Security and integration

Never compile non-trusted content as a Vue template. Escape or sanitize untrusted HTML with a well-reviewed boundary, and validate all data on the server. Coordinate with backend services on authentication, authorization, CSRF protection, API errors, and retry behavior rather than assuming frontend checks provide security.

Vue 3's Composition API and built-in `Teleport` support modular logic and rendering outside a component's DOM subtree. Choose patterns based on maintainability rather than version novelty.

Further reading: [Vue Guide](https://vuejs.org/guide/introduction.html), [lifecycle hooks](https://vuejs.org/guide/essentials/lifecycle.html), and [security guidance](https://vuejs.org/guide/best-practices/security.html).
