/// <reference types="cypress" />

describe('Find the fake gold bar', () => {
    beforeEach(() => {
        cy.visit('http://sdetchallenge.fetch.com/');
    });

    const weighBars = (leftBars, rightBars) => {
        // Locate the left bowl input fields and enter the leftBars values
        leftBars.forEach((bar, index) => {
            cy.get(`#left_${index}`).clear().type(bar);
        });

        // Locate the right bowl input fields and enter the rightBars values
        rightBars.forEach((bar, index) => {
            cy.get(`#right_${index}`).clear().type(bar);
        });

        // Hardcoded 4 seconds wait was trouble shooting wait until
        cy.get('button').contains('Weigh').click().wait(4000);
    };

    const checkWeightResult = () => {
        return cy.get('#reset').invoke('text');
    };

    it('find the fake gold bar with minimal weighings', () => {
        weighBars([0, 1, 2], [3, 4, 5]);

        checkWeightResult().then(result => {
            if (result.includes('=')) {

                cy.get('#reset.button').contains('Reset').click();
                weighBars([6], [7]);
                checkWeightResult().then(result => {
                    if (result.includes('=')) {
                        cy.get('#coin_8').click();
                    } else if (result.includes('<')) {
                        cy.get('#coin_6').click();
                    } else {
                        cy.get('#coin_7').click();
                    }
                });

            } else if (result.includes('<')) {
                cy.get('#reset.button').contains('Reset').click();
                weighBars([0], [1]);

                checkWeightResult().then(result => {
                    if (result.includes('=')) {
                        cy.get('#coin_2').click();
                    } else if (result.includes('<')) {
                        cy.get('#coin_0').click();
                    } else {
                        cy.get('#coin_1').click();
                    }
                });
            } else {
                cy.get('#reset.button').contains('Reset').click();
                weighBars([3], [4]);

                checkWeightResult().then(result => {
                    if (result.includes('=')) {
                        cy.get('#coin_5').click();
                    } else if (result.includes('<')) {
                        cy.get('#coin_3').click();
                    } else {
                        cy.get('#coin_4').click();
                    }
                });
            }
        });

        cy.on('window:alert', (text) => {
            expect(text).to.contains('Yay! You find it!');
        });
    });
});
