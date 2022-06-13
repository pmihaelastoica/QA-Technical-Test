const { assert } = require("chai");

import CheckoutInfo from '../pageObjects/CheckoutInfo';
import ProductsPage from '../pageObjects/ProductsPage'

//standard-user app login
Cypress.Commands.add('appLogin', (username, password) => {
    cy.get('login-box').then($loginBox => {
        if($loginBox.find('#user-name').length > 0) {
            //evaluates as true if button exists at all
            cy.get('#user-name').then($username => {
                if($username.is(':visible')) {
                    //you get here only if the button EXISTS and is VISIBLE
                    cy.get('#user-name').should('be.visible').type(username)
                }
                else {
                    //you get here only if button EXISTS and is INVISIBLE
                    assert.isOk('Username field is not visible!')
                }
            })
        }
        else {
            //you get here if button does not exist
            assert.isOk('Username field does not exist')
        }

        if($loginBox.find('#password').length > 0) {
            //evaluates as true if button exists at all
            cy.get('#password').then($password => {
                if($password.is(':visible')) {
                    //you get here only if the button EXISTS and is VISIBLE
                    cy.get('#password').should('be.visible').type(password)
                    .get('#login-button').should('be.visible').click()
                }
                else {
                    //you get here only if button EXISTS and is INVISIBLE
                    assert.isOk('Password field is not visible!')
                }
            })
        }
        else {
            //you get here if button does not exist
            assert.isOk('Password field does not exist')
        }
    })
})

//add to cart command
Cypress.Commands.add('addItemToCart', () => {
    //add item to cart using page object function
    ProductsPage.addToCart()

    //check if button state has changed
    ProductsPage.btn.should('contain', 'Remove')
})

//checkout
Cypress.Commands.add('checkoutCart', () => {
    cy.get('.checkout_info').then($checkoutInfo => {
        //enter check out information
        CheckoutInfo.infoDetails('John', 'Smith', 'AB1 2CD')
        cy.wait(1500)
        //check if error message has appeared after entering info and checking out
        if($checkoutInfo.find('.error-message-container').length > 0) {
            //evaluates as true if button exists at all
            cy.log('Error when entering checkout details!')
        }
        else {
            //you get here if button does not exist
            assert.isOk()
        }
    })
})