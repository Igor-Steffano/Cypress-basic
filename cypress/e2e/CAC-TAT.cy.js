/// <reference types="Cypress" />



///const { functions } = require("cypress/types/lodash") Verificar com o marcelo

describe('Central de Atendimento ao Cliente TAT', function() {
    const THREE_SECONDS_IN_MS = 3000
  
    beforeEach(() => {
        cy.visit('./src/index.html')
      })
    
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })


    it('preenche os campos obrigatórios e envia o formulario', function() {
    const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam commodo lorem vel elit cursus faucibus. Ut a justo id enim malesuada fermentum id non libero. Mauris elementum bibendum sem sit amet tristique. In sit amet lacinia nibh. Curabitur nec euismod dui, venenatis tristique est. Phasellus eget posuere erat.'

    cy.clock()

    cy.get('#firstName').type('Igor Steffano')
    cy.get('#lastName').type('Viana Alves')
    cy.get('#email').type('igor.viana1@live.com')
    cy.get('#open-text-area').type(longText, {delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.success').should('not.be.visible')

  })

  //Exercício extra 2
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {

        cy.clock()

        cy.get('#firstName').type('Igor Steffano')
        cy.get('#lastName').type('Viana Alves')
        cy.get('#email').type('igor.viana1.live.com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
        })

    //Exercício extra 3

    it('Campo telefone só aceita numeros', function(){
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })

        //Exercício extra 4
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Igor Steffano')
        cy.get('#lastName').type('Viana Alves')
        cy.get('#email').type('igor.viana1.live.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('Prenche e limpa os campos nome, sobrenome, email e telefone', function (){

      cy.get('#firstName')
        .type('Igor Steffano')
        .should('have.value', 'Igor Steffano')
        .clear()
        .should('have.value', '')
      cy.get('#lastName')
        .type('Viana Alves')
        .should('have.value', 'Viana Alves')
        .clear()
        .should('have.value', '')
      cy.get('#email')
        .type('igor.viana1@live.com')
        .should('have.value', 'igor.viana1@live.com')
        .clear()
        .should('have.value', '')
      cy.get('#phone')
        .type('27999814320') //tentar colocar o delay 0
        .should('have.value','27999814320')
        .clear()
        .should('have.value', '')
    })

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')
    })

    it('envia formulário com sucesso usando um comando customizado', () => {
      cy.fillMandatoryFieldsAndSubmit()
      cy.get('.success').should('be.visible')
    })

    it('Encontrar texto em mensagem' , function(){

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

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um aliass', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
          .selectFile('@sampleFile')
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
      })
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
      cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')
      cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
    })
    
    it('preenche a area de texto usando o comando invoke', ()=> {
      const longText = Cypress._.repeat('0123456789', 20)

      cy.get('#open-text-area')
        .invoke('val', longText)
        .should('have.value', longText)
    })

    it('faz requisição HTTP', ()=> {
      cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response){
          const {status, statusText, body} = response
          expect(status).to.equal(200)
          expect(statusText).to.equal('OK')
          expect(body).to.include('CAC TAT')
        })
    })
    it.only('encontra o gato escondido', function(){
      cy.get('#cat')
        .invoke('show')
        .should('be.visible')
      cy.get('#title')
        .invoke('text', 'CAT TAT')
      cy.get('#subtitle')
        .invoke('text', 'Eu consegui finalizar um curso!')
    })
})