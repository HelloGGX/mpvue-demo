<template>

  <div
    class="vux-tab-item"
    :class="[currentSelected ? activeClass : '', {
      'vux-tab-selected': currentSelected,
      'vux-tab-disabled': disabled
    }]"
    @click="onItemClick">
    <slot></slot>

  </div>

</template>

<script>
import { childMixin } from '../mixins/multi-items'

export default {
  name: 'tab-item',
  mixins: [childMixin],
  data () {
    return {

    }
  },
  props: {
    activeClass: String,
    disabled: Boolean
  },
  computed: {

  }
}
</script>
