//importar para usar a animacao
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var accentPitch = 380, offBeatPitch = 200;

const tocar = document.getElementById('tocar_btn');

const bpm_range = document.getElementById('input_bpm_range');

const volume_tempo_range = document.getElementById('input_volume_tempos');

const volume_marcador_range = document.getElementById('input_volume_marcador');

const volume_divisao_range = document.getElementById('input_volume_divisao');

const bpm_txt = document.getElementById('input_bpm_txt');

const bpm_mais = document.getElementById('mais_bpm_btn');

const bpm_menos = document.getElementById('menos_bpm_btn');

const tap_btn = document.getElementById('tap_tempo_btn');

const audio_divisao = document.getElementById('audio_divisao');

/*audio = document.getElementById('sub1');

audio_marcador = document.getElementById('marc1');*/

const andamento = document.getElementById('andamento_titulo');

const numero_tempo = document.getElementById('numero_tempo');

var qnt_compasso_sel = document.getElementById('qnt_compasso_sel');

var qnt_compasso_sel_valor = parseInt(qnt_compasso_sel.options[qnt_compasso_sel.selectedIndex].value);

var qnt_divisao_sel = document.getElementById('qnt_divisao_sel');

var qnt_divisao_sel_valor = parseInt(qnt_divisao_sel.options[qnt_divisao_sel.selectedIndex].value);

var marcador_check = document.getElementById("marcador_check");

var som_sel = document.getElementById('som_sel');

var som_sel_valor = parseInt(som_sel.options[som_sel.selectedIndex].value);

qnt_compasso_sel_valor = (qnt_compasso_sel_valor + 1);

let tempo_divisao = null;

let currentBpm = 60;

let tempo = null;

let tocando_agr = false;

let tempo_passado  = 0;

let tick_contar = 0;

let tick_contar_divisao = 0;

//variavel do tap tempo
var delta = 0;

$('#marcador_check').on('click', function(){
	//verifica se o ouvir marcador está marcado ou não e muda a cor do dot principal se estiver ou não marcado
	if( $("#marcador_check").is(":checked")){
	
		$(".dot-active").css({
			transform: "translateY(0px)",
			background: "#01579b"
		});
	} else {
		$(".dot-active").css({
			transform: "translateY(0px)",
			background: "#bbbbbb"
		});

	}	
});

//irá verificar o som selcionado e mudar o audio
function verificar_som(){

	if (som_sel_valor == 1) {
		audio = document.getElementById('sub1');
		audio_marcador = document.getElementById('marc1');
	} else if (som_sel_valor == 2) {
		audio = document.getElementById('sub2');
		audio_marcador = document.getElementById('marc2');
	} else if (som_sel_valor == 3) {
		audio = document.getElementById('sub3');
		audio_marcador = document.getElementById('marc3');
	} else if (som_sel_valor == 4) {
		audio = document.getElementById('sub4');
		audio_marcador = document.getElementById('marc4');
	} else if (som_sel_valor == 5) {
		audio = document.getElementById('sub5');
		audio_marcador = document.getElementById('marc5');
	} else if (som_sel_valor == 6) {
		audio = document.getElementById('sub6');
		audio_marcador = document.getElementById('marc6');
	} else if (som_sel_valor == 7) {
		audio = document.getElementById('sub7');
		audio_marcador = document.getElementById('marc7');
	} else if (som_sel_valor == 8) {
		audio = document.getElementById('sub8');
		audio_marcador = document.getElementById('marc8');
	} else if (som_sel_valor == 9) {
		audio = document.getElementById('sub9');
		audio_marcador = document.getElementById('marc9');
	} 

}

//quando o som selecionado for mudado ele passará o valor e chamara o verifica_som()
som_sel.addEventListener('change', function(){
	
	//vai pegar o valor e passar
	som_sel_valor = som_sel.options[som_sel.selectedIndex].value = this.value;

	document.getElementById('input_volume_tempos').value = 1;
	document.getElementById('input_volume_marcador').value = 1;
	document.getElementById('input_volume_divisao').value = 1;
	audio.volume = volume_tempo_range.value = 1;
	audio_marcador.volume = volume_marcador_range.value = 1;
	audio_divisao.volume = volume_divisao_range.value = 1;
	
	verificar_som();
	//se tiver tocando nomento limpa o intervalo de tempo e reinicia o currentbpm	
    if (tocando_agr) {
		
		reiniciar_metronomo();

    }

});

