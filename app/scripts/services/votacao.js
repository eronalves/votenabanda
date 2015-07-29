'use strict';

votacaoApp.factory('Votacao', function($http){
    return {
        post: function(params){
            return $http({
                method: 'POST',
                url: 'https://bluesoftmusicvotacao-api.herokuapp.com/api/votacao',
                data: params
            });           
    
    }
}});
