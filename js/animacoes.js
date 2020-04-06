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

function random_lateral2(){
    return Math.floor(Math.random() * 6);
}

function random_rodape(){
    return Math.floor(Math.random() * 3);
}

function random_rodape2(){
    return Math.floor(Math.random() * 4);
}

window.onload = carrega_anuncio_lateral();
window.onload = carrega_anuncio_lateral2();

function carrega_anuncio_lateral(){
    const img_lateral = document.getElementById('img_anuncio_lateral');

    random_lateral();

    if (random_lateral() == 0){
        img_lateral.src = 'anuncios/laterais/bannergi1.webp';
    } else if (random_lateral() == 1){
        img_lateral.src = 'anuncios/laterais/bannergi2.webp';
    } else if (random_lateral() == 2){
        img_lateral.src = 'anuncios/laterais/bannergi3.webp';
    } else if (random_lateral() == 3){
        img_lateral.src = 'anuncios/laterais/bannergi4.webp';
    } else {
        img_lateral.src = 'anuncios/laterais/bannergi1.webp';
    }
}

function carrega_anuncio_lateral2(){
    const img_lateral = document.getElementById('img_anuncio_lateral_teclado');

    random_lateral2();

    if (random_lateral2() == 0){
        img_lateral.src = 'anuncios/laterais/anuncio1.webp';
    } else if (random_lateral2() == 1){
        img_lateral.src = 'anuncios/laterais/anuncio2.webp';
    } else if (random_lateral2() == 2){
        img_lateral.src = 'anuncios/laterais/anuncio3.webp';
    } else if (random_lateral2() == 3){
        img_lateral.src = 'anuncios/laterais/anuncio4.webp';
    } else if (random_lateral2() == 4){
        img_lateral.src = 'anuncios/laterais/anuncio5.webp';
    } else if (random_lateral2() == 5){
        img_lateral.src = 'anuncios/laterais/anuncio6.webp';
    } else {
        img_lateral.src = 'anuncios/laterais/anuncio1.webp';
    }
}

window.onload = carrega_anuncio_rodape();
window.onload = carrega_anuncio_rodape2();
function carrega_anuncio_rodape(){
    const img_rodape = document.getElementById('img_anuncio_rodape');

    random_rodape();

    if (random_rodape() == 0){
        img_rodape.src = 'anuncios/rodape/bannergi1.webp';
    } else if (random_rodape() == 1){
        img_rodape.src = 'anuncios/rodape/bannergi2.webp';
    } else if (random_rodape() == 2){
        img_rodape.src = 'anuncios/rodape/bannergi3.webp';
    } else {
        img_rodape.src = 'anuncios/rodape/bannergi1.webp';
    }
}

function carrega_anuncio_rodape2(){
    const img_rodape = document.getElementById('img_anuncio_rodape_teclado');

    random_rodape2();

    if (random_rodape2() == 0){
        img_rodape.src = 'anuncios/rodape/anuncio1.webp';
    } else if (random_rodape2() == 1){
        img_rodape.src = 'anuncios/rodape/anuncio2.webp';
    } else if (random_rodape2() == 2){
        img_rodape.src = 'anuncios/rodape/anuncio3.webp';
    } else if (random_rodape2() == 3){
        img_rodape.src = 'anuncios/rodape/anuncio4.webp';
    } else {
        img_rodape.src = 'anuncios/rodape/anuncio1.webp';
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