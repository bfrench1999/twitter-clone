<template>
  <div class="flex items-center justify-around w-full">
    <TweetItemActionsIcon
      color="blue"
      @on-click="emits('onCommentClick')"
      :size="size"
    >
      <template v-slot:icon="{ classes }">
        <ChatIcon :class="classes" />
      </template>

      <template v-if="showStats" v-slot:default>
        {{ props.tweet.repliesCount }}
      </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="green" :size="size">
      <template v-slot:icon="{ classes }">
        <RefreshIcon :class="classes" />
      </template>

      <template v-if="showStats" v-slot:default>
        {{ generateRandomNumber() }}
      </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="red" :size="size">
      <template v-slot:icon="{ classes }">
        <HeartIcon
          v-if="!tweet.likedByUser"
          :class="classes"
          @click="handleLikeTweet"
        />
        <HeartIconFilled
          class="red-icon"
          v-else
          :class="classes"
          @click="handleDislikeTweet"
        />
      </template>

      <template v-if="showStats" v-slot:default>
        {{ tweet.likes }}
      </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="blue" :size="size">
      <template v-slot:icon="{ classes }">
        <UploadIcon :class="classes" />
      </template>

      <template v-if="showStats" v-slot:default>
        {{ generateRandomNumber() }}
      </template>
    </TweetItemActionsIcon>
  </div>
</template>
<script setup>
import {
  ChatIcon,
  RefreshIcon,
  HeartIcon,
  UploadIcon,
} from "@heroicons/vue/outline";

import { HeartIcon as HeartIconFilled } from "@heroicons/vue/solid";

const emits = defineEmits(["onCommentClick"]);

const props = defineProps({
  tweet: {
    type: Object,
    required: true,
  },
  compact: {
    type: Boolean,
    default: false,
  },
});

const showStats = computed(() => props.compact);
const size = computed(() => (props.compact ? 5 : 8));
const { likeTweet, disLikeTweet } = useTweets();

function generateRandomNumber() {
  return Math.floor(Math.random() * 100);
}

async function handleLikeTweet() {
  try {
    if (props.tweet.likedByUser === false) {
      likeTweet({
        tweetId: props.tweet.id,
      });
      props.tweet.likes += 1;
      props.tweet.likedByUser = true;
    }
  } catch (err) {
    console.error(err);
  }
}

async function handleDislikeTweet() {
  try {
    if (props.tweet.likedByUser === true) {
      disLikeTweet({
        tweetId: props.tweet.id,
      });
      props.tweet.likes -= 1;
      props.tweet.likedByUser = false;
    }
  } catch (error) {
    console.error(error);
  }
}
</script>
<style>
.red-icon {
  color: red !important;
}
</style>
