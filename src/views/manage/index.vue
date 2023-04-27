<template>
  <el-container>
    <el-aside width="200px">
      <h1></h1>
      <el-menu default-active="2" style="text-align: center">
        <el-menu-item index="0">
          <i class="el-icon-setting" /> 管理系统
        </el-menu-item>
        <el-menu-item index="1"> 用户 </el-menu-item>
        <el-menu-item index="2"> CPU </el-menu-item>
        <el-menu-item index="3"> 主板 </el-menu-item>
        <el-menu-item index="4"> 硬盘 </el-menu-item>
        <el-menu-item index="5"> 显卡 </el-menu-item>
        <el-menu-item index="6"> 内存 </el-menu-item>
      </el-menu>
    </el-aside>

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
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="handleSearch"
              >搜索</el-button
            >

            <el-button
              type="primary"
              icon="el-icon-upload"
              @click="handleUpload"
              >上传</el-button
            >
          </div>
        </el-header>

        <el-main>
          <el-table :data="list" style="width: 100%" show-em>
            <span slot="empty"
              ><el-empty description="当前数据为空"></el-empty
            ></span>
            <el-table-column prop="cpuId" label="id"></el-table-column>
            <el-table-column prop="cpuName" label="名字"></el-table-column>
            <el-table-column prop="cpuPrice" label="价格"></el-table-column>
            <el-table-column prop="cpuImage" label="图片地址"></el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="handleEdit(scope.row)">编辑</el-button>

                <el-button type="danger" @click="handleDelete(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </el-main>
      </el-container>
    </el-main>

    <el-dialog :visible.sync="uploadVisible" :title="title">
      <el-form :model="form" label-position="left" label-width="120px">
        <el-form-item label="CPU ID">
          <el-input v-model="form.cpuId"></el-input>
        </el-form-item>
        <el-form-item label="CPU 名称">
          <el-input v-model="form.cpuName"></el-input>
        </el-form-item>
        <el-form-item label="CPU 价格">
          <el-input v-model="form.cpuPrice"></el-input>
        </el-form-item>
        <el-form-item label="CPU 标签">
          <el-input v-model="form.cpuTag"></el-input>
        </el-form-item>
        <el-form-item label="CPU 图片地址">
          <el-input v-model="form.cpuImage"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import { getCpuList } from "@/uitls";
export default {
  name: "ManageIndex",

  data() {
    return {
      searchValue: "",

      list: [],
      total: 0, // 数据总数
      page: 1, // 当前页码
      pageSize: 10, // 每页显示的数据条数

      uploadVisible: false,

      title: "上传 CPU 数据",

      form: {
        cpuId: "",
        cpuName: "",
        cpuPrice: "",
        cpuTag: "",
        cpuImage: "",
      },
    };
  },
  mounted() {
    this.getData();
  },

  methods: {
    getData() {
      getCpuList(this.page, this.pageSize).then((res) => {
        const data = res.data.data.cpuList;
        this.list = data;
        this.total = data.length;
      });
    },
    handleSearch() {
      console.log(`你正在搜索：${this.searchValue}`);
      // 这里可以编写其他搜索操作
    },
    handleUpload() {
      //
      this.uploadVisible = true;
    },

    handleEdit(rowData) {
      this.title = "修改 CPU 数据";
      this.uploadVisible = true;
      this.form = rowData;
    },
    handleDelete(rowData) {
      const id = rowData.cpuId;
      this.list = this.list.filter((item) => item.cpuId !== id);
    },
    // 页码改变时触发
    handleCurrentChange(page) {
      this.page = page;
      this.getData();
    },
  },

  watch: {
    uploadVisible(val, pre) {
      if (val === false) {
        this.form = {
          cpuId: "",
          cpuName: "",
          cpuPrice: "",
          cpuTag: "",
          cpuImage: "",
        };
      }
    },
  },
};
</script>

<style></style>
