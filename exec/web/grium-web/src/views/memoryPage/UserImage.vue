<template>
  <div>
    <v-card
      v-for="userImage in userImageList"
      :key="userImage.imageId"
      class="col-4 card-padding inline-block"
      @click="open"
    >
      <v-img :src="userImage.imageUrl[0]" justify="space-around" class="box">
      </v-img>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import swal from "@/assets/alert/sweetAlert.js";

const BASE_URL = "http://k4c104.p.ssafy.io:8443";

export default {
  name: "UserImage",
  data() {
    return {
      userImageList: [],
    };
  },
  props: {
    deadId: String,
  },
  created() {
    this.getUserImage();
  },
  methods: {
    getUserImage: function () {
      axios
        .get(`${BASE_URL}/user/image?uid=${this.deadId}`)
        .then((response) => {
          this.userImageList = [];
          this.userImageList = response.data;
        })
        .catch(() => {
          swal.error("유저 이미지 불러오기 실패");
        });
    },
    open: function () {
      swal.info("자세한 내용은 앱을 설치해서 확인해주세요");
    },
  },
};
</script>

<style>
.inline-block {
  float: left;
  display: inline-block;
}
.box {
  height: 0;
  padding-bottom: 100%;
}

.card-padding {
  padding: 5px !important;
}
</style>