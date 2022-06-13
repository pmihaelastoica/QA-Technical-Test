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
})