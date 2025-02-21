<template>
  <a-table :columns="columns" :data-source="data" bordered>
    <template #headerCell="{ column }">
<!--      <template v-if="column.key === 'Id'">-->
<!--        <span>-->
<!--          <smile-outlined />-->
<!--          Name-->
<!--        </span>-->
<!--      </template>-->
    </template>

    <template #bodyCell="{ column, record, index }">
      <template v-if="column.key === 'Id'">
          {{ index + 1 }}
      </template>
      <template v-if="column.key === 'content'">

          {{ record.content }}

      </template>
      <template v-else-if="column.key === 'type'">
        <span>
          <a-tag
            v-if="record.type === '文本纠错'"
            :key="record.type"
            color="green"
          >
            {{ record.type}}
          </a-tag>
          <a-tag
            v-if="record.type === '文字识别'"
            :key="record.type"
            color="geekblue"
          >
            {{ record.type}}
          </a-tag>
          <a-tag
            v-if="record.type === '图像识别'"
            :key="record.type"
            color="blue"
          >
            {{ record.type}}
          </a-tag>
        </span>
      </template>
      <template v-if="column.key === 'createTime'">
          {{ record.createTime }}
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
           <a-popconfirm
          title="是否确认删除？"
          ok-text="确认"
          cancel-text="取消"
          placement="left"
          @confirm="confirm(record.id)"
        >
         <a-button danger >删除</a-button>
      </a-popconfirm>
        </span>
      </template>
    </template>

  </a-table>
<!--  <a-pagination  v-model:current="current" :total="50" show-less-items />-->
</template>

<script setup lang="ts">


import { onMounted, ref } from "vue";
const current = ref(2);
import { message } from 'ant-design-vue';
import myAxios from "@/plugins/myAxios";
import { useRouter } from "vue-router";
import { ContentType } from "@/models/content";

const columns = [
  {
    title: '编号',
    // dataIndex: 'Id',
    key: 'Id',
  },
  {
    title: '内容',
    // dataIndex: 'type',
    key: 'content',
  },
  {
    title: '类别',
    key: 'type',
  },
  {
    title: '创建时间',
    key: 'createTime',
  },
  {
    title: '操作',
    key: 'action',
  },
];

// const data = [
//   {
//     id: 1,
//     content: '百度是家人工智能公司',
//     type: '文本纠错',
//     createTime: new Date(),
//   },
//   {
//     id: 1,
//     content: '百度是家人工智能公司',
//     type: '文字识别',
//     createTime: new Date(),
//   },
//   {
//     id: 1,
//     content: '百度是家人工智能公司',
//     type: '图像识别',
//     createTime: new Date(),
//   },
// ];
const data = ref([]);
const router = useRouter();

const confirm = async (id: number) => {
  // console.log(e);
  const res = await myAxios.post('/delete', {
    id: id,
  })
  if (res.code === 0 && res.data){
    message.success('删除成功');
    await load();
  } else {
    message.error(res.message);
  }

};

// const cancel = (e: MouseEvent) => {
//   console.log(e);
//   message.error('Click on No');
// };

onMounted( () => {
 load();
})

const load = async () => {
  const res = await myAxios.get('/list')
  if (res.code === 0 && res.data) {
    data.value = res.data;
  }

}

</script>



<style scoped>

</style>