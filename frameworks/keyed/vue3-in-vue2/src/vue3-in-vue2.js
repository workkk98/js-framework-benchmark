import { camelCase } from 'lodash-es'

export function Vue3InVue2(Vue3Component, Vue3) {
  return {
    name: 'unir',
    props: Vue3Component.props,
    mounted() {
      const { createApp, h } = Vue3
      const props = this.$props
      const attrs = this.$attrs
      const listeners = {}
      Object.keys(this.$listeners).forEach((key) => {
        listeners[camelCase('on' + key)] = this.$listeners[key]
      })
      this.__vmok_app = createApp({
        render() {
          return h(Vue3Component, {
            ...props,
            ...attrs,
            ...listeners
          })
        }
      })
      this.__vmok_app.mount(this.$el)
    },
    beforeDestroy() {
      this.__vmok_app.unmount()
    },
    render(h) {
      return h('div', {
        id: 'noah-ark'
      })
    }
  }
}
