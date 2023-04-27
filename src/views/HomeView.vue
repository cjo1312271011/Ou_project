<template>
  <div class="home">
    <top-bar />
    <div class="container">
      <div class="left-container">
        <el-form label-width="80px">
          <el-form-item label="相关标签">
            <el-input placeholder="请输入合适的标签" v-model="tag" />
          </el-form-item>
        </el-form>
        <el-tabs v-model="activeType" type="card">
          <el-tab-pane label="CPU" name="cpu">
            <div v-for="(item, index) in cpuList" :key="index">
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
            <div v-for="(item, index) in disks" :key="index">
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
            <div v-for="(item, index) in graphicsList" :key="index">
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
            <div v-for="(item, index) in boardList" :key="index">
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
            <div v-for="(item, index) in memoryList" :key="index">
              <list-item
                :id="item.memoryId"
                :image="item.memoryImage"
                :name="item.memoryName"
                :price="item.memoryPrice"
                :tag="item.memoryTag"
              ></list-item>
            </div>
          </el-tab-pane>
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
import TopBar from '@/components/TopBar.vue'
import { getRecommendList, sendEquip } from '../uitls'
import ListItem from '@/components/ListItem.vue'
import {Message} from "element-ui";
export default {
  name: 'HomeView',
  components: { TopBar, ListItem },
  data() {
    return {
      tag: '游戏',
      price: 2000,
      cpuWeight: 20,
      diskWeight: 20,
      graphicsWeight: 20, // 显卡
      memoryWeight: 20, // 内存
      mainWeight: 20, // 主板
      config: {},
      activeType: 'cpu',

      //
      cpuList: [],
      graphicsList: [],
      memoryList: [],
      boardList: [],
      disks: [],
    }
  },
  methods: {
    handleClick() {
      sendEquip(this.price, this.tag, {
        cpuWeight: this.cpuWeight,
        mainBoardWeight: this.mainWeight,
        diskWeight: this.diskWeight,
        graphicsWeight: this.graphicsWeight,
        memoryWeight: this.memoryWeight,
      })
        .then((res) => {
          if(res.data.code !==200){
            Message.error(res.data.msg)
            return
          }

          this.cpuList = [res.data.data.cpu]
          this.graphicsList = [res.data.data.graphics]
          this.disks = [res.data.data.disk]
          this.memoryList = [res.data.data.memory]
          this.boardList = [res.data.data.mainBoard]
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },

  mounted() {
    getRecommendList().then((res) => {
      this.cpuList = res.data.data.cpulist
      this.graphicsList = res.data.data.graphicsList
      this.memoryList = res.data.data.memoryList
      this.boardList = res.data.data.boardList
      this.disks = res.data.data.disks
    })
  },
}
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
