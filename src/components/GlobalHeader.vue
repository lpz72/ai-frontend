<template>
  <div id="globalHeader">
    <a-row :wrap="false">
      <a-col flex="200px">
        <div class="title-bar">
          <img class="logo" src="../assets/images/logo1.png" alt="logo" />
          <div class="title">智能识别系统</div>
        </div>
      </a-col>
      <a-col flex="auto">
        <a-menu
          v-model:selectedKeys="current"
          mode="horizontal"
          :items="items"
          @click="doMenuClick"
        />
      </a-col>
      <a-col flex="150px">
        <div class="user-login-status">
          <div v-if="loginUser && loginUser.id">
            <a-dropdown>
              <a class="ant-dropdown-link">
                {{ loginUser.username ?? "无名" }}
                <DownOutlined />
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a @click="logout">退出登录</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>

          </div>
          <div v-else>
            <a-button type="primary" href="/user/login">登录/注册</a-button>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import { DownOutlined } from '@ant-design/icons-vue';
import { h, onMounted, ref } from "vue";
import { MenuProps, message } from "ant-design-vue";
import { useRoute, useRouter } from "vue-router";
import DeploymentUnitOutlined from "@ant-design/icons-vue/lib/icons/DeploymentUnitOutlined";
import FileImageOutlined from "@ant-design/icons-vue/lib/icons/FileImageOutlined";
import FileSearchOutlined from "@ant-design/icons-vue/lib/icons/FileSearchOutlined";
import HistoryOutlined from "@ant-design/icons-vue/lib/icons/HistoryOutlined";
import { getCurrentUser } from "@/services/user";
import { UserType } from "@/models/user";
import myAxios from "@/plugins/myAxios";

const loginUser = ref<UserType>();
onMounted(async () => {
    loginUser.value = await getCurrentUser();
    // console.log("111",loginUser.value);
})

/**
 * 退出登录
 */
const logout = async () => {
  const res = await myAxios.post('/user/logout');
  if (res.code === 0) {
    window.location.href = "/user/login";
    message.success("退出成功")
  }
}


const router = useRouter();
const doMenuClick = ({ key }: { key: string }) => {
  router.push({
    path: key,
  });
};
//当前选中的菜单
const current = ref<string[]>([]);
//监听路由变化，更新当期选中的菜单
router.afterEach((to, from, failure) => {
  current.value = [to.path];
});

const items = ref<MenuProps["items"]>([
  // {
  //   key: "/",
  //   icon: () => h(HomeOutlined),
  //   label: "主页",
  //   title: "主页",
  // },
  {
    key: "/nlp",
    label: "文本纠错",
    title: "文本纠错",
    icon: () => h(DeploymentUnitOutlined),
  },
  {
    key: "/word",
    label: "文字识别",
    title: "文字识别",
    icon: () => h(FileSearchOutlined),
  },
  {
    key: "/img",
    label: "图像识别",
    title: "图像识别",
    icon: () => h(FileImageOutlined),
  },
  {
    key: "/list",
    icon: () => h(HistoryOutlined),
    label: "历史记录",
    title: "历史记录",
  },
]);
</script>
<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: black;
  font-size: 18px;
  margin-right: 16px;
}

.logo {
  height: 50px;
}
</style>
