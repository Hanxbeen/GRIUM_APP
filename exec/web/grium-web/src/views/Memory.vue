<template>
  <div class="memory">
    <div class="flex">
      <!-- 프로필 사진 -->
      <div class="col-4 d-inline-block margin-top">
        <v-img class="profile" :src="this.info.portraitUrl" :aspect-ratio="1" />
      </div>
      <!-- 프로필 카드 -->
      <div class="col-8 text-left inline-block margin-top">
        <div id="name">{{ info.name }}</div>
        <div id="date">
          {{ info.birthyear }}-{{ birthMonth }}-{{ birthDay }} ~
          {{ info.deceasedDate }}
        </div>
        <div id="comment">
          {{ info.commentForCondolence | textLengthOverCut }}
        </div>

        <!-- 아이콘 라인 -->
        <v-row class="mb-6" no-gutter>
          <!-- 하트 아이콘 -->
          <v-col class="col-1">
            <img
              class="profile-card-icons"
              v-if="this.info.condolenceCheck"
              src="../assets/memory/hearted.png"
            />
            <img
              class="profile-card-icons"
              v-else
              src="../assets/memory/heart.png"
            />
          </v-col>
          <!-- 하트 개수 -->
          <v-col class="col-3">
            <p class="profile-card-font">{{ info.condolenceCount }}</p>
          </v-col>
          <!-- 앨범 아이콘 -->
          <v-col class="col-1">
            <img
              class="profile-card-icons"
              src="../assets/memory/openalbum.png"
            />
          </v-col>
          <v-col class="col-3">
            <p class="profile-card-font">{{ info.userImagesCount }}</p>
          </v-col>
        </v-row>
      </div>
    </div>
    <!-- <div>
      <tabs :tabs="tabs" class="tab-container">
        <div>
          하이요
          <condolence-info :info="this.info" />
        </div>
        <div>
          <user-image :deadId="this.$route.params.deadId" />
        </div>
        <div>
          <guest-image :deadId="this.$route.params.deadId" />
        </div>
        <div>
          <comments :deadId="this.$route.params.deadId" />
        </div>
      </tabs>
    </div> -->
    <div fluid class="pa-0">
      <div class="d-flex tab-bar" align="center" justify="space-around">
        <button
          class="tab-bar-width"
          icon
          elevation="2"
          @click="switchCondolenceInfo"
        >
          <div
            class="tab-bar-title tab-bar-selected-border"
            v-if="isCondolenceInfo"
          >
            <div>장례 정보</div>
          </div>
          <div v-else>
            <img class="tab-bar-card-icons" src="../assets/memory/user.png" />
          </div>
        </button>
        <button
          class="tab-bar-width"
          icon
          elevation="2"
          @click="switchUserImage"
        >
          <div class="tab-bar-title tab-bar-selected-border" v-if="isUserImage">
            <p>고인 앨범</p>
          </div>
          <div v-else>
            <img
              class="tab-bar-card-icons"
              src="../assets/memory/gonegallery.png"
            />
          </div>
        </button>
        <button
          class="tab-bar-width"
          icon
          elevation="2"
          @click="switchGuestImage"
        >
          <div
            class="tab-bar-title tab-bar-selected-border"
            v-if="isGuestImage"
          >
            <p>공유 앨범</p>
          </div>
          <div v-else>
            <img
              class="tab-bar-card-icons"
              src="../assets/memory/openalbum.png"
            />
          </div>
        </button>
        <button class="tab-bar-width" icon elevation="2" @click="switchComment">
          <div class="tab-bar-title tab-bar-selected-border" v-if="isComment">
            <p>방명록</p>
          </div>
          <div v-else>
            <img class="tab-bar-card-icons" src="../assets/memory/write.png" />
          </div>
        </button>
      </div>
    </div>
    <div>
      <condolence-info
        v-if="isCondolenceInfo"
        :info="this.info"
      ></condolence-info>
      <user-image
        v-if="isUserImage"
        :deadId="this.$route.params.deadId"
      ></user-image>
      <guest-image
        v-if="isGuestImage"
        :deadId="this.$route.params.deadId"
      ></guest-image>
      <comments v-if="isComment" :deadId="this.$route.params.deadId" />
    </div>
  </div>
