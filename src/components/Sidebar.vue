<template>
  
    <el-menu
      :default-active="0"
      class="menu"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
    <div class="logo-wrap">
      <img src="@/assets/betterHR.png" class="logo" alt="logo" />
    </div>
      <el-menu-item v-for="menu in menus" :key="menu.label" :index="menu.label">
        <i :class="menu.icon"></i>
      </el-menu-item>
    </el-menu>
  
</template>

<style>
.menu {
  height: 100vh;
  background: #FCFCFC;
}
.logo-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
}
.logo {
  height: 50px;
}
</style>

<script>
import db from "../static/db.json";

export default {
  name: "SidebarComponent",
  data() {
    return {
      isCollapse: true,
      menus: db.menus,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>