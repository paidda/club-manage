<template>
  <div class="banner-container">
    <ul
      class="images"
      :style="{width: banners.length * 100 +'%',
        marginLeft: -index * 100 +'%',
      }">
      <li v-for="(item, i) in banners" :key="i">
        <img :src="item.url" alt="" :width="imgWidth"/>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    banners: {
      type: Array,
      required: true,
    },
    duration: {
      type: Number,
      default: 2000,
    }
  },
  created() {
    this.autoStart();
  },
  destroyed() {
    this.autoStop();
  },
  data() {
    return {
      imgWidth: 0,
      index: 0,
      timer: null,
    }
  },
  methods: {
    autoStart() {
      this.imgWidth = window.innerWidth + 'px';
      if(this.timer) {
        return;
      }
      window.onresize = ()=>{
        this.imgWidth = window.innerWidth + 'px';
      }
      this.timer = setInterval(() => {
        this.index = (this.index + 1) % this.banners.length;
      },this.duration)
    },
    autoStop() {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
}
</script>

<style scoped>
.banner-container {
  position: relative;
  overflow: hidden;
}
.banner-container li {
  display: block;
  height: 100%;
  float: left;
}
.images {
  height: 100%;
  transition: 0.5s;
}
</style>
