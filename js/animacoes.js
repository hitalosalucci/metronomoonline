//quando clicar no botao opcoes, vai exibir ou ocultar a div com as opçẽos
const opcoes_btn = document.getElementById('opcoes_btn');

var visibilidade = false; //Variável que vai manipular o botão Exibir/ocultar

opcoes_btn.addEventListener('click', function(){

    if (visibilidade) {//Se a variável visibilidade for igual a true, então...
        document.getElementById("div_opcoes").style.display = "none";//Ocultamos a div
        visibilidade = false;//alteramos o valor da variável para falso.
    } else {//ou se a variável estiver com o valor false..
        document.getElementById("div_opcoes").style.display = "block";//Exibimos a div..
        visibilidade = true;//Alteramos o valor da variável para true.
    }

});

function random_lateral(){
    return Math.floor(Math.random() * 4);
}

function random_rodape(){
    return Math.floor(Math.random() * 3);
}

window.onload = carrega_anuncio_lateral();
function carrega_anuncio_lateral(){
    const img_lateral = document.getElementById('img_anuncio_lateral');

    random_lateral();

    if (random_lateral() == 0){
        img_lateral.src = 'anuncios/laterais/bannergi1.jpg';
    } else if (random_lateral() == 1){
        img_lateral.src = 'anuncios/laterais/bannergi2.jpg';
    } else if (random_lateral() == 2){
        img_lateral.src = 'anuncios/laterais/bannergi3.jpg';
    } else if (random_lateral() == 3){
        img_lateral.src = 'anuncios/laterais/bannergi4.jpg';
    } else {
        img_lateral.src = 'anuncios/laterais/bannergi1.jpg';
    }
}

window.onload = carrega_anuncio_rodape();
function carrega_anuncio_rodape(){
    const img_rodape = document.getElementById('img_anuncio_rodape');

    random_rodape();

    if (random_rodape() == 0){
        img_rodape.src = 'anuncios/rodape/bannergi1.jpg';
    } else if (random_rodape() == 1){
        img_rodape.src = 'anuncios/rodape/bannergi2.jpg';
    } else if (random_rodape() == 2){
        img_rodape.src = 'anuncios/rodape/bannergi3.jpg';
    } else {
        img_rodape.src = 'anuncios/rodape/bannergi1.jpg';
    }
}

//button menu-mobile

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  });

//tooltip
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems);
  });

//scrollpsy
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.scrollspy');
    var instances = M.ScrollSpy.init(elems);
});


//inicialização do menu
/*$('.modal-trigger').leanModal();
$('select').material_select();
$(".button-collapse").sidenav();*/

/*  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
  });*/