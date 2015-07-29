'use strict';

describe('Service: Votacao', function () {
  var votacaoService, httpBackend;

  beforeEach(module('votenabandaApp'));

  beforeEach(inject(function (Votacao, $httpBackend) {
    votacaoService = Votacao;
    httpBackend = $httpBackend;
  }));

  it('deve realizar chamada HTTP POST e enviar os dados da votação', function () {
    var mockJSON = {data: 'mock'};
      
    httpBackend.whenPOST('https://bluesoftmusicvotacao-api.herokuapp.com/api/votacao').respond({success: true});
      
    votacaoService.post(mockJSON).then(function(data) {
      expect(data.data).toEqual({success: true});
    });
      
    httpBackend.flush();
  });

});