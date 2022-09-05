describe('drag & drop of ingredients and placing the order', () => {
  const dataTransfer = new DataTransfer();
  let ingredientName;
  let price;
  let total = 0;

  before(() => {
    cy.visit('http://localhost:3000');
  });

  it('should drag bun to the burger constructor', () => {
    cy.get('[class^=burger-constructor_dropTarget]').as('target');
    cy.get('#bun').parent().find('a').first().as('firstBun');
    cy.get('@firstBun').find('[class^=draggable-ingredient_text]').then((el) => {
      ingredientName = el.text();
    });

    cy.get('@firstBun').find('[class^=draggable-ingredient_priceNum]').invoke('text').then((text) => {
      price = Number(text);
    });

    cy.get('@firstBun').trigger('dragstart', {
      dataTransfer
    });

    cy.get('@target').trigger('drop', {
      dataTransfer
    }).then(() => {
      // показать правильное количество выбранных ингридиентов
      cy.get('@firstBun').find('[class^=counter_counter__num]').invoke('text').then((text) => {
        expect(text).equal('2');
      });

      // Название верхней булки должно совпадать и быть с префиксом (верх)
      cy.get('@target').find('[class~=constructor-element_pos_top] [class^=constructor-element__text]').invoke('text').then((text) => {
        expect(text).equal(`${ingredientName} (верх)`);
      });

      // Название нижней булки должно совпадать и быть с префиксом (низ)
      cy.get('@target').find('[class~=constructor-element_pos_bottom] [class^=constructor-element__text]').invoke('text').then((text) => {
        expect(text).equal(`${ingredientName} (низ)`);
      });

      // Цена должна быть посчитана верно
      cy.get('section[class^=order-button_main]').find('span[class*=text_type_digits]').as('TotalPrice')
      cy.get('@TotalPrice').invoke('text').then((text) => {
        total = price * 2;
        expect(Number(text)).equal(total);
      });
    });
  });

  it('should drag ingredient to the burger constructor', () => {
    cy.get('[class^=burger-constructor_dropTarget]').as('target');
    // Перетаскиваем ингредиент
    cy.get('#main').parent().find('a').first().as('firstIngredient');

    cy.get('@firstIngredient').trigger('dragstart', {
      dataTransfer
    });

    cy.get('@target').trigger('drop', {
      dataTransfer
    }).then(() => {
      cy.get('@firstIngredient').find('[class^=draggable-ingredient_priceNum]').invoke('text').then((text) => {
        price = Number(text);
      });

      // подчёт стоимости заказа
      cy.get('section[class^=order-button_main]').find('span[class*=text_type_digits]').as('TotalPrice')
      cy.get('@TotalPrice').invoke('text').then((text) => {
        total += price;
        expect(Number(text)).equal(total);
      })
    });
  });

  it('should place order', () => {
      cy.get('button[class*=button_button_type_primary]').click();

      if (cy.contains('Вход')) {
        cy.get('input[name=email]').type('svetomir7@yandex.ru');
        cy.get('input[name=password]').type('trigrong');
        cy.get('button').contains('Войти').click();
      }

      cy.get('#react-modals', {timeout: 30000}).should('contain', 'идентификатор заказа').then(() => {
        cy.get('#react-modals').find('[class^=order-confirm_text]').invoke('text').then((text) => {
          // eslint-disable-next-line jest/valid-expect
          expect(text.length).to.be.at.least(5);
        })
      });
  });
})
