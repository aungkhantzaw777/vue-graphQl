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
              <SearchIcon class="a-icon right-border" style="height: 24px" />
              <EditIcon class="a-icon" style="height: 24px" />
            </div>
          </div>
          <div>
            <el-button type="primary">Create Employee</el-button>
          </div>
        </div>
        <div>
          <div v-if="$apollo.loading">Loading...</div>

          <el-table
            class="employee-table"
            :data="employees"
            v-else
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
                  v-model="selectedDeaprtment.val"
                  @blur="escSelect"
                  @change="val => handleDepartment(scope.row.id,val)"
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
            <!-- <el-pagination
              v-if="!$apollo.loading"
              class="paginate"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage2"
              :page-sizes="[50, 100, 300, 400]"
              :page-size="100"
              layout="sizes, prev, pager, next, jumper"
              :total="employees.paginatorInfo.total"
            >
            </el-pagination> -->
          </div>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import db from "../static/db.json";
import FilterIcon from "../components/icons/FilterIcon.vue";
import SearchIcon from "../components/icons/Search.vue";
import EditIcon from "../components/icons/Edit.vue";
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
        val:""
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
      update: (data) => data.employees
    },
  },

  components: {
    Sidebar,
    FilterIcon,
    EditIcon,
    SearchIcon,
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
      console.log(val)
      this.$apollo
        .mutate({
          mutation: gql`
           mutation updateEmployeeDepartment($id: ID!, $department: String!){
            updateEmployeeDepartment(id: $id, department: $department) {
                id
                Department
              }
          }
        `,
          variables: {
            id: id,
            department: val
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
.a-icon {
  margin-left: 10px;
  padding-right: 5px;
}
.el-pager li {
  border: 1px solid #f2f2f2;
}
</style>