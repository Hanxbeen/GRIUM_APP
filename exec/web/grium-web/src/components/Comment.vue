<template>
  <v-card class="mx-auto">
    <v-card-text class="text-left">
      <div class="text-bold">{{ writer }}</div>
      <p class="display-1 text--primary text-small">{{ createdAt }}</p>
      <div class="text--primary">
        {{ contents }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Comment",
  props: {
    writer: String,
    createdAt: String,
    contents: String,
  },
  data() {
    return {};
  },
};
</script>

<style>
.text-left {
  text-align: left;
}

.text-bold{
  font-weight: 900;
}

.text-small{
  font-size: smaller;
  color: #a7a7a7;
}
</style>