//inciar metronomo funcão
function iniciar(){
		
		verificar_som();
	    audio.currentTime = 0;
	    audio.play();

		contar();
		
		//animacao
		var note = context.createOscillator();

		if( $(".dot").eq(tick_contar-1).hasClass("active") )
		  note.frequency.value = accentPitch;
		else
		  note.frequency.value = offBeatPitch;
	
		note.connect(context.destination);

	
		$(".dot").attr("style", "");

				//verifica se o ouvir marcador está marcado ou não e muda a cor do dot principal se estiver ou não marcado
				if( $("#marcador_check").is(":checked")){

					$(".dot-active").css({
						background: "#01579b"
					});
				} else {
					$(".dot-active").css({
						background: "#bbbbbb"
					});
				}

		$(".dot").eq(tick_contar-1).css({
		transform: "translateY(-5px)",
		background: "#ef6c00"
		});
	
}

//iniciar_divisao
function iniciar_divisao(){
	if (qnt_divisao_sel_valor != 1){	
		audio_divisao.currentTime = 0;
		audio_divisao.play();

		contar_divisao();
	}
}

//quando modificado, vai alterar o volume do audio do tempo
volume_tempo_range.addEventListener('change', function(){
	
	audio.volume = volume_tempo_range.value;

});

//quando modificado, vai alterar o volume do audio do marcador
volume_marcador_range.addEventListener('change', function(){
	
	audio_marcador.volume = volume_marcador_range.value;

});

//quando modificado, vai alterar o volume do audio da divisao
volume_divisao_range.addEventListener('change', function(){
	
	audio_divisao.volume = volume_divisao_range.value;

});

//conta a quantidade de tick limitando ao compasso escolhido
function contar(){

	tick_contar += 1;

	    if (tick_contar == (qnt_compasso_sel_valor)) {

	    	tick_contar = (qnt_compasso_sel_valor);
	    	tick_contar = 1;
	    }

	 	numero_tempo.innerHTML = "<strong>"+tick_contar+"</strong>";

		 verificarCheckMarcador();    

}

//conta a quantidade de tick limitando ao compasso escolhido
function contar_divisao(){

	tick_contar_divisao += 1;
	qnt_divisao_sel_valorm = (parseInt(qnt_divisao_sel_valor) + 1);

	if (tick_contar_divisao == qnt_divisao_sel_valorm){
		tick_contar_divisao = 1;
	}

		console.log(tick_contar_divisao);
		   
		verificarDivisaoMute();
}

//se o checkbox do marcador estiver selecionado, ele vai tocar o marcador, caso nãoe steja, não irá tocar
function verificarCheckMarcador() {

    /*if (marcador_check.checked == true){ 
        
        if (tick_contar == 1) {
			audio.muted = true;
    		audio_marcador.play();
    	} else if (tick_contar != 1) {
			audio.muted = false;
		}

    }  else {
	   audio.muted = false;
	}
	*/
	//verifica se o ouvir marcador está marcado ou não e muda a cor do dot principal se estiver ou não marcado
	if( $("#marcador_check").is(":checked")){
		if (tick_contar == 1) {
			audio.muted = true;
    		audio_marcador.play();
    	} else if (tick_contar != 1) {
			audio.muted = false;
		}
	} else {
		audio.muted = false;
	}	
}

//verifica a divisão e muta ela quando estiver na 'cabeça do tempo' ou quando for numero inteiro
function verificarDivisaoMute() {
		
        if (tick_contar_divisao == 1) {
		audio_divisao.muted = true;	
    	} else {
		audio_divisao.muted = false;
		}

}

//muda o compasso do tempo(qnt de tempo)
$("#qnt_compasso_sel").on("change", function() {
    qnt_compasso_sel_valor = qnt_compasso_sel.options[qnt_compasso_sel.selectedIndex].value = this.value;
    qnt_compasso_sel_valor = parseInt(qnt_compasso_sel_valor) + 1;

    if (tocando_agr) {
    	tick_contar = qnt_compasso_sel_valor;
		tick_contar = 0;

		tick_contar_divisao = 0;

		reiniciar_metronomo();

	}

	var _counter = $(".animacao_counter");
  _counter.html("");

  for(var i = 0; i < parseInt(qnt_compasso_sel_valor-1, 10); i++)
  {
    var temp = document.createElement("div");
    temp.className = "dot";

    if(i === 0)
      temp.className += " dot-active";

    _counter.append( temp );
  }

});

//muda a qnt de divisao de tempo
qnt_divisao_sel.addEventListener('change', function(){
    qnt_divisao_sel_valor = qnt_divisao_sel.options[qnt_divisao_sel.selectedIndex].value = this.value;

    if (tocando_agr) {
		tick_contar = qnt_compasso_sel_valor;
		tick_contar = 0;

		tick_contar_divisao = (qnt_divisao_sel_valor);
		tick_contar_divisao = 0;

		reiniciar_metronomo();

	}
});


