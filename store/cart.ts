import { defineStore } from "pinia"

type StateTypes = {
    cart: Array<{
        num: number,
        product: any
    }>
}
export const CartStore = defineStore("Cart", {
    state(): StateTypes {
        return {
            cart: []
        }
    },
    actions: {
        addToCart(product: any) {
            const p = this.cart.find(p => p.product.id === product.id)
            if (p) {
                p.num += 1
            } else {
                this.cart.push({
                    num: 1,
                    product
                })
            }
        },
        delToCar(prpduct: any) {
            const p = this.cart.find(p => p.product.id === prpduct.id)
            if (p) {
                if (p.num === 1) {
                    const i = this.cart.findIndex(p => p.product.id === prpduct.id)
                    this.cart.splice(i, 1)
                } else {
                    p.num -= 1
                }
            }
        }
    }
})