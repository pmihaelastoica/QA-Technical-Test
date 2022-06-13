class ProductsPage {
    get btn() {
        return cy.get('.btn_inventory')
    }

    addRandom(item) {
        return item[Math.floor(Math.random() * item.length)]
    }

    addToCart() {
        this.btn.then(($item) =>
            this.addRandom($item).click()
        )
    }

    error() {
        return cy.get(".error")
    }
}

export default new ProductsPage()