/// <reference types ="cypress"/>

describe('Log in to the app Test', () => {
    before(function () {
        // This will run once before the test begins
        cy.visit("https://www.saucedemo.com/")
        cy.wait(5000)
    })

    beforeEach(() => {
        // This will run before each individual test
        Cypress.Cookies.preserveOnce('session-username', 'standard_user')
    })
    
    afterEach(function () {
        // This will run after each individual test
        cy.wait(1500)
    })

    it('should login to the app', () => {
        cy.appLogin('standard_user','secret_sauce')
    })

    it('should verify if directed to landing page', () => {
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
        cy.get('.title').should('contain.text', 'Products')
    })

    it('should add random item to cart', () =>{
        cy.addItemToCart()
    })

    it('should navigate to cart', () => {
        cy.get('.shopping_cart_badge').should('exist').click()
        cy.wait(2000)
        cy.url().should('eq', 'https://www.saucedemo.com/cart.html')
    })

    it('should verify that item is in cart', () => {
        cy.get('div[class="cart_item"]').should('exist')
    })

    it('should enter checkout details', () => {
        cy.checkoutCart()
    })

    it('should finish checkout process', () => {
        cy.url().should('eq', 'https://www.saucedemo.com/checkout-step-two.html')
        cy.get('.summary_info').should('exist')
        cy.get('#finish').should('exist').click()
    })

    it('should verify order is complete', () => {
        cy.url().should('eq', 'https://www.saucedemo.com/checkout-complete.html')
        cy.get('.complete-header').should('contain', 'THANK YOU FOR YOUR ORDER')
    })
})