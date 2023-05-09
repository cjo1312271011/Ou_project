<template>
  <el-main>
    <el-container>
      <el-header>
        <div>
          <el-input
            v-model="searchValue"
            placeholder="请输入搜索内容"
            :clearable="true"
            style="display: inline-block; width: 300px; margin-right: 20px"
          />
          <el-button type="primary" icon="el-icon-search" @click="handleSearch"
            >搜索</el-button
          >
        </div>
      </el-header>
      <el-main>
        <el-table :data="userList" style="width: 100%" show-em>
          <span slot="empty"
            ><el-empty description="当前数据为空"></el-empty
          ></span>
          <el-table-column prop="id" label="id"></el-table-column>
          <el-table-column prop="username" label="username"></el-table-column>
          <el-table-column prop="password" label="passowrd"></el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="openUserEdit(scope.row)">编辑</el-button>
              <el-button type="danger" @click="handleUserDelete(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="userPage"
          :page-size="userPageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="userTotal"
        >
        </el-pagination>

        <el-dialog
          :visible.sync="editVisible"
          :title="`修改 ${activeType} 数据`"
        >
          <el-form :model="editForm" label-position="left" label-width="120px">
            <el-form-item label="ID">
              <el-input v-model="editForm.id"></el-input>
            </el-form-item>
            <el-form-item label="username">
              <el-input v-model="editForm.username"></el-input>
            </el-form-item>
            <el-form-item label="password">
              <el-input v-model="editForm.password"></el-input>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="postEditData">确 定</el-button>
          </span>
        </el-dialog>
      </el-main>
    </el-container>
  </el-main>
</template>

<script>
import { deleteUser, fuzzyQueryUser, getUserData, updateUser } from "@/uitls";
import { Message } from "element-ui";
export default {
  data() {
    return {
      userList: [],
      userPage: 1,
      userPageSize: 10,
      userTotal: 0,

      searchValue: "",

      editVisible: false,

      editForm: {
        id: "",
        username: "",
        password: "",
      },
    };
  },
  methods: {
    getData() {
      getUserData({
        page: this.userPage,
        pageSize: this.userPageSize,
      })
        .then((res) => {
          const data = res.data.data;
          this.userList = data.userList;
          this.userTotal = data.total;
        })
        .catch(() => Message.error("获取数据失败"));
    },
    handleSearch() {
      fuzzyQueryUser({
        page: this.userPage,
        pageSize: this.userPageSize,
      })
        .then((res) => {
          const data = res.data.data;
          this.userList = data.userList;
          this.userTotal = data.total;
        })
        .catch(() => Message.error("获取数据失败"));
    },

    handleCurrentChange(page) {
      this.userPage = page;
      this.getData();
    },

    openUserEdit(rowData) {
      this.editVisible = true;
      this.editForm = rowData;
    },
    postEditData() {
      updateUser(this.editForm)
        .then((res) => {
          Message.success("更新成功");
          this.getData();
          this.editVisible = false;
        })
        .catch((e) => {
          Message.error("更新失败");
        });
    },
    handleUserDelete(rowData) {
      deleteUser({
        username: rowData.username,
      })
        .then((res) => {
          Message.success("删除成功");
          this.getData();
        })
        .catch("删除失败");
    },
  },
};
</script>

<style></style>