//da valor a barra de range e ao alterar ela, altera o txt de bpm
bpm_range.addEventListener('change', function(){
    document.getElementById('input_bpm_txt').value = this.value;
    currentBpm = parseInt(this.value);

    if (tocando_agr) {
		
		reiniciar_metronomo();

    }

    ValorAndamento();
});

//pega o valor do input_txt de bpm e ao alterar ele, altera a barra de range
bpm_txt.addEventListener('change', function(){

    	document.getElementById('input_bpm_range').value = this.value;
    	currentBpm = parseInt(this.value);

    	//caso o numero digitado no txt for maior que 260, o input trava em 260
    	if (currentBpm > 260) {
			currentBpm = 260;
			document.getElementById('input_bpm_range').value = 260;
			document.getElementById('input_bpm_txt').value = 260;
		}

		//caso o numero digitado no txt for menor que 20, o input trava em 20
    	if (currentBpm < 20) {
			currentBpm = 20;
			document.getElementById('input_bpm_range').value = 20;
			document.getElementById('input_bpm_txt').value = 20;
		}

		ValorAndamento();

    //se tiver tocando nomento limpa o intervalo de tempo e reinicia o currentbpm	
    if (tocando_agr) {

    	reiniciar_metronomo();
		
    }
});

//soma um bpm ao clicar
bpm_mais.addEventListener('click', function(){
	if (currentBpm < 260) {
		currentBpm++;
	}
    document.getElementById('input_bpm_txt').value = currentBpm;
    document.getElementById('input_bpm_range').value = currentBpm;

    //se tiver tocando no momento, reinicia com os novos parametros de current bpm
    if (tocando_agr) {
		
		reiniciar_metronomo();
	
    }

    ValorAndamento();

});

//diminui um bpm ao clicar
bpm_menos.addEventListener('click', function(){
	//não dexecuta o comando de diminiur quando o current bpm não for maior que 20
	if (currentBpm > 20) {
		currentBpm--;
	}
    document.getElementById('input_bpm_txt').value = currentBpm;
    document.getElementById('input_bpm_range').value = currentBpm;

    //se tiver tocando no momento, reinicia com os novos parametros de current bpm
    if (tocando_agr) {
		
		reiniciar_metronomo();

    }

    ValorAndamento();

});

function parar(){
	
		clearInterval(tempo);
		clearInterval(tempo_divisao);
		tick_contar = 0;
		tick_contar_divisao = 0;

		$(".dot").css({
			transform: "translateY(0px)",
			background: "#bbbbbbdd"
		});
		
		//verifica se o ouvir marcador está marcado ou não e muda a cor do dot principal se estiver ou não marcado
		if( $("#marcador_check").is(":checked")){
			$(".dot-active").css({
				transform: "translateY(0px)",
				background: "#01579b"
		});
		} else if ( $("#marcador_check").is(":checked") == false){
		$(".dot-active").css({
			transform: "translateY(0px)",
			background: "#bbbbbbdd"
		});

	}

}

function iniciar_metronomo_completo(){
	//se ja estiver tocando simplesmente zera o tempo de intervalo
	if (tocando_agr) {
	
		parar();
		tocar.innerHTML = 'Iniciar';
		numero_tempo.innerHTML = "<strong>--</strong>"; 

		tocar.classList.remove('orange');
		tocar.classList.remove('darken-3');
		tocar.classList.add('green');

	}else{
		tocar.innerHTML = 'Parar';
		//inicia o audio do metronomo
		iniciar();

		//inicia o audio da divisao
		iniciar_divisao();

		//intervalo de repetição do tempo
		tempo = setInterval(iniciar, (60*1000)/currentBpm);

		//intervalo de repetição da divisao
		tempo_divisao = setInterval(iniciar_divisao, (60*1000)/currentBpm/qnt_divisao_sel_valor);

		tocar.classList.remove('green');
		tocar.classList.add('orange');
		tocar.classList.add('darken-3');
	}
	//zera os parametros de novo
	tocando_agr = !tocando_agr
}

//inica o motronomo 
tocar.addEventListener('click', function(){
	iniciar_metronomo_completo();
});