</template>

<script>
import swal from "@/assets/alert/sweetAlert.js";
import axios from "axios";
import Comments from "./memoryPage/Comments.vue";
import UserImage from "./memoryPage/UserImage.vue";
import CondolenceInfo from "./memoryPage/CondolenceInfo.vue";
import GuestImage from "./memoryPage/GuestImage.vue";

// import Tabs from "vue-slide-tabs";
const BASE_URL = "http://k4c104.p.ssafy.io:8001";

export default {
  components: { Comments, UserImage, CondolenceInfo, GuestImage },
  name: "Memory",
  data() {
    return {
      info: {},
      isCondolenceInfo: true,
      isComment: false,
      isUserImage: false,
      isGuestImage: false,
      birthMonth: "",
      birthDay: "",
      tabs: [
        {
          label: "장례 정보",
          icon: "../assets/memory/heart.png",
        },
        {
          label: "고인 앨범",
        },
        {
          label: "공유 앨범",
        },
        {
          label: "방명록",
        },
      ],
    };
  },
  created() {
    this.getMemoryInfo();
  },
  methods: {
    getMemoryInfo: function () {
      axios
        .get(
          `${BASE_URL}/dead/${this.$route.params.deadId}/${this.$route.params.deadId}`
        )
        .then((response) => {
          this.info = response.data.data;
          this.birthMonth = this.info.birthday.substring(0, 2);
          this.birthDay = this.info.birthday.substring(2, 4);
        })
        .catch(() => {
          swal.error("기억공간 불러오기 실패");
        });
    },
    switchComment: function () {
      this.isCondolenceInfo = false;
      this.isUserImage = false;
      this.isGuestImage = false;
      this.isComment = true;
    },
    switchCondolenceInfo: function () {
      this.isCondolenceInfo = true;
      this.isUserImage = false;
      this.isGuestImage = false;
      this.isComment = false;
    },
    switchUserImage: function () {
      this.isCondolenceInfo = false;
      this.isUserImage = true;
      this.isGuestImage = false;
      this.isComment = false;
    },
    switchGuestImage: function () {
      this.isCondolenceInfo = false;
      this.isUserImage = false;
      this.isGuestImage = true;
      this.isComment = false;
    },
  },
  filters: {
    textLengthOverCut(txt, len, lastTxt) {
      if (txt == null) return;
      if (len == "" || len == null) {
        len = 30;
      }
      if (lastTxt == "" || lastTxt == null) {
        lastTxt = "...";
      }
      if (txt.length > len) {
        txt = txt.substr(0, len) + lastTxt;
      }
      return txt;
    },
  },
};
</script>

<style>
.text-left {
  text-align: left;
}
.inline-block {
  display: inline-block;
}
.flex {
  display: flex;
}
.margin-top {
  margin-top: 20px;
}

.profile {
  border-radius: 100%;
  border-width: 0.2em;
  border-style: solid;
  border-color: black;
}

#name {
  font-size: 1rem;
  font-weight: 700;
}

#date {
  font-size: 0.8rem;
  color: #cfd5dd;
  padding-top: 0.3em;
}
#comment {
  padding-top: 0.3em;
  font-size: 1rem;
  height: 4em;
}

.profile-card-icons {
  height: 1rem;
  width: 1rem;
  position: relative;
}
.profile-card-font {
  font-size: 1rem;
  padding-bottom: 1em;
}

.tab-bar-card-icons {
  width: 1rem;
  /* color: #a7a7a7; */
  /* color 적용안됨 ㅠ */
}

.tab-bar {
  border-top: 0.1em solid #e6e8ec;
  border-bottom: 0.1em solid #e6e8ec;
  align-items: center;
}
.tab-bar-width {
  margin: 0 !important;
  width: 25% !important;
  /* height: 4em !important; */
}
.tab-bar-selected-border {
  border-radius: 0 !important;
  border-bottom: 0.2em solid black;
  height: 3rem;
  padding-top: 0.9rem;
}
.tab-bar-title {
  color: black;
  font-weight: 700;
  font-size: 0.8rem;
  /* border-bottom: 3px;
  border-color: black; */
}
</style>