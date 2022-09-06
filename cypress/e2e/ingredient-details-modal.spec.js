describe('open and close ingredient details modal', () => {
  before(() => {
    cy.visit('http://localhost:3000');
  });
  it('open ingredient details modal, verify data and close', () => {
    let ingredientName;

    cy.get('#bun').parent().find('a').first().as('firstBun');
    cy.get('@firstBun').find('[class^=draggable-ingredient_text]').then((el) => {
      ingredientName = el.text();
    }).then(() => {
      cy.get('@firstBun').click();
      cy.get('#react-modals').contains(ingredientName);
      cy.get('#react-modals').find('li p[class^=text_type_digits-default]').each((item) => {
        cy.get(item).invoke('text').then((text) => {
          cy.wrap(Number(text)).should('be.gt', 0);
        })
      })
    }).then(() => {
      cy.get('#react-modals').find('[class^=modal_closeIcon]').first().click();
    });

    cy.get('.modal_container').should('not.exist');
  })
})