//função que faz o tempo tempo funcionar
function tap_tempo(){
	var data = new Date();
	var tempo = parseInt(data.getTime(), 10);

	$("#input_bpm_txt").val(Math.ceil(60000 / (tempo - delta)) );
	$("#input_bpm_range").val(Math.ceil(60000 / (tempo - delta)) );

   currentBpm = Math.ceil(60000 / (tempo - delta));

   //limitar o valor maximo e minimo

   if (currentBpm > 260) {
	   currentBpm = 260;
	   document.getElementById('input_bpm_range').value = 260;
	   document.getElementById('input_bpm_txt').value = 260;
   }

   //caso o numero digitado no txt for menor que 20, o input trava em 20
   if (currentBpm < 20) {
	   currentBpm = 20;
	   document.getElementById('input_bpm_range').value = 20;
	   document.getElementById('input_bpm_txt').value = 20;
   }

	//se tiver tocando nomento limpa o intervalo de tempo e reinicia o currentbpm	
	if (tocando_agr) {
	   reiniciar_metronomo();
   }

	 delta = tempo;
}

//tap tempo - chama a função tap_tempo() ao clicar no botão TAP
$("#tap_tempo_btn").click(function() {

tap_tempo();

});

//chama a funcção tap_tempo() ao clicar na tecla T/t -- COD 84/116
$(document).ready(function(){

	$(document).keypress(function(tecla){ //Ao pressionar a tecla
		//se a tecla for t/T vai executar o tap_tempo()
		if((tecla.wich == 84 || tecla.keyCode == 84) || (tecla.wich == 116 || tecla.keyCode == 116)){
			tap_tempo();
		}
	});	

	$(document).keypress(function(tecla){ //Ao pressionar a tecla
		//se a tecla for a tecla enter execute o iniciar_metronomo()
		if(tecla.wich == 13 || tecla.keyCode == 13){
			iniciar_metronomo_completo();
		}

	});
});		


//mudar o titulo do anamento de acordo com o andamento
function ValorAndamento(){
	if (currentBpm < 40) {
		andamento.innerHTML = "Andamento: <strong>Grave</strong>";
	} else if (currentBpm >= 40 && currentBpm < 45){ 
		andamento.innerHTML = "Andamento: <strong>Larghissimo</strong>";
	} else if (currentBpm >= 45 && currentBpm < 50){
		andamento.innerHTML = "Andamento: <strong>Largo</strong>";
	} else if (currentBpm >= 50 && currentBpm < 55){
		andamento.innerHTML = "Andamento: <strong>Larghetto</strong>";
	} else if (currentBpm >= 55 && currentBpm < 65){
		andamento.innerHTML = "Andamento: <strong>Adagio</strong>";
	} else if (currentBpm >= 65 && currentBpm < 78){
		andamento.innerHTML = "Andamento: <strong>Adagietto</strong>";
	} else if (currentBpm >= 78 && currentBpm < 83){
		andamento.innerHTML = "Andamento: <strong>Andantino</strong>";
	} else if (currentBpm >= 83 && currentBpm < 85){
		andamento.innerHTML = "Andamento: <strong>Marcia Moderato</strong>";
	} else if (currentBpm >= 85 && currentBpm < 90){
		andamento.innerHTML = "Andamento: <strong>Andante</strong>";
	} else if (currentBpm >= 90 && currentBpm < 100){
		andamento.innerHTML = "Andamento: <strong>Andante Moderato</strong>";
	} else if (currentBpm >= 100 && currentBpm < 112){
		andamento.innerHTML = "Andamento: <strong>Moderato</strong>";
	} else if (currentBpm >= 112 && currentBpm < 116){
		andamento.innerHTML = "Andamento: <strong>Allegro Moderato</strong>";
	} else if (currentBpm >= 116 && currentBpm < 120){
		andamento.innerHTML = "Andamento: <strong>Allegretto</strong>";
	} else if (currentBpm >= 120 && currentBpm < 140){
		andamento.innerHTML = "Andamento: <strong>Allegro</strong>";
	} else if (currentBpm >= 140 && currentBpm < 160){
		andamento.innerHTML = "Andamento: <strong>Vivace</strong>";
	} else if (currentBpm >= 160 && currentBpm < 168){
		andamento.innerHTML = "Andamento: <strong>Vivacissimo</strong>";
	} else if (currentBpm >= 168 && currentBpm < 180){
		andamento.innerHTML = "Andamento: <strong>Alegricissimo</strong>";
	} else if (currentBpm >= 180 && currentBpm < 200){
		andamento.innerHTML = "Andamento: <strong>Presto</strong>";
	} else if (currentBpm >= 200) {
		andamento.innerHTML = "Andamento: <strong>Prestissimo</strong>";
	}    
}

function reiniciar_metronomo(){

	parar();
	iniciar();
	iniciar_divisao();

	//intervalo de repetição do tempo
	tempo = setInterval(iniciar, (60*1000)/currentBpm);

	//intervalo de repetição da divisao
	tempo_divisao = setInterval(iniciar_divisao, (60*1000)/currentBpm/qnt_divisao_sel_valor);
}