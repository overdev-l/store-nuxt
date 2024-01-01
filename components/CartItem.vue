<template>
    <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
        <div class="p-6 grid gap-4">
            <div class="grid gap-2.5 relative group">
                <a class="absolute inset-0 z-10" href="#">
                    <span class="sr-only">View</span>
                </a>
                <img src="/xx.jpg" alt="Product 1"
                    class="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity" />
                <div class="grid gap-1 w-full">
                    <div class="flex items-center gap-2">
                        <h4 class="font-semibold">Product 1</h4>
                        <h5 class="font-semibold ml-auto">$29.99</h5>
                    </div>
                    <div class="flex items-center gap-3 w-full">
                        <p class="font-semibold">数量:</p>
                        <button
                            class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground px-3 py-2 w-7 h-7">
                            -
                        </button>
                        <p class="font-semibold">1</p>
                        <button
                            class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground px-3 py-2 w-7 h-7">
                            +
                        </button>
                    </div>
                </div>
            </div>
<!--            <button-->
<!--                class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full">-->
<!--                Remove from cart-->
<!--            </button>-->
        </div>
    </div>
</template>
