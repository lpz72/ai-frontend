<template>
  <div id="userLoginPage">
    <h2 class="title">智能识别系统</h2>
  <a-form
    :model="formState"
    name="normal_login"
    class="login-form"
    @finish="handleSubmit"
  >
    <a-form-item
      label="账号"
      name="userAccount"
      :rules="[{ required: true, message: '请输入账号!' }]"
    >
      <a-input v-model:value="formState.userAccount">
      </a-input>
    </a-form-item>

    <a-form-item
      label="密码"
      name="userPassword"
      :rules="[{ required: true, message: '请输入密码!' }]"
    >
      <a-input-password v-model:value="formState.userPassword">
      </a-input-password>
    </a-form-item>

    <a-form-item>
      <a-form-item name="remember" no-style>
        <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
      </a-form-item>
      <a class="login-form-forgot" href="">忘记密码</a>
    </a-form-item>

    <a-form-item>
      <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
        登 录
      </a-button>
      <a href="/user/register">立即注册!</a>
    </a-form-item>
  </a-form>
  </div>
<!--  <div id="userLoginPage">-->
<!--  <h2 class="title">用户中心</h2>-->
<!--  <a-form-->
<!--    style="max-width: 480px; margin: 0 auto"-->
<!--    label-align="left"-->
<!--    :model="formState"-->
<!--    name="basic"-->
<!--    :label-col="{ span: 4 }"-->
<!--    :wrapper-col="{ span: 20 }"-->
<!--    autocomplete="off"-->
<!--    @finish="handleSubmit"-->
<!--  >-->
<!--    <a-form-item-->
<!--      label="账号"-->
<!--      name="userAccount"-->
<!--      :rules="[{ required: true, message: '请输入账号' }]"-->
<!--    >-->
<!--      <a-input-->
<!--        v-model:value="formState.userAccount"-->
<!--        placeholder="请输入账号"-->
<!--      />-->
<!--    </a-form-item>-->

<!--    <a-form-item-->
<!--      label="密码"-->
<!--      name="userPassword"-->
<!--      :rules="[-->
<!--          { required: true, message: '请输入密码' },-->
<!--          { min: 8, message: '密码不能少于8位' },-->
<!--        ]"-->
<!--    >-->
<!--      <a-input-password-->
<!--        v-model:value="formState.userPassword"-->
<!--        placeholder="请输入密码"-->
<!--      />-->
<!--    </a-form-item>-->

<!--    <a-form-item>-->
<!--      <a-form-item name="remember" no-style>-->
<!--        <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>-->
<!--      </a-form-item>-->
<!--      <a class="login-form-forgot" href="">Forgot password</a>-->
<!--    </a-form-item>-->

<!--    <a-form-item>-->
<!--      <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">-->
<!--        Log in-->
<!--      </a-button>-->
<!--      Or-->
<!--      <a href="">register now!</a>-->
<!--    </a-form-item>-->
<!--  </a-form>-->
<!--  </div>-->
<!--  <div id="userLoginPage">-->
<!--    <h2 class="title">用户中心</h2>-->
<!--    <a-form-->
<!--      style="max-width: 480px; margin: 0 auto"-->
<!--      label-align="left"-->
<!--      :model="formState"-->
<!--      name="basic"-->
<!--      :label-col="{ span: 4 }"-->
<!--      :wrapper-col="{ span: 20 }"-->
<!--      autocomplete="off"-->
<!--      @finish="handleSubmit"-->
<!--    >-->
<!--      <a-form-item-->
<!--        label="账号"-->
<!--        name="userAccount"-->
<!--        :rules="[{ required: true, message: '请输入账号' }]"-->
<!--      >-->
<!--        <a-input-->
<!--          v-model:value="formState.userAccount"-->
<!--          placeholder="请输入账号"-->
<!--        />-->
<!--      </a-form-item>-->

<!--      <a-form-item-->
<!--        label="密码"-->
<!--        name="userPassword"-->
<!--        :rules="[-->
<!--          { required: true, message: '请输入密码' },-->
<!--          { min: 8, message: '密码不能少于8位' },-->
<!--        ]"-->
<!--      >-->
<!--        <a-input-password-->
<!--          v-model:value="formState.userPassword"-->
<!--          placeholder="请输入密码"-->
<!--        />-->
<!--      </a-form-item>-->
<!--      <a-form-item :wrapper-col="{ offset: 4, span: 20 }">-->
<!--        <a-button type="primary" html-type="submit">登录</a-button>-->
<!--      </a-form-item>-->
<!--    </a-form>-->
<!--  </div>-->
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import myAxios from "@/plugins/myAxios";

const router = useRouter();

interface FormState {
  userAccount: string;
  userPassword: string;
}

/**
 * 表单信息，字段名需要与后端定义的字段名相同
 */
const formState = reactive<FormState>({
  userAccount: "",
  userPassword: "",
  remember: true,
});
/**
 * 提交表单
 */
const handleSubmit = async () => {
  const res = await myAxios.post('/user/login',formState);
  //登录成功，跳转到主页
  if (res.code === 0 && res.data) {
    message.success("登录成功");
    window.location.href = "/nlp";
    // await router.push({
    //   path: "/nlp",
    //   replace: true, //跳转到新页面后，返回不到原来的页面
    // });
  } else {
    message.error("登录失败");
  }
};
</script>

<style scoped>

#userLoginPage {

  display: flex;
  flex-direction: column; /* 垂直排列子元素 */
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
  margin-top: 50px;
}


#userLoginPage .title {

  margin-bottom: 16px;
}

#userLoginPage .login-form {
  max-width: 300px;
}
#userLoginPage .login-form-forgot {
  float: right;
}
#userLoginPage .login-form-button {
  width: 100%;
}
</style>
