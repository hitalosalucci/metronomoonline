
const tocar = document.getElementById('tocar_btn');

const bpm_range = document.getElementById('input_bpm_range');

const bpm_txt = document.getElementById('input_bpm_txt');

const bpm_mais = document.getElementById('mais_bpm_btn');

const bpm_menos = document.getElementById('menos_bpm_btn');

const tap_btn = document.getElementById('tap_tempo_btn');

/*audio = document.getElementById('sub1');

audio_marcador = document.getElementById('marc1');*/

const andamento = document.getElementById('andamento_titulo');

const numero_tempo = document.getElementById('numero_tempo');

var qnt_compasso_sel = document.getElementById('qnt_compasso_sel');

var qnt_compasso_sel_valor = parseInt(qnt_compasso_sel.options[qnt_compasso_sel.selectedIndex].value);

var marcador_check = document.getElementById("marcador_check");

var som_sel = document.getElementById('som_sel');

var som_sel_valor = parseInt(som_sel.options[som_sel.selectedIndex].value);

qnt_compasso_sel_valor = (qnt_compasso_sel_valor + 1);

let currentBpm = 60;

let tempo = null;

let tocando_agr = false;

let tempo_passado  = 0;

let tick_contar = 0;

//irá verificar o som selcionado e mudar o audio
function verificar_som(){

	console.log(som_sel_valor);
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
	} 

}

//quando o som selecionado for mudado ele passará o valor e chamara o verifica_som()
som_sel.addEventListener('change', function(){
	
	//vai pegar o valor e passar
	som_sel_valor = som_sel.options[som_sel.selectedIndex].value = this.value;
	
	verificar_som();
	//se tiver tocando nomento limpa o intervalo de tempo e reinicia o currentbpm	
    if (tocando_agr) {
    	clearInterval(tempo);
    	tempo = setInterval(iniciar, (60*1000)/currentBpm);
    }

});

function iniciar(){
		
		verificar_som();
	    audio.currentTime = 0;
	    audio.play();

	    contar();

}

function contar(){

	tick_contar += 1;

	    if (tick_contar == (qnt_compasso_sel_valor)) {

	    	tick_contar = (qnt_compasso_sel_valor);
	    	tick_contar = 1;
	    }

	 	numero_tempo.innerHTML = "<strong>"+tick_contar+"</strong>";
	 	verificarCheckMarcador();    
}

//se o checkbox do marcador estiver selecionado, ele vai tocar o marcador, caso nãoe steja, não irá tocar
function verificarCheckMarcador() {

    if (marcador_check.checked == true){ 
        
        if (tick_contar == 1) {

    	audio.muted = true;
    	audio_marcador.play();
    	} else if (tick_contar != 1) {
    	audio.muted = false;
    }

    }  else {
       audio.muted = false;
    }
}


qnt_compasso_sel.addEventListener('change', function(){
    qnt_compasso_sel_valor = qnt_compasso_sel.options[qnt_compasso_sel.selectedIndex].value = this.value;
    qnt_compasso_sel_valor = parseInt(qnt_compasso_sel_valor) + 1;

    if (tocando_agr) {
    	tick_contar = (qnt_compasso_sel_valor);
    	tick_contar = 0;
    }
});


//da valor a barra de range e ao alterar ela, altera o txt de bpm
bpm_range.addEventListener('change', function(){
    document.getElementById('input_bpm_txt').value = this.value;
    currentBpm = parseInt(this.value);

    if (tocando_agr) {
    	clearInterval(tempo);
    	tempo = setInterval(iniciar, (60*1000)/currentBpm);
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
    	clearInterval(tempo);
    	tempo = setInterval(iniciar, (60*1000)/currentBpm);
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
    	clearInterval(tempo);
    	tempo = setInterval(iniciar, (60*1000)/currentBpm);
    }

    ValorAndamento();

});

//diminui um bpm ao clicar
bpm_menos.addEventListener('click', function(){
	//não dexecuta o comando de diminiur quando o current bpm não for maior que 40
	if (currentBpm > 20) {
		currentBpm--;
	}
    document.getElementById('input_bpm_txt').value = currentBpm;
    document.getElementById('input_bpm_range').value = currentBpm;

    //se tiver tocando no momento, reinicia com os novos parametros de current bpm
    if (tocando_agr) {
    	clearInterval(tempo);
    	tempo = setInterval(iniciar, (60*1000)/currentBpm);
    }

    ValorAndamento();

});

//inica o motronomo 
tocar.addEventListener('click', function(){
    //se ja estiver tocando simplesmente zera o tempo de intervalo
    if (tocando_agr) {
    	tocar.innerHTML = 'Iniciar';
    	clearInterval(tempo);
    	tick_contar = 0;
    	numero_tempo.innerHTML = "<strong>--</strong>"; 

    	tocar.classList.remove('red');
    	tocar.classList.add('green');

    }else{
    	tocar.innerHTML = 'Parar';
    	iniciar();
    	tempo = setInterval(iniciar, (60*1000)/currentBpm);

    	tocar.classList.remove('green');
    	tocar.classList.add('red');
    }
    //zera os parametros de novo
    tocando_agr = !tocando_agr
});

tap_btn.addEventListener('click', function(){
	currentBpm = 60;

	tempo_passado = Tone.Transport.seconds;
	//para o transport 	//inicia transport
	Tone.Transport.stop().start();


/*	tempo_passado_bpm = (60/tempo_passado).toFixed(2);

	document.getElementById('input_bpm_txt').value = tempo_passado_bpm;*/

	document.getElementById('input_bpm_txt').value = (60/tempo_passado).toFixed(0);

	document.getElementById('input_bpm_range').value = (60/tempo_passado).toFixed(0);

	currentBpm = (60/tempo_passado).toFixed(0);

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
    	clearInterval(tempo);
    	tempo = setInterval(iniciar, (60*1000)/currentBpm);
    }

    if (tempo_passado == 10) {
    	 tempo_passado = 0;
    	 Tone.Transport.stop();
    }
   

    console.log(tempo_passado);

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