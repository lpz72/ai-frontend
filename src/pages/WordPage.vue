<template>
  <a-upload-dragger
    style="margin-bottom: 10px"
    v-model:fileList="fileList"
    name="file"
    :multiple="true"
    action="http://localhost:8080/api/word"
    :withCredentials="true"
    @change="handleChange"
    @drop="handleDrop"
  >
    <p class="ant-upload-drag-icon">
      <inbox-outlined></inbox-outlined>
    </p>
    <p class="ant-upload-text">点击或拖动文件到此区域上传</p>
  </a-upload-dragger>
  <a-textarea v-model:value="output" :rows="4" placeholder="识别结果" :maxlength="6" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { InboxOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import type { UploadChangeParam } from 'ant-design-vue';
import myAxios from "@/plugins/myAxios";

const output = ref();

const fileList = ref([]);
const handleChange = async (info: UploadChangeParam) => {
  const status = info.file.status;
  if (status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (status === 'done') {
    if (info.file.response.code === 0) {
      message.success(`${info.file.name} 文件上传成功.`);
      output.value = info.file.response.data;
    } else {
      message.error( info.file.response.message );
    }

  } else if (status === 'error') {
    message.error(`${info.file.name} 文件上传失败.`);
  }
};
function handleDrop(e: DragEvent) {
  console.log(e);
}


</script>



<style scoped>

</style>