'use strict';

describe('Controller: VotacaoCtrl', function () {

  // load the controller's module
  beforeEach(module('votenabandaApp'));

  var scope,
      _underscore,
      youtubeEmbed;
    
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _, youtubeEmbedUtils) {
    scope = $rootScope.$new();
    _underscore = _;
    youtubeEmbed = youtubeEmbedUtils;
  }));
    
  it('deve definir bandas', function ($controller) {  
    var bandasMock = [  {
                                nome: 'The Who'                            
                            },
                            {
                                nome: 'The Beach Boys'
                            },
                            {
                                nome: 'Shocking Blue'
                            }
                         ];
      
    var MainCtrl = $controller('MainCtrl', {
      $scope: scope, 
      _: _underscore,
      youtubeEmbedUtils: youtubeEmbed,
      bandas: bandasMock      
    });
      
    expect(scope.bandas).toBeDefined(); 
    expect(scope.bandas).toEqual(bandasMock); 
  });
    
  it('deve definir a votação através de análise combinatória', function($controller){
    var bandasMock =  [  {
                                nome: 'The Who'                            
                            },
                            {
                                nome: 'The Beach Boys'
                            },
                            {
                                nome: 'Shocking Blue'
                            }
                         ]; 
      
    var MainCtrl = $controller('MainCtrl', {
      $scope: scope, 
      _: _underscore,
      youtubeEmbedUtils: youtubeEmbed
    });

    expect(scope.analiseCombinatoria).toBeDefined();
    var votacoes = scope.analiseCombinatoria(bandasMock);
    expect(votacoes).toEqual(
                            [   {
                                    bandaUm:  {
                                                nome: 'The Who'                            
                                              },
                                    bandaDois: {
                                                nome: 'The Beach Boys'
                                            }
                                },
                                {
                                    bandaUm:  {
                                                nome: 'The Who'                            
                                              },
                                    bandaDois: {
                                                nome: 'Shocking Blue'
                                            }
                                },
                                {
                                    bandaUm:  {
                                                nome: 'The Beach Boys'                            
                                              },
                                    bandaDois: {
                                                nome: 'Shocking Blue'
                                            }
                                }
                            ]                                  
    );
    
  
  });    
    
  it('deve realizar a transição da votação', function($controller){
        var BandasMock = [  {
                                    nome: 'The Who'                            
                                },
                                {
                                    nome: 'The Beach Boys'
                                },
                                {
                                    nome: 'Shocking Blue'
                                }
                             ];
        var VotacaoMock = {
                            post: function(){}
        };
        var goLocationMock = {
                                go: function(){}
        };

        var MainCtrl = $controller('MainCtrl', {
              $scope: scope, 
              _: _underscore,
              youtubeEmbedUtils: youtubeEmbed,
              Bandas: BandasMock,
              Votacao: VotacaoMock,
              goLocation: goLocationMock
            });

        scope.votarBandaUm();
        expect($scope.indexVotacao).toBe(2);
        expect($scope.bandas[0].votos).toBe(1);
      });
    
    
});
