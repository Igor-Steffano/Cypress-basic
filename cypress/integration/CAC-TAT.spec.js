/// <reference types="Cypress" />

///const { functions } = require("cypress/types/lodash") Verificar com o marcelo

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => {
        cy.visit('./src/index.html')
      })
    
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })


    it('preenche os campos obrigatórios e envia o formulario', function() {
    const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam commodo lorem vel elit cursus faucibus. Ut a justo id enim malesuada fermentum id non libero. Mauris elementum bibendum sem sit amet tristique. In sit amet lacinia nibh. Curabitur nec euismod dui, venenatis tristique est. Phasellus eget posuere erat.'

    cy.get('#firstName').type('Igor Steffano')
    cy.get('#lastName').type('Viana Alves')
    cy.get('#email').type('igor.viana1@live.com')
    cy.get('#open-text-area').type(longText, {delay: 0 })
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

  //Exercício extra 2
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Igor Steffano')
        cy.get('#lastName').type('Viana Alves')
        cy.get('#email').type('igor.viana1.live.com')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
        })

    //Exercício extra 3

    it('Campo telefone só aceita numeros', function(){
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Igor Steffano')
        cy.get('#lastName').type('Viana Alves')
        cy.get('#email').type('igor.viana1.live.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
          .select('YouTube')
          .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
          .select('mentoria')
          .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
          .select(1)
          .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback', function(){
        cy.get('input[type="radio"][value="feedback"]')
          .check()
          .should('be.checked')
    })
    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
          })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it("seleciona um arquivo da pasta fixtures", function() {
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json')
          .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
          })
    })

    it('simula um arquivo drag em drop', function() {
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
          .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
          })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
          .selectFile('@sampleFile')
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
      })
    })
})