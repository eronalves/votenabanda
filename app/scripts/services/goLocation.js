'use strict';

votacaoApp.service('goLocation', function($location){
    return {
        go: function(url){
            $location.path(url);
        }
    }
});