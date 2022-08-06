<template>
  <div>
    <sidebar />
    <!-- <el-button>Click Me</el-button> -->
    <!-- <el-radio v-model="radio" label="1">Option A</el-radio> -->
    <!-- <el-radio v-model="radio" label="2">Option B</el-radio> -->
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue"

export default {
  name: "EmployeePage",
  components: {
    Sidebar
  }
};
</script>

<style>
</style>