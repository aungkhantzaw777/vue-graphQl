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
      <el-container class="main px-3 py-4">
        <div class="d-flex flex-row align-items-center">
          <i class="el-icon-back primary-text back-icon"></i>
          <span class="ml-3 employee-directory-heading"
            >Employee Directory</span
          >
          <div class="action-icons">
            <i class="el-icon-search"></i>
            <i class="el-icon-edit"></i>
          </div>
        </div>
        <div>
          <el-table
            class="employee-table"
            :data="tableData"
            style="width: 100%"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              fixed
              prop="Employees"
              label="Employees"
              width="150"
            >
            </el-table-column>
            <el-table-column prop="Location" label="Location" width="120">
            </el-table-column>
            <el-table-column prop="Email" label="Email" width="120">
            </el-table-column>
            <el-table-column prop="Phone" label="Phone" width="120">
            </el-table-column>
            <el-table-column label="Department" width="150">
              <template slot-scope="scope">
                <span
                  v-show="selectedDeaprtment.id !== scope.row.id"
                  @click="changeDepartment(scope.row.id)"
                  >{{ scope.row.Department }}</span
                >
                <el-select
                  v-show="selectedDeaprtment.id === scope.row.id"
                  v-model="scope.row.Department"
                  @blur="escSelect"
                  @change="selectedDeaprtment.id = ''"
                  filterable
                  placeholder="Select"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="EmployeeCode"
              label="Employee Code"
              width="150"
            >
            </el-table-column>
            <el-table-column prop="CustomTags" label="Custom Tags" width="120">
            </el-table-column>
            <el-table-column prop="Positions" label="Positions" width="120">
            </el-table-column>
            <el-table-column prop="NRC" label="NRC" width="120">
            </el-table-column>
            <el-table-column prop="Manager" label="Manager" width="120">
            </el-table-column>
            <el-table-column
              prop="ManagerPosition"
              label="Manager Position"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="JoinnedDate"
              label="Joinned Date"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="TerminateDate"
              label="Terminate Date"
              width="150"
            >
            </el-table-column>
          </el-table>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import db from "../static/db.json";

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
      multipleSelection: [],
      counter: 0,
      options: [
        {
          value: "Quality assurance engineering YGN Department",
          label: "Quality assurance engineering YGN Department",
        },
        {
          value: "Development",
          label: "Development",
        },
        {
          value: "product",
          label: "product",
        },
        {
          value: "Customer success",
          label: "Customer success",
        },
        {
          value: "Marketing Myanmar department",
          label: "Marketing Myanmar department",
        },
        {
          value: "Marketing Srilanka department",
          label: "Marketing Srilanka department",
        },
        {
          value: "Human resource managing department",
          label: "Human resource managing department",
        },
      ],
      selectedDeaprtment: {
        id: "",
      },
    };
  },
  components: {
    Sidebar,
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    changeDepartment(id) {
      this.counter++;

      if (this.counter == 1) {
        this.timer = setTimeout(() => {
          this.counter = 0;
          // alert('double click'+id)
          // window.location.href = 'p/'+ postId;
        }, 300);

        return;
      }

      clearTimeout(this.timer);
      // alert('this is real click'+id)
      this.selectedDeaprtment.id = id;
      this.counter = 0;
    },
    escSelect() {
      this.selectedDeaprtment.id = "";
    },
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
.back-icon {
  font-size: 25px;
  font-weight: 900;
  margin-right: 10px;
  cursor: pointer;
}
.employee-directory-heading {
  font-size: 24px;
}
.action-icons {
  margin-left: 10px;
}
.action-icons > i {
  font-weight: 900;
}
</style>