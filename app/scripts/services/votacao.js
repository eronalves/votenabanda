'use strict';

votacaoApp.factory('Votacao', function($http){
    return {
        get: function(params){
            var url = 'https://bluesoftmusicvotacao-api.herokuapp.com/api/votacao/' + params.email;
            return $http({
                url: url, 
                method: 'GET'
             });
        },
        post: function(params){
            return $http({
                method: 'POST',
                url: 'https://bluesoftmusicvotacao-api.herokuapp.com/api/votacao',
                data: params
            });           
    
    }
}});
