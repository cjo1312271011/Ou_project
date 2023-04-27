<template>
  <div class="container">
    <div class="img">
      <img :src="imgUrl" alt="" />
    </div>
    <div class="info">
      <h2 class="title">{{ name }}</h2>
      <h3 class="price">¥{{ price }}</h3>

      <div class="tag">
        <el-link
          type="info"
          v-for="(item, index) in tags"
          :key="index"
          style="margin-left: 5px;"
        >
          {{ item }}
        </el-link>
      </div>
    </div>
  </div>
</template>

<script>
import { genImgUrl } from '@/uitls'
export default {
  name: 'ListItem',
  props: {
    id: Number,
    // type: "cpu" || "disk" || "graphics" || "mainBoard" || "memory",
    image: String,
    name: String,
    price: Number,
    tag: String,
  },
  data() {
    return {}
  },
  computed: {
    tags() {
      return this.tag.split('，')
    },
    imgUrl() {
      return genImgUrl(this.image)
    },
  },
}
</script>

<style scoped>
.container {
  display: flex;
  height: 220px;
  margin-bottom: 10px;
}

.img {
  flex: 2;
  margin-right: 5px;
}
.img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.info {
  flex: 5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.price {
  flex: 2;
}
</style>
