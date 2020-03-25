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


//inicialização do menu
/*$('.modal-trigger').leanModal();
$('select').material_select();
$(".button-collapse").sidenav();*/

/*  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
  });*/