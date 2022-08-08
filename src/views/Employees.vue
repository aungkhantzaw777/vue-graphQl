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
        <div class="d-flex justify-content-between">
          <div class="d-flex flex-row align-items-center">
            <i class="el-icon-back primary-text back-icon"></i>
            <span class="ml-3 employee-directory-heading"
              >Employee Directory</span
            >
            <div class="action-icons">
              <FilterIcon class="a-icon" style="height: 24px" />
              <SearchIcon class="a-icon " style="height: 24px;" />
              <EditIcon v-show="multipleSelection.length > 0" class="a-icon pl-3 left-border" style="height: 24px;padding-left:5px" />
            </div>
          </div>
          <div>
            <el-button type="primary">Create Employee</el-button>
            <ThreeDot class="a-icon" style="height:24px" />
          </div>
        </div>
        <div>
          <div v-if="$apollo.loading">Loading...</div>

          <el-table
            class="employee-table"
            :data="employees"
            ref="employeeTable"
            @selection-change="handleSelectionChange"
            :row-class-name="tableRowClassName"
            v-else
            style="width: 100%"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column fixed label="Employees" width="200">
              <!-- prop="Employees" -->
              <template slot-scope="scope">
                <img
                  class="sub-avatar mr-2"
                  :src="`https://source.unsplash.com/random/200x200?sig=${scope.row.id}`"
                  alt="avatar"
                /><span
                  class="pl-3 employee-text font-bold"
                  style="padding-left: 8px"
                  >{{ scope.row.Employees }}</span
                >
              </template>
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
                  v-model="selectedDeaprtment.val"
                  @blur="escSelect"
                  @change="(val) => handleDepartment(scope.row.id, val)"
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
          <div class="block d-flex justify-content-end mt-3">
            <el-pagination
              v-if="!$apollo.loading"
              background
              layout="total, sizes, prev, pager, next, jumper"
              :page-sizes="[50, 100, 300, 400]"
              :page-size="100"
              :total="100"
            >
            </el-pagination>
            
          </div>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import FilterIcon from "../components/icons/FilterIcon.vue";
import SearchIcon from "../components/icons/Search.vue";
import EditIcon from "../components/icons/Edit.vue";
import ThreeDot from "../components/icons/ThreeDot.vue";
import gql from "graphql-tag";

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
          value: "product dpt",
          label: "product dpt",
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
        val: "",
      },

      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      employeeData: null,
    };
  },
  apollo: {
    employees: {
      query: gql`
        query {
          employees {
            id
            Employees
            Email
            Department
            EmployeeCode
            Location
            CustomTags
            NRC
            JoinnedDate
            TerminateDate
            Positions
            Manager
            ManagerPosition
            Phone
          }
        }
      `,
      update: (data) => data.employees,
    },
  },

  components: {
    Sidebar,
    FilterIcon,
    EditIcon,
    SearchIcon,
    ThreeDot
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    changeDepartment(id) {
      this.counter++;

      if (this.counter == 1) {
        this.timer = setTimeout(() => {
          this.counter = 0;
        }, 300);

        return;
      }

      clearTimeout(this.timer);
      this.selectedDeaprtment.id = id;
      this.counter = 0;
    },
    escSelect() {
      this.selectedDeaprtment.id = "";
    },
    handleDepartment(id, val) {
      console.log(val);
      this.$apollo
        .mutate({
          mutation: gql`
            mutation updateEmployeeDepartment($id: ID!, $department: String!) {
              updateEmployeeDepartment(id: $id, department: $department) {
                id
                Department
              }
            }
          `,
          variables: {
            id: id,
            department: val,
          },
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error.message);
        });
      this.selectedDeaprtment.id = "";
    },
    handleSizeChange(val) {
      console.log(`${val} items per page`);
    },
    handleCurrentChange(val) {
      console.log(`current page: ${val}`);
    },
    tableRowClassName({ row, rowIndex }) {
      console.log(rowIndex)

      if (this.multipleSelection.find(v => parseInt(v.id) === parseInt(row.id))) {
        return "success-row";
      } 
      return "";
    },
  },
};
</script>

<style >
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
  border-radius: 10px;
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
  line-height: 24px;
}
.action-icons {
  margin-left: 10px;
}
.action-icons > i {
  font-weight: 700;
  font-size: 24px;
  color: grey;
}
.right-border {
  border-right: 1px solid #f2f2f2;
}
.left-border {
  border-left: 1px solid #f2f2f2;
}
.a-icon {
  margin-left: 10px;
  padding-right: 5px;
  color: #757575;
}
.el-pager li {
  border: 1px solid #f2f2f2;
}
.el-table .success-row {
    background: #f0f9eb !important;
}
</style>