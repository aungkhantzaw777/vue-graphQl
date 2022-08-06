<template>
  <div>
    <el-container>
      <el-aside class="side-menu">
        <sidebar />
        <div class="secondary-menu">
          <div class="w-full">
            <h3 class="header">Employees</h3>
          </div>

          <div v-for="(menu, i) in menuLists" :key="i" class="menu-list">
            <router-link
              :class="menu.label === 'Directory' ? 'active link' : 'link'"
              to="/"
              >{{ menu.label }}</router-link
            >
          </div>
        </div>
      </el-aside>
      <el-container class="main">
        <div>
          <i class="el-icon-back"></i>
          <h4>Employee Directory</h4>
        </div>
        <div>
          <el-table class="employee-table" :data="tableData" style="width: 100%" >
            <el-table-column fixed prop="Employees" label="Employees" width="150">
            </el-table-column>
            <el-table-column prop="Location" label="Location" width="120">
            </el-table-column>
            <el-table-column prop="Email" label="Email" width="120">
            </el-table-column>
            <el-table-column prop="Phone" label="Phone" width="120">
            </el-table-column>
            <el-table-column prop="Department" label="Department" width="300">
            </el-table-column>
            <el-table-column prop="EmployeeCode" label="Employee Code" width="120">
            </el-table-column>
            <el-table-column prop="CustomTags" label="Custom Tags" width="120">
            </el-table-column>
            <el-table-column prop="Positions" label="Positions" width="120">
            </el-table-column>
            <el-table-column prop="NRC" label="NRC" width="120">
            </el-table-column>
            <el-table-column prop="Manager" label="Manager" width="120">
            </el-table-column>
            <el-table-column prop="ManagerPosition" label="Manager Position" width="120">
            </el-table-column>
            <el-table-column prop="JoinnedDate" label="Joinned Date" width="120">
            </el-table-column>
            <el-table-column prop="TerminateDate" label="Terminate Date" width="120">
            </el-table-column>
          </el-table>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import db from "../static/db.json"

export default {
  name: "EmployeePage",
  data() {
    return {
      menuLists: [
        { label: "Directory" },
        { label: "Update Request" },
        { label: "Reporting Lines" },
        { label: "Departments structures" },
      ],
      tableData: db.employees,
    };
  },
  components: {
    Sidebar,
  },
};
</script>

<style scoped>
.header {
  font-weight: 400;
}
.menu-list {
  padding: 10px 0px;
  width: 100%;
}
.menu-list a {
  color: #7d7d7d;
  text-decoration: none;
}
.menu-list .active {
  color: #30e398 !important;
}
.main {
  flex-direction: column;
  background: #fff;
}
.employee-table {
  border-bottom: 0px;
}
</style>