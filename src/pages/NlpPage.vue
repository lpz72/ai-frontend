<template>
  <a-textarea v-model:value="input" placeholder="请输入语句" :rows="4" />
  <br />
  <br />
  <a-textarea v-model:value="output" :rows="4" placeholder="识别结果" :maxlength="6" />
  <a-button class="button" type="primary" @click="nlp">开始识别</a-button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import myAxios from "@/plugins/myAxios";
import { message } from "ant-design-vue";

const input = ref();
const output = ref();
const nlp = async () => {
  // console.log(input.value);
  const res = await myAxios.get('/nlp',{
    params:{
      text: input.value,
    }
  });
  if (res.code === 0 && res.data) {
    // console.log(res);
    output.value = res.data;
  } else {
    message.error(res.message);
  }
}

</script>



<style scoped>
.button {
  margin-top: 20px;
}
</style>