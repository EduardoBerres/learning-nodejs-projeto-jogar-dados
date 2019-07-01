function Jogo(dados = 5, lados = 6)
{
	console.log('model: executar constructor de jogo');
	this.dados = dados;
	this.lados = lados;
	this.pontos = 0;
	this.n = 0;
	this.contador = {Generala:0,Poker:0,Full:0}
}

Jogo.prototype.novoJogo = function() {
	console.log('model: novoJogo');
	this.pontos = 0;
	this.n = 0;
}

Jogo.prototype.lancarUmDado = function(){
	var valorAleatorio = Math.random();
	var lado = 1 + Math.floor(valorAleatorio * this.lados);
	return lado;
}


Jogo.prototype.lancarDados = function(){
	console.log('model: lancarDados');
	var lancamento = [];
	for (var i = 0; i < this.dados; i++) {
		lancamento[i] = this.lancarUmDado();
	}
	return lancamento;
}

Jogo.prototype.contarDados = function(Lancamento){
	var contagem = Array(this.lados).fill(0);
	for (var i = 0; i < lancamento.length; i++) {
		var numero = Lancamento[i];
		contagem[numero-1] += 1;
	}
	return contagem;
}

const GENERALA = { jogo : 'Generala', pontos : 100 }
const POKER = { jogo : 'Poker', pontos : 100 }
const FULL = { jogo : 'Full', pontos : 50 }
const NADA = { jogo : 'Nenhum', pontos : 0 }

Jogo.prototype.analisarLancamento = function(lancamento){

	var contagem = this.contarDados(lancamento);

	var resultado;

	if (contagem.find(e => e === 5) ){
		resultado = GENERALA;
		this.contador.Generala +=1;
	}
	else if (contagem.find(e => e === 4)){
		resultado = POKER;
		this.contador.Poker +=1;
	}

	else if (contagem.find(e => e === 3) && contagem.find(e => e  === 2) ){
		resultado = FULL;
		this.contador.Full +=1;
	}
	else 
		resultado = NADA;

	return resultado;

}

Jogo.prototype.novoLancamento = function(){
	console.log('model: novoLancamento');
	var lancamento = this.lancarDados();
	console.log('model: analiseLancamento');
	var analiseLancamento = this.analisarLancamento(lancamento);
	this.pontos += analiseLancamento.pontos;
	this.n += 1;

	console.log('model: prepara resultado'); 

	var resultado = {

		pontosAcumulados : this.pontos,
		novoLancamentos : this.n,
		nLancamentos : this.n,
		contador : this.contador,
		lancamento : lancamento,
		jogoLancamento : analiseLancamento.jogo,
		pontosLancamento : analiseLancamento.pontos
	};

	return resultado;

}

jogo = new Jogo();

lancamento = jogo.lancarDados();
contagem = jogo.contarDados(lancamento);
resultado = jogo.analisarLancamento(lancamento);

console.log('dados sorteados: ', lancamento );
console.log('contagem: ', contagem);
console.log('analise do lancamento: ', resultado);


module.exports.Jogo = Jogo;