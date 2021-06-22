<template>
  <div class="margin">
    <div v-if="!info.progressCheck" class="row">
      <div class="col-3 infoText">
        <div>장소 :</div>
      </div>
      <div class="col-9 infoText">
        <div>{{ info.murmurName }}</div>
        <div class="infoSubText">{{ info.murmurAddress }}</div>
      </div>
      <div class="col-3 infoText">
        <div>발인일 :</div>
      </div>
      <div class="col-9 infoText">
        <div>{{ info.imprintDate }}</div>
      </div>
    </div>
    <div v-else>
      <div>장소 :</div>
      <div>{{ info.cemeteryName }}</div>
      <div>{{ info.cemeteryAddress }}</div>
    </div>
    <div class="familyRelation">
      <div class="relationCard" v-for="(familyRelation, index) in info.familyRelations" :key="index">
        <div class="cardMargin cardName">
          {{ familyRelation.name }}
        </div>
        <div class="cardMargin cardRelationName">
          {{ familyRelation.relationName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CondolenceInfo',
  props: {
    info: Object,
  },
  methods: {},
};
</script>

<style>
.familyRelation {
  display: flex;
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  margin-top: 20px;
  width: 100%;
}
.relationCard {
  display: inline-block;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  padding: 10px 15px;
  border-radius: 10px;
  box-shadow: 0 0px 1px rgba(0, 0, 0, 0.1), 0 0px 4px rgba(0, 0, 0, 0.3);

  margin: 10px;
}
.infoText {
  padding: 20px 0 20px 12px  !important;
  text-align: left;
  /* font-weight: 700; */
}
.infoSubText {
  font-size: 0.8rem;
}
.margin {
  margin: 12px 12px 0;
}
.cardMargin {
  margin: 8px;
}
.cardName {
  font-size: 0.8rem;
}
.cardRelationName {
  font-size: 0.6rem;
  color: #a7a7a7;
}
</style>
