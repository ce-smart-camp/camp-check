<template>
  <v-card-text>
    <div class="my-3">
      <p>
        10. IoT(Internet of Things) ที่เริ่มได้ยินกันติดหูกันในปัจจุบันนั้นก็คือ
        การที่อุปกรณ์อิเล็กทรอนิกส์อะไรก็ตามนั้นสามารถเชื่อมโยงสู่โลกอินเตอร์เน็ตได้
        และแนวโน้มที่กำลังจะมาแรงเกี่ยวกับ IoT ในอนาคตอันใกล้นี้ก็คือ “Smart
        Home” พี่ๆจึงอยากให้น้องๆคิดโปรเจคขึ้นมาโปรเจคนึงที่เกี่ยวกับ “Smart
        Home” โดยโปรเจคนั้นจะต้องสามารถทำได้จริง
        อธิบายรายละเอียดเกี่ยวกับโปรเจคนั้นคร่าวๆ และตอบคำถามเหล่านี้ได้
      </p>
    </div>
    <v-textarea
      v-model="form.item1"
      rows="5"
      label="อธิบายรายละเอียดเกี่ยวกับโปรเจค"
      box
      :readonly="readonly"
      :disabled="disable && !readonly"
    />
    <v-textarea
      v-model="form.item2"
      rows="5"
      label="ทำไมน้องๆถึงเลือกทำโปรเจคนี้ขึ้นมา"
      box
      :readonly="readonly"
      :disabled="disable && !readonly"
    />
    <v-textarea
      v-model="form.item3"
      rows="5"
      label="ของที่ใช้ในการทำโปรเจคมีอะไรบ้าง"
      box
      :readonly="readonly"
      :disabled="disable && !readonly"
    />
    <v-textarea
      v-model="form.item4"
      rows="5"
      label="โปรเจคที่คิดออกมาใครสามารถนำไปใช้ได้บ้าง อย่างไร"
      box
      :readonly="readonly"
      :disabled="disable && !readonly"
    />
    <v-textarea
      v-model="form.item5"
      rows="5"
      label="สามารถนำไปต่อยอดได้อย่าง"
      box
      :readonly="readonly"
      :disabled="disable && !readonly"
    />

    <div class="my-3">
      <p>
        11) EXTRA ข้อไหนที่น้องๆคิดว่ายากสุด ไม่อยากทำ
      </p>
    </div>
    <v-textarea
      v-model="form.item9"
      class="nolabel"
      rows="8"
      box
      single-line
      :readonly="readonly"
      :disabled="disable && !readonly"
    />
  </v-card-text>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: function() {
        return {};
      }
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    form: {
      item1: null,
      item2: null,
      item3: null,
      item4: null,
      item5: null,
      item9: null
    }
  }),
  watch: {
    form: {
      handler(val) {
        this.$emit("input", val);
      },
      deep: true
    },
    value: {
      handler(val) {
        this.form = val;
      },
      deep: true
    }
  },
  mounted: function() {
    if (this.value !== null) {
      Object.keys(this.form).forEach(key => {
        this.form[key] = this.value[key] || null;
      });
    }
    this.$emit("input", this.form);
  }
};
</script>
