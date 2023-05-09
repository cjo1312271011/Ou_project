<template>
  <el-container>
    <el-aside width="200px">
      <h1></h1>
      <el-menu
        :default-active="activeType"
        style="text-align: center"
        @select="handleSelect"
      >
        <el-menu-item index="0">
          <i class="el-icon-setting" /> 管理系统
        </el-menu-item>
        <el-menu-item index="user"> 用户 </el-menu-item>
        <el-menu-item index="cpu"> CPU </el-menu-item>
        <el-menu-item index="board"> 主板 </el-menu-item>
        <el-menu-item index="disk"> 硬盘 </el-menu-item>
        <el-menu-item index="graphics"> 显卡 </el-menu-item>
        <el-menu-item index="memory"> 内存 </el-menu-item>
      </el-menu>
    </el-aside>

    <el-main v-if="!inUser">
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
            <el-button type="primary" icon="el-icon-upload" @click="openUpload"
              >上传</el-button
            >
          </div>
        </el-header>

        <el-main>
          <el-table :data="list" style="width: 100%" show-em>
            <span slot="empty"
              ><el-empty description="当前数据为空"></el-empty
            ></span>
            <el-table-column
              :prop="activeProps.id"
              label="id"
            ></el-table-column>
            <el-table-column
              :prop="activeProps.name"
              label="名字"
            ></el-table-column>
            <el-table-column
              :prop="activeProps.price"
              label="价格"
            ></el-table-column>
            <el-table-column
              :prop="activeProps.tag"
              label="标签"
            ></el-table-column>

            <el-table-column
              :prop="activeProps.image"
              label="图片地址"
            ></el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="openEdit(scope.row)">编辑</el-button>
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

    <div v-else>
      <user-component />
    </div>

    <el-dialog :visible.sync="uploadVisible" :title="`上传 ${activeType} 数据`">
      <el-form :model="uploadForm" label-position="left" label-width="120px">
        <el-form-item label="ID">
          <el-input v-model="uploadForm.id"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="uploadForm.name"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="uploadForm.price"></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="uploadForm.tag"></el-input>
        </el-form-item>
        <el-form-item label="图片地址">
          <el-input v-model="uploadForm.image"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadVisible = false">取 消</el-button>
        <el-button type="primary" @click="postUpload">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="editVisible" :title="`修改 ${activeType} 数据`">
      <el-form :model="editForm" label-position="left" label-width="120px">
        <el-form-item label="ID">
          <el-input v-model="editForm.id"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="editForm.price"></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="editForm.tag"></el-input>
        </el-form-item>
        <el-form-item label="图片地址">
          <el-input v-model="editForm.image"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="postEditData">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import {
  addFittings,
  deleteFittings,
  fuzzyQueryFittingsList,
  getFittingsList,
  updateFittings,
} from "@/uitls";
import { cpuProps, propsMap, swapPropsMap } from "@/FittingsMap";
import { Message } from "element-ui";
import UserComponent from "./UserComponent.vue";
export default {
  components: { UserComponent },
  name: "ManageIndex",

  data() {
    return {
      searchValue: "",

      list: [],
      total: 0, // 数据总数
      page: 1, // 当前页码
      pageSize: 10, // 每页显示的数据条数

      uploadVisible: false,
      editVisible: false,

      title: "上传 CPU 数据",

      activeProps: cpuProps,
      activeType: "cpu",

      inUser: false,

      uploadForm: {
        id: "",
        name: "",
        price: "",
        tag: "",
        image: "",
      },
      editForm: {
        id: "",
        name: "",
        price: "",
        tag: "",
        image: "",
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    handleSelect(index) {
      if (index === 0) return;
      if (index == "user") {
        this.inUser = true;
        return;
      }
      this.inUser = false;
      this.activeType = index;
      this.activeProps = propsMap[index];
      this.getData();
    },
    getData() {
      getFittingsList(this.activeType, {
        page: this.page,
        pageSize: this.pageSize,
      })
        .then((res) => {
          const data = res.data.data;
          this.list = data.list;
          this.total = data.total;
        })
        .catch(() => Message.error("获取数据失败"));
    },
    handleSearch() {
      const param = `${this.activeType}Name`;
      fuzzyQueryFittingsList(this.activeType, {
        [param]: this.searchValue,
        page: this.page,
        pageSize: this.pageSize,
      }).then((res) => {
        const data = res.data.data;
        this.list = data.list;
        this.total = data.total;
      });
    },
    openUpload() {
      //
      this.uploadVisible = true;
    },
    postUpload() {
      const obj = {};
      const map = propsMap[this.activeType];
      Object.entries(this.uploadForm).forEach(([key, val]) => {
        obj[map[key]] = val;
      });

      addFittings(this.activeType, {
        ...obj,
      })
        .then(() => {
          Message.success("上传成功");
          this.getData();
          this.uploadVisible = false;
        })
        .catch(() => {
          Message.error("上传失败");
        });
    },

    openEdit(rowData) {
      this.editVisible = true;
      const swapMap = swapPropsMap[this.activeType];
      let tempObj = {};
      Object.entries(rowData).forEach(([key, val]) => {
        tempObj[swapMap[key]] = val;
      });
      this.editForm = tempObj;
    },
    postEditData() {
      const obj = {};
      const map = propsMap[this.activeType];
      Object.entries(this.editForm).forEach(([key, val]) => {
        obj[map[key]] = val;
      });
      updateFittings(this.activeType, {
        ...obj,
      })
        .then(() => {
          Message.success("更新成功");
          this.getData();
          this.editVisible = false;
        })
        .catch(() => Message.error("更新失败"));
    },
    handleDelete(rowData) {
      const swapMap = swapPropsMap[this.activeType];
      Object.entries(swapMap).forEach(([key, val]) => {
        if (val === "id") {
          deleteFittings(this.activeType, {
            id: rowData[key],
          })
            .then(() => {
              Message.success("删除成功");
              this.getData();
            })
            .catch(() => {
              Message.error("删除失败");
            });
        }
      });
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
        this.uploadForm = {
          id: "",
          name: "",
          price: "",
          tag: "",
          image: "",
        };
      }
    },
  },
};
</script>

<style></style>
