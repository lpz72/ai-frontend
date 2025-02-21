<template>
  <div id="basicLayout">
    <a-layout>
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <div>
          <router-view />
        </div>

      </a-layout-content>
<!--      <a-layout-footer class="footer">-->
<!--        <a href="https://github.com/lpz72" target="_blank"> github by lpz </a>-->
<!--      </a-layout-footer>-->
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
//测试代码
// import { getCurrentUser } from "@/api/user";
//
// getCurrentUser().then((res) => {
//   console.log(res);
// });
</script>

<style scoped>
#basicLayout .footer {
  background: #efefef;
  padding: 16px;
  position: fixed;
  text-align: center;
  bottom: 0;
  left: 0;
  right: 0;
}

#basicLayout .content {
  background: linear-gradient(to right, #fefefe, #fff);
  padding: 20px;

}

#basicLayout .header {
  background: white;
  padding-inline: 20px;
  margin-bottom: 16px;
  color: unset;
}
</style>
