<template>
  <el-menu
    :default-active="0"
    class="menu"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <div class="menu-wrap">
      <div>
        <div class="logo-wrap">
          <img src="@/assets/betterHR.png" class="logo" alt="logo" />
        </div>
        <div>
          <el-menu-item
            v-for="menu in menus"
            :key="menu.label"
            :index="menu.label"
          >
            <i :class="menu.icon"></i>
          </el-menu-item>
          <el-menu-item>
            <i class="el-icon-more primary-text"></i>
          </el-menu-item>
        </div>
      </div>
      <div class="flex-1 d-flex align-items-center menu-bottom">
        <el-menu-item>
          <i class="el-icon-document-checked"></i>
        </el-menu-item>
        <el-menu-item>
          <i class="el-icon-chat-square"></i>
        </el-menu-item>
        <div class="mb-2">
          <img class="avatar" src="https://i.pravatar.cc/300" alt="avatar" />
        </div>
      </div>
    </div>
  </el-menu>
</template>

<style>
.menu {
  background: #fcfcfc;
  display: flex;
}
.menu-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
}
.flex-1 {
  flex: 1;
}
.logo-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  /* flex-direction: column; */
  /* justify-content: end; */
}
.menu-bottom {
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-content: end;
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