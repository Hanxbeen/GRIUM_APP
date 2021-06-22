<template>
  <div>
    <v-card
      v-for="guestImage in guestImageList"
      :key="guestImage.guestImageId"
      class="col-4 inline-block card-padding"
      @click="open"
    >
      <v-img class="box" :src="guestImage.imageUrl[0]"> </v-img>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import swal from "@/assets/alert/sweetAlert.js";

const BASE_URL = "http://k4c104.p.ssafy.io:8001";

export default {
  name: "GuestImage",
  data() {
    return {
      guestImageList: [],
    };
  },
  props: {
    deadId: String,
  },
  created() {
    this.getGuestImage();
  },
  methods: {
    getGuestImage: function () {
      axios
        .get(`${BASE_URL}/guest/image/${this.deadId}/${this.deadId}`)
        .then((response) => {
          this.guestImageList = response.data.data;
        })
        .catch(() => {
          swal.error("guestImage 불러오기 실패!");
        });
    },
    open: function () {
      swal.info("자세한 내용은 앱을 설치해서 확인해주세요")
    },
  },
};
</script>

<style>
.inline-block {
  float: left;
  display: inline-block;
}

.box{
    height: 0;
    padding-bottom: 100%;
}

.card-padding{
    padding: 5px !important;
}
</style>