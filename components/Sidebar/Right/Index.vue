<template>
  <div clas="flex flex-col">
    <!-- Search bar -->
    <div class="relative m-2">
      <div
        class="absolute flex items-center h-full pl-4 text-gray-600 cursor-pointer"
      >
        <div class="w-6 h-6">
          <SearchIcon @click="handleSearch" />
        </div>
      </div>
      <input
        v-model="search"
        class="flex items-center w-full pl-12 text-sm font-normal text-black bg-gray-200 border border-gray-200 rounded-full shadow dark:text-gray-100 dark:bg-dim-400 dark:border-dim-400 focus:bg-gray-100 dark:focus:bg-dim-900 focus:outline-none focus:border focus:border-blue-200 h-9"
        placeholder="Search tweet"
        type="text"
      />
    </div>

    <!-- Preview Card : What's happening -->
    <SidebarRightPreviewCard title="What's happening">
      <SidebarRightPreviewCardItem
        v-for="whatsHappening in whatsHappeningItems"
      >
        <div>
          <h2 class="font-bold text-gray-800 text-md dark:text-white">
            {{ whatsHappening.title }}
          </h2>

          <p class="text-xs text-gray-400">
            {{ whatsHappening.count }}
          </p>
        </div>
      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>

    <!-- Preview Card : Who to follow -->
    <SidebarRightPreviewCard title="Who to follow">
      <SidebarRightPreviewCardItem v-for="whoToFollow in whoToFollowItems">
        <div class="flex flex-row items-center justify-between p-2">
          <div class="flex flex-row">
            <img
              class="w-10 h-10 rounded-full"
              :src="whoToFollow.image"
              :alt="whoToFollow.name"
            />

            <div class="flex flex-col ml-2">
              <h1 class="text-sm font-bold text-gray-900 dark:text-white">
                {{ whoToFollow.name }}
              </h1>
              <p class="text-xs text-gray-400">{{ whoToFollow.handle }}</p>
            </div>
          </div>
          <div class="flex h-full">
            <button
              class="px-4 py-2 text-xs font-bold text-white bg-black rounded-full dark:text-black dark:bg-white"
            >
              Follow
            </button>
          </div>
        </div>
      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>

    <footer>
      <ul class="mx-2 my-4 text-xs text-gray-500">
        <li class="inline-block mx-2">
          <a
            href="#"
            class="hover:underline"
            @click.prevent="handleToggleDarkMode"
            >Dark mode</a
          >
        </li>
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">Privacy Policy</a>
        </li>
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">Cookie Policy</a>
        </li>
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">Accessability</a>
        </li>
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">Ads info</a>
        </li>
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">More</a>
        </li>
        <li class="inline-block mx-2">© 2022 Twitter, Inc.</li>
      </ul>
    </footer>
  </div>
</template>
<script setup>
import { SearchIcon } from "@heroicons/vue/outline";
const search = ref("");
const emitter = useEmitter();

function handleSearch() {
  useRouter().push({
    path: "/search",
    query: {
      q: search.value,
    },
  });
}

const whatsHappeningItems = ref([
  {
    title: "World Of Warcraft",
    count: "8M Tweets",
  },
  {
    title: "CodingBootCamp",
    count: "49.7k Tweets",
  },
  {
    title: "Airsofting",
    count: "20.4k Tweets",
  },
]);

const whoToFollowItems = ref([
  {
    name: "Skeletor",
    handle: "@FatherMarrow",
    image:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b3454fe5-30a8-494e-9214-45df0b3f9556/der41ap-728e6e86-2b5b-4707-928a-1fc2f2a0d1ea.jpg/v1/fill/w_351,h_306,q_75,strp/wait_a_minute_pog_skeletor__by_luigifoxyfan_der41ap-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MzA2IiwicGF0aCI6IlwvZlwvYjM0NTRmZTUtMzBhOC00OTRlLTkyMTQtNDVkZjBiM2Y5NTU2XC9kZXI0MWFwLTcyOGU2ZTg2LTJiNWItNDcwNy05MjhhLTFmYzJmMmEwZDFlYS5qcGciLCJ3aWR0aCI6Ijw9MzUxIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.gcrwTbPuyUgMzW-89ksTfZdsene7c8IAbKokVtB06dM",
  },
  {
    name: "Optimus Prime",
    handle: "@Unicronhater",
    image:
      "https://s3.amazonaws.com/comicgeeks/characters/avatars/6717.jpg?t=1698448789",
  },
  {
    name: "Cody",
    handle: "@codysweetlife",
    image:
      "https://www.thelist.com/img/gallery/whatever-happened-to-the-cast-of-suite-life-of-zack-and-cody/l-intro-1631645405.jpg",
  },
]);

function handleToggleDarkMode() {
  emitter.$emit("toggleDarkMode");
}
</script>
