'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('votenabandaApp'));

  var scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
  }));

  it('deve definir go', function ($controller) {  
    var goLocationMock = {
                            go: function(url){
                                return "";
                            }
                        };
      
    var MainCtrl = $controller('MainCtrl', {
      $scope: scope, 
      goLocation: goLocationMock
    });
      
    expect(scope.go).toBeDefined(); 
  });
});
