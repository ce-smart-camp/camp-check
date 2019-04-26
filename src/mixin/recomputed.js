// Credis: https://codepen.io/sirlancelot/pen/JBeXeV?editors=1010
// Use
//      vm.$recompute('key')

import Vue from "vue";

Vue.mixin({
  data: () => ({
    _recomputed: Object.create(null)
  }),
  created() {
    const watchers = this._computedWatchers;

    if (!watchers) return;

    this.$recompute = key => {
      const { _recomputed } = this.$data;
      this.$set(_recomputed, key, !_recomputed[key]);
    };

    for (const key in watchers) {
      const watcher = watchers[key];
      watcher.getter = createRecomputable(key, watcher.getter);
    }
  }
});

function createRecomputable(key, original) {
  return vm => (vm.$data._recomputed[key], original.call(vm, vm));
}
