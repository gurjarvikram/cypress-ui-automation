import { faker } from '@faker-js/faker';
// Generate random details using faker
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const postalCode = faker.address.zipCode();

class productPage {

    static sortingIcon() {
        // Ascending order assertion
        cy.get('.product_sort_container') // Select all elements with class 'item'
            .then($items => {
                // Extract the text content of each item into an array
                const texts = [...$items].map(item => item.innerText);

                // Clone and sort the array
                const sortedTexts = [...texts].sort();

                // Assert that the original array is equal to the sorted array
                expect(texts).to.deep.equal(sortedTexts);
            });

    }
    static z_To_a() {
        cy.get(".product_sort_container").select('Name (Z to A)')
    }
    static result_sorting() {
        // Descending order assertion
        cy.get("div[class='inventory_item']") // Select all elements with class 'item'
            .then($items => {
                // Extract the text content of each item into an array
                const texts = [...$items].map(item => item.innerText);

                // Clone and sort the array in descending order
                const sortedTexts = [...texts].sort().reverse();

                // Assert that the original array is equal to the sorted array
                expect(texts).to.deep.equal(sortedTexts);
            });
    }
    static add_cart_btn_single_prod() {
        cy.get('.title')
            .should('contain', 'Products')
        cy.get("#add-to-cart-sauce-labs-backpack").click()
    }
    static add_cart_btn_multi_prod() {
        cy.get('.title')
            .should('contain', 'Products')
        cy.get("#add-to-cart-sauce-labs-backpack").click()
            .get("#add-to-cart-sauce-labs-bike-light").click()
    }
    static shopping_cart_badge() {
        cy.get(".shopping_cart_badge").click()
        cy.url()
            .should('include', 'cart.html')
    }
    static product_qty() {
        // Retrieve all elements with the class 'inventory_item_name'        
        cy.get("div[class='inventory_item_name']").then(($elements) => {
            const length = $elements.length;

            // If only one element is found, assert that the length is 1
            if (length === 1) {
                cy.get("div[class='inventory_item_name']").should('have.length', 1);
            }
            // If more than one element is found, assert that the length is greater than 1
            else {
                cy.get("div[class='inventory_item_name']").should('have.length.greaterThan', 1);
            }
        });

    }
    static your_cart_details() {
        // Ensure the title 'Your Cart' is displayed
        cy.get('.title')
            .should('contain', 'Your Cart')

        // Ensure the quantity label is displayed
        cy.get('.cart_quantity_label')
            .should('contain', 'QTY')

        // Ensure the description label is displayed
        cy.get('.cart_desc_label')
            .should('contain', 'Description')

        // Ensure the remove button is displayed
        cy.get('#remove-sauce-labs-backpack')
            .should('contain', 'Remove')

        // Ensure the Continue Shopping button is displayed
        cy.get('#continue-shopping')
            .should('contain', 'Continue Shopping')

        // Ensure the Checkout button is displayed
        cy.get('#checkout')
            .should('contain', 'Checkout')

        // Ensure the product is displayed in the cart
        cy.get('.inventory_item_name')
            .should('be.visible')
    }
    static remove_product_cart() {
        // Click the remove button for the product
        cy.get('#remove-sauce-labs-backpack').click()

        // Ensure the product is removed from the cart
        cy.get('.inventory_item_name')
            .should('not.exist')
    }
    static empty_cart() {
        // Ensure the product is removed from the cart
        cy.get('.inventory_item_name')
            .should('not.exist')

        // Ensure the cart badge is empty
        cy.get('.shopping_cart_badge')
            .should('not.exist')
    }
    static checkout_btn() {
        // Click on the checkout button from the cart
        cy.get("#checkout").click()
    }
    static click_continue_btn() {
        // Click on the continue button from the cart
        cy.get("#continue").click()
    }
    static validation_msg() {
        cy.get("h3[data-test='error']")
            .should('have.text', 'Error: First Name is required')

        cy.get('#first-name').type(firstName)
        cy.get("#continue").click()

        cy.contains('Error: Last Name is required')
            .should('contain', 'Error: Last Name is required')

        cy.get('#last-name').type(lastName)
        cy.get("#continue").click()
        cy.contains('Error: Postal Code is required')
            .should('contain', 'Error: Postal Code is required')
    }
    static navigate_To_checkout() {
        // Ensure the navigate to the checkout page
        cy.url().should('include', 'checkout-step-one.html')

        // Ensure the title 'Checkout: Your Information' is displayed
        cy.get('.title')
            .should('contain', 'Checkout: Your Information')
    }
    static fill_customer_details() {
        cy.get('#first-name').type(firstName)
        cy.get('#last-name').type(lastName)
        cy.get('#postal-code').type(postalCode)

    }
    static continue_btn() {
        cy.get('#continue').click()

        // Ensure the URL includes 'checkout-step-two.html'
        cy.url()
            .should('include', 'checkout-step-two.html')
    }
    static order_overview() {
        // Ensure the title 'Checkout: Overview' is displayed
        cy.get('.title')
            .should('contain', 'Checkout: Overview')

        // Ensure the quantity label is displayed
        cy.get('.cart_quantity_label')
            .should('contain', 'QTY')

        // Ensure the description label is displayed
        cy.get('.cart_desc_label')
            .should('contain', 'Description')

        // Ensure the product is displayed in the cart
        cy.get('.inventory_item_name')
            .should('be.visible')

        // Ensure the payment info is displayed in the cart
        cy.get("div[data-test='payment-info-label']")
            .should('contain', 'Payment Information')

        // Ensure the Shipping Information is displayed in the cart
        cy.get("div[data-test='shipping-info-label']")
            .should('contain', 'Shipping Information')

        // Ensure the Price Total is displayed in the cart
        cy.get("div[data-test='total-info-label']")
            .should('contain', 'Price Total')

        // Ensure the Cancel button is displayed
        cy.get('#cancel')
            .should('contain', 'Cancel')
    }
    static finish_btn() {
        // Click the finish button for the product
        cy.get('#finish').click()
    }
    static complete_order() {
        // Ensure the URL includes 'checkout-complete.html'
        cy.url()
            .should('include', 'checkout-complete.html')

        // Ensure the order confirmation message is displayed correctly
        cy.contains('Thank you for your order!')
            .should('have.text', 'Thank you for your order!')

        // Ensure the title 'Checkout: Complete!' is displayed
        cy.get('.title')
            .should('contain', 'Checkout: Complete!')

        // Ensure the 'Back Home' button is displayed
        cy.contains('button', 'Back Home')
            .should('be.visible')
    }
}

export default productPage