
const USERNAME_INPUT = "#user-name"

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

}

export default productPage