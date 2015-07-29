'use strict';

describe('Service: Bandas', function () {
  var bandasService, httpBackend;

  beforeEach(module('votenabandaApp'));

  beforeEach(inject(function (Bandas, $httpBackend) {
    bandasService = Bandas;
    httpBackend = $httpBackend;
  }));

  it('deve realizar chamada HTTP Get e retornar os dados das bandas', function () {
    var bandasJSON = {nome: 'The who'};
      
    httpBackend.whenGET('https://bluesoftmusic-api.herokuapp.com/api/bandas').respond(bandasJSON);
      
    bandasService.get().then(function(data) {
      expect(data.data).toEqual(bandasJSON);
    });
          
    httpBackend.flush();
  });

});