"use strict";var votacaoApp=angular.module("votenabandaApp",["ngResource","ngRoute","underscore","youtube-embed"]);votacaoApp.config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/votacao",{templateUrl:"views/votacao.html",controller:"VotacaoCtrl"}).when("/obrigado",{templateUrl:"views/obrigado.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),votacaoApp.controller("MainCtrl",["$scope","goLocation",function(a,b){a.go=b.go}]),votacaoApp.controller("VotacaoCtrl",["$scope","$http","_","goLocation","Bandas","Votacao","youtubeEmbedUtils",function(a,b,c,d,e,f,g){a.proximaVotacao=function(){if(a.indexVotacao<a.votacoes.length){a.bandaUm=a.votacoes[a.indexVotacao].bandaUm,a.bandaUmYoutube=a.votacoes[a.indexVotacao].bandaUm.idYoutube,a.bandaDois=a.votacoes[a.indexVotacao].bandaDois,a.bandaDoisYoutube=a.votacoes[a.indexVotacao].bandaDois.idYoutube,a.indexVotacao=a.indexVotacao+1;var b=100*(a.indexVotacao-1)/a.votacoes.length;a.percentual=b+"%"}else a.percentual="100%",a.showModal(a)},a.analiseCombinatoria=function(a){for(var b=[],c=0,d=0;d<a.length-1;d++)for(var e=d+1;e<a.length;e++)b[c]={bandaUm:a[d],bandaDois:a[e]},c++;return b},e.get().then(function(b){a.bandas=b.data,a.votacoes=a.analiseCombinatoria(a.bandas),a.indexVotacao=0,a.proximaVotacao(),a.nome="",a.email=""}),a.findBanda=function(b){return c.find(a.bandas,function(a){return a._id==b})},a.votarBanda=function(b){if(!a.votacaoFinalizada){var c=(a.indexVotacao-1,a.findBanda(b));c.votos?c.votos=c.votos+1:c.votos=1,Materialize.toast("Banda "+c.nome+" votada!",2e3)}a.proximaVotacao()},a.votarBandaUm=function(){var b=a.indexVotacao-1;a.votarBanda(a.votacoes[b].bandaUm._id)},a.votarBandaDois=function(){var b=a.indexVotacao-1;a.votarBanda(a.votacoes[b].bandaDois._id)},a.showModal=function(a){a.votacaoFinalizada=!0;var b=angular.element("#modal");b.openModal()},a.enviarVotacao=function(){if(a.nome&&a.email){var b={email:a.email};f.get(b).then(function(b){if(b.data)Materialize.toast("Você já utilizou esse e-mail para a votação! Quer que sua banda esteja no topo? Então convide seus amigos para participar da votação! (:",8e3),d.go("/");else{for(var c=0;c<a.bandas.length;c++)a.bandas[c].votos||(a.bandas[c].votos=0);var e={nome:a.nome,email:a.email,votos:a.bandas};f.post(e).success(function(a){Materialize.toast("Votação Conluída!",2e3),d.go("/obrigado")}).error(function(a,b){(b=400)&&Materialize.toast("Você já utilizou esse e-mail para a votação! Quer que sua banda esteja no topo? Então convide seus amigos para participar da votação! (:",2e3)})}})}else Materialize.toast("Preencha corretamente o formulário para enviar seus votos.",2e3)}}]),votacaoApp.service("goLocation",["$location",function(a){return{go:function(b){a.path(b)}}}]),votacaoApp.factory("Bandas",["$http",function(a){return{get:function(){return a.get("https://bluesoftmusic-api.herokuapp.com/api/bandas")}}}]),votacaoApp.factory("Votacao",["$http",function(a){return{get:function(b){var c="https://bluesoftmusicvotacao-api.herokuapp.com/api/votacao/"+b.email;return a({url:c,method:"GET"})},post:function(b){return a({method:"POST",url:"https://bluesoftmusicvotacao-api.herokuapp.com/api/votacao",data:b})}}}]);