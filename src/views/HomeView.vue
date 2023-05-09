<template>
  <div class="home">
    <top-bar />
    <div class="container">
      <div class="left-container">
        <el-form label-width="80px">
          <!-- <el-form-item label="相关标签">
            <el-input placeholder="请输入合适的标签" v-model="tag" />
          </el-form-item> -->
        </el-form>
        <el-tabs v-model="activeType" type="card">
          <el-tab-pane label="CPU" name="cpu">
            <div v-for="(item, index) in cpuPageInfo.list" :key="index">
              <list-item
                :id="item.cpuId"
                :image="item.cpuImage"
                :name="item.cpuName"
                :price="item.cpuPrice"
                :tag="item.cpuTag"
              ></list-item>
            </div>
          </el-tab-pane>
          <el-tab-pane label="硬盘" name="disk">
            <div v-for="(item, index) in diskPageInfo.list" :key="index">
              <list-item
                :id="item.diskId"
                :image="item.diskImage"
                :name="item.diskName"
                :price="item.diskPrice"
                :tag="item.diskTag"
              ></list-item>
            </div>
          </el-tab-pane>
          <el-tab-pane label="显卡" name="graphics">
            <div v-for="(item, index) in graphicsPageInfo.list" :key="index">
              <list-item
                :id="item.graphicsId"
                :image="item.graphicsImage"
                :name="item.graphicsName"
                :price="item.graphicsPrice"
                :tag="item.graphicsTag"
              ></list-item>
            </div>
          </el-tab-pane>
          <el-tab-pane label="主板" name="mainBoard">
            <div v-for="(item, index) in boardPageInfo.list" :key="index">
              <list-item
                :id="item.boardId"
                :image="item.boardImage"
                :name="item.boardName"
                :price="item.boardPrice"
                :tag="item.boardTag"
              ></list-item>
            </div>
          </el-tab-pane>
          <el-tab-pane label="内存" name="memory">
            <div v-for="(item, index) in memoryPageInfo.list" :key="index">
              <list-item
                :id="item.memoryId"
                :image="item.memoryImage"
                :name="item.memoryName"
                :price="item.memoryPrice"
                :tag="item.memoryTag"
              ></list-item>
            </div>
          </el-tab-pane>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </el-tabs>
      </div>
      <div class="right-container">
        <h3 class="title">请告诉我您的需求</h3>
        <div class="block">
          <span>轻度游戏</span>
          <el-slider v-model="cpuWeight" show-input></el-slider>
        </div>
        <div class="block">
          <span>家用学习</span>
          <el-slider v-model="diskWeight" show-input></el-slider>
        </div>
        <div class="block">
          <span>经济实惠</span>
          <el-slider v-model="mainWeight" show-input></el-slider>
        </div>
        <div class="block">
          <span>图形影像</span>
          <el-slider v-model="graphicsWeight" show-input></el-slider>
        </div>
        <div class="block">
          <span>商务办公</span>
          <el-slider v-model="memoryWeight" show-input></el-slider>
        </div>

        <!-- <div class="block" style="margin-top: 30px;">
          <span style="margin-right: 20px;">预算</span>
          <el-input-number v-model="price"></el-input-number>
        </div> -->
        <el-button type="primary" @click="handleClick">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import { sendEquip } from "../uitls";
import ListItem from "@/components/ListItem.vue";
import { Message } from "element-ui";
export default {
  name: "HomeView",
  components: { TopBar, ListItem },
  data() {
    return {
      tag: "游戏",
      price: 2000,
      cpuWeight: 20,
      diskWeight: 20,
      graphicsWeight: 20, // 显卡
      memoryWeight: 20, // 内存
      mainWeight: 20, // 主板
      config: {},
      activeType: "cpu",

      boardPageInfo: { list: [] },
      cpuPageInfo: { list: [] },
      diskPageInfo: { list: [] },
      graphicsPageInfo: { list: [] },
      memoryPageInfo: { list: [] },

      page: 1,
      pageSize: 10,
      total: 0,
    };
  },
  methods: {
    handleClick() {
      this.getData();
    },
    getData() {
      sendEquip( {
        轻度游戏: this.cpuWeight,
        家用学习: this.mainWeight,
        经济实惠: this.diskWeight,
        图形影像: this.graphicsWeight,
        商务办公: this.memoryWeight,
      })
        .then((res) => {
          if (res.data.code !== 200) {
            Message.error(res.data.msg);
            return;
          }
          this.boardPageInfo = res.data.data.boardPageInfo;
          this.cpuPageInfo = res.data.data.cpuPageInfo;
          this.diskPageInfo = res.data.data.diskPageInfo;
          this.graphicsPageInfo = res.data.data.graphicsPageInfo;
          this.memoryPageInfo = res.data.data.memoryPageInfo;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleCurrentChange(page) {
      this.page = page;
      this.getData();
    },
  },
  watch: {
    activeType(now) {
      this.page = 1;
      this.getData();
      switch (now) {
        case "cpu":
          this.total = this.cpuPageInfo.total;
          break;
        case "disk":
          this.total = this.diskPageInfo.total;
          break;
        case "graphics":
          this.total = this.graphicsPageInfo.total;
          break;
        case "mainBoard":
          this.total = this.boardPageInfo.total;
          break;
        default:
          this.total = this.memoryPageInfo.total;
          break;
      }
    },
  },

  mounted() {
    this.getData();
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  padding: 50px 5% 0 5%;
}

.left-container {
  flex: 5;
  display: flex;
  flex-direction: column;
  padding-right: 10%;
}

.right-container {
  flex: 4;
}
.title {
  margin-bottom: 20px;
}

.block {
  margin-bottom: 20px;
}
</style>
