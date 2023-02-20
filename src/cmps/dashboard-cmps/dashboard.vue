<template>
  <section class='range-datepicker'>
    12
    <div class="control_wrapper">
      <ejs-datetimepicker></ejs-datetimepicker>
    </div>

  </section>
</template>
<script>
import Datepicker from 'vue3-date-time-picker'
import 'vue3-date-time-picker/dist/main.css'
export default {
  name: 'range-datepicker',
  props: {},
  data() {
    return {
      date: null,
    }
  },
  created() { },
  computed: {},
  methods: {},
  components: {
    Datepicker
  }
}
</script>