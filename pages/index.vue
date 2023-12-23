<template>
  <main class="flex-1">
    <section class="w-full py-6 sm:py-12 md:py-24 lg:py-32 xl:py-48 relative">
      <div class="absolute z-[-1] left-0 right-0 bottom-0 top-0 bg-[url(/banner.jpg)] bg-cover blur-sm"></div>
      <div class="container px-4 md:px-6">
        <div class="flex flex-col justify-center space-y-4">
          <h1 class="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl text-center text-blue-400">
            绿色、健康、环保、端对端
          </h1>
          <p class="max-w-[600px] text-green-400 md:text-xl dark:text-gray-400 text-center mx-auto">
            原产地直发，整个生命周期无农药、激素，全部为自然肥料，无转基因
          </p>
        </div>
      </div>
    </section>
    <section class="w-full py-12 md:py-24 lg:py-32">
      <div class="container px-4 md:px-6">
        <div class="grid gap-6 md:grid-cols-3 lg:gap-12">
          <div class="border text-card-foreground bg-white rounded shadow-md" data-v0-t="card">
            <div class="flex flex-col space-y-1.5 p-6">
              <h2 class="text-lg font-bold">新鲜</h2>
            </div>
            <div class="p-6">
              <img
                  src="/xx.jpg"
                  alt="Fruits"
                  class="mx-auto aspect-content overflow-hidden rounded object-cover"
                  width="200"
                  height="200"
              />
              <p class="text-center">Fresh and organic fruits</p>
            </div>
          </div>
          <div class="border text-card-foreground bg-white rounded shadow-md" data-v0-t="card">
            <div class="flex flex-col space-y-1.5 p-6">
              <h2 class="text-lg font-bold">蔬菜</h2>
            </div>
            <div class="p-6">
              <img
                  src="/scan.jpg"
                  alt="Vegetables"
                  class="mx-auto aspect-content overflow-hidden rounded object-cover"
                  width="200"
                  height="200"
              />
              <p class="text-center">产地实拍</p>
            </div>
          </div>
          <div class="border text-card-foreground bg-white rounded shadow-md" data-v0-t="card">
            <div class="flex flex-col space-y-1.5 p-6">
              <h2 class="text-lg font-bold">蔬菜</h2>
            </div>
            <div class="p-6">
              <img
                  src="/scan.jpg"
                  alt="Vegetables"
                  class="mx-auto aspect-content overflow-hidden rounded object-cover"
                  width="200"
                  height="200"
              />
              <p class="text-center">产地实拍</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="w-full py-12 md:py-24 lg:py-32 bg-green-50">
      <div class="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div class="space-y-3">
          <h2 class="text-3xl font-bold tracking-tighter md:text-4xl">Contact Us</h2>
          <p class="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
            Have any questions? Get in touch with us
          </p>
        </div>
        <div class="mx-auto w-full max-w-sm space-y-2">
          <a
              class="inline-flex items-center justify-center rounded-md bg-green-600 px-8 text-sm font-medium text-white transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-800"
              href="#"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
    <section class="w-full py-12 md:py-24 lg:py-32 border-t">
      <div class="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div class="space-y-3">
          <h2 class="text-3xl font-bold tracking-tighter md:text-4xl">Subscribe to Our Newsletter</h2>
          <p class="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
            Stay updated with our latest products and offers
          </p>
        </div>
        <div class="mx-auto w-full max-w-sm space-y-2">
          <form class="flex space-x-2">
            <input
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-lg flex-1"
                placeholder="Enter your email"
                type="email"
            />
            <button
                class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                type="submit"
            >
              Subscribe
            </button>
          </form>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            We respect your privacy.
            <a class="underline underline-offset-2" href="#">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </section>
  </main>
  <footer class="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
    <p class="text-xs text-gray-500 dark:text-gray-400">© AgroProducts. All rights reserved.</p>
    <nav class="sm:ml-auto flex gap-4 sm:gap-6">
      <a class="text-xs hover:underline underline-offset-4" href="#">
        Terms of Service
      </a>
      <a class="text-xs hover:underline underline-offset-4" href="#">
        Privacy
      </a>
    </nav>
  </footer>
  </template>
  <script setup lang="ts">
</script>