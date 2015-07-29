'use strict';

votacaoApp.controller('VotacaoCtrl', function($scope, $http, _, goLocation, Bandas, Votacao, youtubeEmbedUtils){
    $scope.proximaVotacao = function(){        
        if($scope.indexVotacao < $scope.votacoes.length){        
            $scope.bandaUm = $scope.votacoes[$scope.indexVotacao].bandaUm;
            $scope.bandaUmYoutube = $scope.votacoes[$scope.indexVotacao].bandaUm.idYoutube;

            $scope.bandaDois = $scope.votacoes[$scope.indexVotacao].bandaDois;
            $scope.bandaDoisYoutube = $scope.votacoes[$scope.indexVotacao].bandaDois.idYoutube;

            $scope.indexVotacao = $scope.indexVotacao + 1;                        
        }else{
            $scope.showModal($scope);
        }
    };   
    
    $scope.analiseCombinatoria = function(bandas){
        var votacoes = [];
        var indexVotacao = 0;
        // Análise Combinatória.
        for(var i = 0; i < bandas.length -1; i++){
            for(var j = i + 1; j < bandas.length; j++){
                votacoes[indexVotacao] = {
                                            "bandaUm": bandas[i], 
                                            "bandaDois": bandas[j]
                                          };
                indexVotacao++;
            }
        }
        
        return votacoes;
    };
    
    Bandas.get().then(function(resp){ 
        $scope.bandas = resp.data;
        $scope.votacoes = $scope.analiseCombinatoria($scope.bandas);
        $scope.indexVotacao = 0;  
        $scope.proximaVotacao();
    });
    
    $scope.findBanda = function(id){
        return _.find($scope.bandas, function(banda){
            return banda._id == id; 
        });
    }
    
    $scope.votarBanda = function(id){
        var index = $scope.indexVotacao -1;
        var banda = $scope.findBanda(id);
        if(!banda.votos){
            banda.votos = 1;
        }else{
            banda.votos = banda.votos + 1;
        }                    

        Materialize.toast('Banda ' + banda.nome + ' votada!', 2000); 
        $scope.proximaVotacao();  
    };
    
    $scope.votarBandaUm = function(){
        var index = $scope.indexVotacao -1;
        $scope.votarBanda($scope.votacoes[index].bandaUm._id);      
    };

    
    $scope.votarBandaDois = function(){
        var index = $scope.indexVotacao -1;
        $scope.votarBanda($scope.votacoes[index].bandaDois._id);          
    };        
    
    $scope.showModal = function($scope){
        $scope.nome = "";
        $scope.email = "";
        
        var modal = angular.element('#modal');
        modal.openModal();    
    }    
    
    $scope.enviarVotacao = function(){
        for(var i = 0; i < $scope.bandas.length; i++){
            if(!$scope.bandas[i].votos){
                $scope.bandas[i].votos = 0;
            }
        }
        
        var sendVotacao = {
                        "nome": $scope.nome,
                        "email": $scope.email,
                        "votos": $scope.bandas                                
                      };
        
        Votacao.post(sendVotacao)
            .success(function(resp){
                Materialize.toast('Votação Conluída!', 2000); 
                goLocation.go('/obrigado');
            })
            .error(function(resp, status){
                if(status = 400)
                   Materialize.toast('Você já utilizou esse e-mail para a votação! Quer que sua banda esteja no topo? Então convide seus amigos para participar da votação! (:', 2000);          
            });    
    }
    
});