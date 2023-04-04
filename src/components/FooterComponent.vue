<template>
  <div
    id="move"
    class="md:container md:mx-auto md:fixed md:inset-x-0 md:bottom-0 md:mb-10 md:px-10"
  >
    <hr class="border-gray-500 py-1" />
    <div class="w-full py-2 bg-gray-200">
      <ul class="text-blue-900 md:flex md:justify-center text-center">
        <li class="py-2 md:mx-10">
          <a
            class="focus:outline-none focus:ring focus:ring-cyan-500 focus:border-cyan-500"
            href="https://campus.uoc.edu/"
            >{{ $t("footer.accessibility") }}</a
          >
        </li>
        <li class="py-2 md:mx-10">
          <a
            class="focus:outline-none focus:ring focus:ring-cyan-500 focus:border-cyan-500"
            href="https://campus.uoc.edu/"
            >{{ $t("footer.attention") }}</a
          >
        </li>
        <li class="py-2 md:mx-10">
          <a
            class="focus:outline-none focus:ring focus:ring-cyan-500 focus:border-cyan-500"
            href="https://seu-electronica.uoc.edu/es"
            >{{ $t("footer.campus") }}</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>
