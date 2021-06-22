<template>
  <div>
    <div v-if="comments.length > 0">
      <comment
        class="d-flex"
        v-for="comment in comments"
        :key="comment.guestCommentId"
        :writer="comment.name"
        :createdAt="comment.createdAt"
        :contents="comment.contents"
      ></comment>
    </div>
    <div v-else>
      <span>방명록이 없습니다.</span>
    </div>
  </div>
</template>

<script>
import Comment from "../../components/Comment.vue";
import swal from "@/assets/alert/sweetAlert.js";
import axios from "axios";
const SERVER_URL = "http://k4c104.p.ssafy.io:8001";

export default {
  name: "Comments",
  components: { Comment },
  props: {
    deadId: String,
  },
  data() {
    return {
      comments: [],
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments: function () {
      axios
        .get(`${SERVER_URL}/guest/comment/${this.deadId}/${this.deadId}`)
        .then((response) => {
          this.comments = response.data.data;
        })
        .catch(() => {
          swal.error("방명록 불러오기 실패!");
        });
    },
  },
};
</script>

<style>
</style>