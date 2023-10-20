// 组件使用vue3
import  * as Vue3 from 'vue3'
import { Vue3InVue2 } from './vue3-in-vue2'

const tableComp = {
  name: 'test-table',
  props: {
    rows: {
      type: Array,
      default: () => []
    },
    selected: String
  },
  setup(props, { emit }) {
    const h = Vue3.h

    const render = () => {
      const trs = props.rows.map(item => {
        const foo = h('a', {
          'data-action': 'select',
          'data-id': item.id,
        }, ['item.label'])

        const bar = h('a', {}, [
          h(
            'span',
            {
              class: 'glyphicon glyphicon-remove',
              'aria-hidden': "true",
              'data-action': 'remove',
              'data-id': item.id,
            },
          )
        ])
        return h(
          'tr',
          {
            key: item.id,
            class: item.id === props.selected ? 'danger' : '',
          },
          [
            h('td', { class: 'col-md-1' }, `${item.id}`),
            h('td', { class: 'col-md-4' }, [foo]),
            h('td', { class: 'col-md-1' }, [bar]),
            h('td', { class: 'col-md-6' }),
          ]
        )
      })

      return h(
        'table',
        {
          class: 'table table-hover table-striped test-data',
          onClick(event) {
            emit('click', event)
          }
        },
        [
          h(
            'tbody',
            {},
            trs
          )
        ]
      )
    }

    return render
  }
}

export default Vue3InVue2(tableComp, Vue3)