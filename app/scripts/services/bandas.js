'use strict';

votacaoApp.factory('Bandas', function($http){
    return {
        get: function(){
            return $http.get('https://bluesoftmusic-api.herokuapp.com/api/bandas');            
        }
    }
});