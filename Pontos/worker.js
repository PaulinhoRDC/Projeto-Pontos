var console = {};
console.log = function(){};




var dificuldade;
var estado = {
    jogadorAtual: 0,
    linhasMatrixJogadas: [],
    colunasMatrixJogadas: [],
    boxesMatrixJogadas: []
}

var jogadorAtual;
var tamanhoTabuleiro;

var jogadaBotStruct = {
    modo: '',
    iMelhor: 0,
    jMelhor: 0,
    caminho:[],
    valor:-2000
}

var linhasMatrixJogadas = [];
var colunasMatrixJogadas = [];
var boxesMatrixJogadas;
var probRandom;

var jogadasBot = [];

var fimEncontradoaux = 0;
var fimEncontrado = 0;
var numJogadas = 0;
var jogadasTotais = ((tamanhoTabuleiro + 1) * tamanhoTabuleiro) * 2;

var chain = []
var lista = []
var isChain = 0
var lateGame = false
var nodoC = 0

    onmessage = function (message) {

        dados = JSON.parse(message.data);

        ////console.log(dados.e.jogadorAtual);
        ////console.log(dados.e.linhasMatrixJogadas);
        ////console.log(dados.t);

        linhasMatrixJogadas = dados.e.linhasMatrixJogadas;
        colunasMatrixJogadas = dados.e.colunasMatrixJogadas;
        boxesMatrixJogadas= dados.e.boxesMatrixJogadas;
        dificuldade = dados.d;
        jogadorAtual = dados.e.jogadorAtual;
        tamanhoTabuleiro = dados.t;
        probRandom = dados.pr;



        botMain();
        var r = {           
                c : colunasMatrixJogadas,
                l : linhasMatrixJogadas,
                b : boxesMatrixJogadas,   
                j : jogadasBot
        }

        
        postMessage(r);

    }

    function notIn ( x , l){
        for ( var i = 0 ; i<l.length ; i++){

            var v = l[i]

            if ((v[0] == x[0]) && (v[1] == x[1]) && (v[2] == x[2])){
                return false
            }

        }

        return true
    }


    function removeSame (list){

        var newList = []

        for ( var i = 0 ; i<list.length ; i++){

            if (notIn(list[i],newList)){
                newList.push(list[i])
            }

        }

        return newList


    }

    function deepClone(estado){

        var len1 = estado.linhasMatrixJogadas.length, copylinhasMatrixJogadas = new Array(len1); 
        for (let i=0; i<len1; ++i)
            copylinhasMatrixJogadas[i] = estado.linhasMatrixJogadas[i].slice(0);

        var len2 = estado.colunasMatrixJogadas.length, copycolunasMatrixJogadas = new Array(len2); 
        for (let i=0; i<len2; ++i)
            copycolunasMatrixJogadas[i] = estado.colunasMatrixJogadas[i].slice(0);

        var len3 = estado.boxesMatrixJogadas.length, copyboxesMatrixJogadas = new Array(len3); 
        for (let i=0; i<len3; ++i)
            copyboxesMatrixJogadas[i] = estado.boxesMatrixJogadas[i].slice(0);


        var r = {
            jogadorAtual: estado.jogadorAtual,
            linhasMatrixJogadas: copylinhasMatrixJogadas,
            colunasMatrixJogadas: copycolunasMatrixJogadas,
            boxesMatrixJogadas: copyboxesMatrixJogadas
        };
        return r;
    }




    //#region Bot

    function atualizaEstado(e, j, l, c, b) {
        e.jogadorAtual = j;
        e.linhasMatrixJogadas = l;
        e.colunasMatrixJogadas = c;
        e.boxesMatrixJogadas = b;
        return e
    }


    function botMain() {
        //se for a vez do bot

        chain = []
        isChain = 0
        estado = deepClone(atualizaEstado(estado, jogadorAtual, linhasMatrixJogadas, colunasMatrixJogadas, boxesMatrixJogadas));
        lateGame = isLateGame(estado)

        if (testeFimDeJogoBot(estado)) {
            return
        } 
        if (jogadorAtual == 2) { //bot

            //console.log('ESTADO');
            //console.log(estado);
            fimEncontrado = 0;
            fimEncontradoaux = 0;
            jogadaBot();

        
            ////console.log(jogadaBotStruct)
            var sitio = jogadaBotStruct.modo
            var i = jogadaBotStruct.iMelhor
            var j = jogadaBotStruct.jMelhor
            var lista = jogadaBotStruct.caminho
            var valor = jogadaBotStruct.valor

            lista = removeSame(lista)

            if (lista.length == 0){
                lista.push([sitio,i,j])
            }
            else if (lista.length >= 1){
                isChain = 1

                if(fimEncontrado == 0 && lateGame && dificuldade==3){

                var last = lista.pop()
                lista.pop()
                lista.push(last)

                }
                
            }

            for (var a = 0 ; a < lista.length && jogadorAtual == 2 ; a++){
                var aux = lista[a]
                sitio = aux[0]
                i = aux[1]
                j = aux[2]

                if (sitio == 'l') {
                    jogadasBot.push([sitio,i,j])
                    JogadaLinha(i,j)
                    
                } else if (sitio == 'c') {
                    jogadasBot.push([sitio,i,j])
                    JogadaColuna(i,j)
                }
            }

            if (jogadorAtual == 2) {
                
                botMain()
            }
        }
    }


    function contaLadosBox(e,i,j){



        var contaLados = 0


        if (e.linhasMatrixJogadas[i][j] != null){
            contaLados += 1
        }
        if (e.linhasMatrixJogadas[i+1][j] != null){
            contaLados += 1
        }
        if (e.colunasMatrixJogadas[i][j] != null){
            contaLados += 1
        }
        if (e.colunasMatrixJogadas[i][j+1] != null){
            contaLados += 1
        }


        return contaLados
    }





    function isLateGame(e){

        var r = true
        var treesider = 0

        for (var i = 0; i < tamanhoTabuleiro ; i++){
            for(var j = 0 ; j < tamanhoTabuleiro ; j++){

                var contaLados = 0

                if (e.boxesMatrixJogadas[i][j] == null){

                    if (contaLadosBox(e,i,j) < 2){

                        if (treesider < 2){
                            treesider = treesider + 1
                        }
                        else{ r = false }
                       
                    }
                }

            }
        }


        return r
    }



    function testeFimDeJogoBot(e) {
        var f = 0;
        for (let i = 0; i < tamanhoTabuleiro; i++) {
            for (let j = 0; j < tamanhoTabuleiro; j++) {
                if (e.boxesMatrixJogadas[i][j] == null) {
                    f = 1;
                }
            }
        }
        return !f
    }



    function JogadaLinha(i, j) {
        var f = 0
        linhasMatrixJogadas[i][j] = jogadorAtual


        if (i > 0 && linhasMatrixJogadas[i - 1][j] != null && colunasMatrixJogadas[i - 1][j] != null && colunasMatrixJogadas[i - 1][j + 1] != null) {
            if (boxesMatrixJogadas[i - 1][j] == null) f+=1
            boxesMatrixJogadas[i - 1][j] = jogadorAtual;
        } if (i < tamanhoTabuleiro && linhasMatrixJogadas[i + 1][j] != null && colunasMatrixJogadas[i][j] != null && colunasMatrixJogadas[i][j + 1] != null) {
            if (boxesMatrixJogadas[i][j] == null) f+=1
            boxesMatrixJogadas[i][j] = jogadorAtual;
        } else if(f == 0){
            jogadorAtual = jogadorAtual == 1 ? 2 : 1
        }
    }


    function JogadaColuna(i, j) {
        var f=0
        colunasMatrixJogadas[i][j] = jogadorAtual

        if (j > 0 && colunasMatrixJogadas[i][j - 1] != null && linhasMatrixJogadas[i][j - 1] != null && linhasMatrixJogadas[i + 1][j - 1] != null) {
            if (boxesMatrixJogadas[i][j-1] == null) f+=1
            boxesMatrixJogadas[i][j - 1] = jogadorAtual;
        } if (j < tamanhoTabuleiro && colunasMatrixJogadas[i][j + 1] != null && linhasMatrixJogadas[i][j] != null && linhasMatrixJogadas[i + 1][j] != null) {
            if (boxesMatrixJogadas[i][j] == null) f+=1
            boxesMatrixJogadas[i][j] = jogadorAtual;
        } else if (f == 0) {
            jogadorAtual = jogadorAtual == 1 ? 2 : 1
        }
    }





    //#region Lista Jogadas Validas
    function jogadasValidasLinhas (e){
        var jogadasLinhasValidas = []
        
        for (let i = 0; i < tamanhoTabuleiro + 1; i++){
            for(let j = 0; j < tamanhoTabuleiro; j++){
                if (e.linhasMatrixJogadas[i][j]==null){
                    jogadasLinhasValidas.push([i,j])
                }
                
            }
        }
        return jogadasLinhasValidas.length
    }


    function jogadasValidasColunas (e){
        var jogadasColunasValidas = []
        
        for (let i = 0; i < tamanhoTabuleiro; i++){
            for(let j = 0; j < tamanhoTabuleiro + 1; j++){
                if (e.colunasMatrixJogadas[i][j]==null){
                    jogadasColunasValidas.push([i,j])
                }
                
            }
        }

        return jogadasColunasValidas.length
    }
    //#endregion

    function avaliacaoTabuleiro(e) {

        var p1 = 0
        var p2 = 0
        for (let i = 0; i < tamanhoTabuleiro; i++) {
            for (let j = 0; j < tamanhoTabuleiro; j++) {
                if (e.boxesMatrixJogadas[i][j] == 1) {
                    p1++;
                } else if (e.boxesMatrixJogadas[i][j] == 2) { //novo valor para saber quem tem a caixa
                    p2++;
                }
            }
        }

        return p2 - p1


    }



    function jogadaBot() {


        if (dificuldade == 1) {
            profundidadeMaxima = 1;
            minimax(estado, profundidadeMaxima, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY,1,[],0)
        } else if (dificuldade == 2) {
            profundidadeMaxima = 2;
            minimax(estado, profundidadeMaxima, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY,1,[],0)
        } else if (dificuldade == 3) {
            profundidadeMaxima = 3;
            minimax(estado, profundidadeMaxima, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY,1,[],0);
        }

    }


    function nodoTerminal(e) {
        var f = 0;
        for (let i = 0; i < tamanhoTabuleiro; i++) {
            for (let j = 0; j < tamanhoTabuleiro; j++) {
                if (e.boxesMatrixJogadas[i][j] == null) {
                    f = 1;
                }
            }
        }
        return !f
    }

    function validaJogadaColuna(e,i,j){
        if (i == tamanhoTabuleiro){
            return false
        }
        return (e.colunasMatrixJogadas[i][j] == null)
    }

    function validaJogadaLinha(e,i,j){
        if (j == tamanhoTabuleiro){
            return false
        }
        return (e.linhasMatrixJogadas[i][j] == null)
    }


    function simulaJogadaLinha(e,i,j){

        var f1 = 0;
        e.linhasMatrixJogadas[i][j] = e.jogadorAtual


        if(i>0 && e.linhasMatrixJogadas[i-1][j]!=null && e.colunasMatrixJogadas[i-1][j]!=null&& e.colunasMatrixJogadas[i-1][j+1]!=null){
            e.boxesMatrixJogadas[i-1][j]=e.jogadorAtual;
            f1 += 1;
        }
        if(i<tamanhoTabuleiro && e.linhasMatrixJogadas[i+1][j]!=null && e.colunasMatrixJogadas[i][j]!=null && e.colunasMatrixJogadas[i][j+1]!=null){
            e.boxesMatrixJogadas[i][j]=e.jogadorAtual;
            f1 += 1;
        }
        else if(f1 == 0){
            e.jogadorAtual = e.jogadorAtual == 1 ? 2 : 1
        }

        return e
    }
    

    function simulaJogadaColuna(e,i,j){

        var f1 = 0;
        e.colunasMatrixJogadas[i][j] = e.jogadorAtual
        
        if(j>0 && e.colunasMatrixJogadas[i][j-1]!=null && e.linhasMatrixJogadas[i][j-1]!=null && e.linhasMatrixJogadas[i+1][j-1]!=null){
            e.boxesMatrixJogadas[i][j-1]=e.jogadorAtual;
            f1 += 1;
        }
        if(j<tamanhoTabuleiro && e.colunasMatrixJogadas[i][j+1]!=null && e.linhasMatrixJogadas[i][j]!=null && e.linhasMatrixJogadas[i+1][j]!=null){
            e.boxesMatrixJogadas[i][j]=e.jogadorAtual;
            f1 +=1;
        }
        else if (f1 == 0 ){
            e.jogadorAtual = e.jogadorAtual == 1 ? 2 : 1
        }

        return e
    }


    function capturasJogadaLinha(e,i,j){

        var r = 0

        if( i != tamanhoTabuleiro &&
            e.colunasMatrixJogadas[i][j] != null &&
            e.colunasMatrixJogadas[i][j+1] != null &&
            e.linhasMatrixJogadas[i+1][j] != null){
                r+=1
            }
        else if (i != tamanhoTabuleiro &&
                ((e.colunasMatrixJogadas[i][j] != null &&  e.colunasMatrixJogadas[i][j+1] != null) ||
                (e.colunasMatrixJogadas[i][j] != null &&  e.linhasMatrixJogadas[i+1][j] != null) ||
                (e.colunasMatrixJogadas[i][j+1] != null &&  e.linhasMatrixJogadas[i+1][j] != null))){
                r-=1
        }

        if( i != 0 &&
            e.colunasMatrixJogadas[i-1][j] != null &&
            e.colunasMatrixJogadas[i-1][j+1] != null &&
            e.linhasMatrixJogadas[i-1][j] != null){
                r+=1
        }
        else if(i != 0 &&
            ((e.colunasMatrixJogadas[i-1][j] != null &&  e.colunasMatrixJogadas[i-1][j+1] != null) ||
            (e.colunasMatrixJogadas[i-1][j] != null  &&  e.linhasMatrixJogadas[i-1][j] != null) ||
            (e.colunasMatrixJogadas[i-1][j+1] != null &&  e.linhasMatrixJogadas[i-1][j] != null))){
                r=-1
        }    


        return r

    }

    function capturasJogadaColuna(e,i,j){

        var r = 0 

        if( j != (tamanhoTabuleiro+1) &&
            e.linhasMatrixJogadas[i][j] != null &&
            e.colunasMatrixJogadas[i][j+1] != null &&
            e.linhasMatrixJogadas[i+1][j] != null){
                r+=1
        }
        else if(j != (tamanhoTabuleiro + 1) &&
        ((e.linhasMatrixJogadas[i][j] != null &&  e.colunasMatrixJogadas[i][j+1] != null) ||
        (e.linhasMatrixJogadas[i][j] != null &&  e.linhasMatrixJogadas[i+1][j] != null) ||
        (e.linhasMatrixJogadas[i+1][j] != null &&  e.colunasMatrixJogadas[i][j+1] != null))){
            r-=1

        }

        if( j != 0 &&
            e.linhasMatrixJogadas[i][j-1] != null &&
            e.colunasMatrixJogadas[i][j-1] != null &&
            e.linhasMatrixJogadas[i+1][j-1] != null){
                r+=1
        }
        else if(j != 0 &&
            ((e.linhasMatrixJogadas[i][j-1] != null &&  e.colunasMatrixJogadas[i][j-1] != null) ||
            (e.linhasMatrixJogadas[i][j-1] != null &&  e.linhasMatrixJogadas[i+1][j-1] != null) ||
            (e.linhasMatrixJogadas[i+1][j-1] != null &&  e.colunasMatrixJogadas[i][j-1] != null))){
            r-=1
        }    


        return r

    }

    function prioridadeLinha(e){

        var lista = []
        var listasorted = []

        for (var i = 0; i < tamanhoTabuleiro + 1; i++){
            for (var j = 0; j < tamanhoTabuleiro; j++){
                if(validaJogadaLinha(e,i,j)){ 
                    var aux = [i,j,capturasJogadaLinha(e,i,j)]
                    lista.push(aux)
                }
            }
        }    


        lista.sort(function(a,b){
            return b[2] - a[2]
        })

        for (i = 0 ; i<lista.length ; i++){
            var aux = lista[i]
            listasorted.push(aux[0])
            listasorted.push(aux[1])
            listasorted.push(aux[2])
        }

        return listasorted.reverse()

    }

    function prioridadeColuna(e){

        var lista = []
        var listasorted = []

        for (var i = 0; i < tamanhoTabuleiro; i++){
            for (var j = 0; j < tamanhoTabuleiro + 1; j++){
                if(validaJogadaColuna(e,i,j)){
                    var aux = [i,j,capturasJogadaColuna(e,i,j)]
                    lista.push(aux)
                }
            }
        }    



        lista.sort(function(a,b){
            return b[2] - a[2]
        })

        for (i = 0 ; i<lista.length ; i++){
            var aux = lista[i]
            listasorted.push(aux[0])
            listasorted.push(aux[1])
            listasorted.push(aux[2])
        }

        return listasorted.reverse()

    }



    function minimax(nodo, profundidade, alpha, beta,mudarMelhorJogada , caminho , iteracoes) {


        if ( this.nodoTerminal(nodo) && (profundidade == profundidadeMaxima)){
            fimEncontradoaux = 1;
            chain = caminho
            return [this.avaliacaoTabuleiro(nodo) , caminho];
        }
        
        if (profundidade == 0 || this.nodoTerminal(nodo) || (this.jogadasValidasColunas(nodo) == 0 && this.jogadasValidasLinhas(nodo) == 0)){
            chain = caminho
            return [this.avaliacaoTabuleiro(nodo) , caminho];
        
        }

        var jogadorMaximizante = nodo.jogadorAtual == 2 ? true : false
        var jogadorAnterior = nodo.jogadorAtual;
        var p = 0;
        var prioridadeJogada = Number.NEGATIVE_INFINITY;
        var valorTab = -5000;
        var lastChain;
        var cond;
        if (jogadorMaximizante){

            var valorMax = Number.NEGATIVE_INFINITY

            if(Math.random() < 0.5){
                var aux = ['l','c']
            }
            else{
                var aux = ['c','l']
            }


            var prioL = this.prioridadeLinha(nodo);
            var prioC = this.prioridadeColuna(nodo);


            for (var tipo = 0 ; tipo < 2 ; tipo += 1){
                var m = aux[tipo];
                var zz;
                if (m == 'l'){zz = prioL.length;}
                else{zz = prioC.length;}
                for (var auxx = 0 ; auxx < zz; auxx = auxx + 3){
                        if (m == 'l'){

                            var i = prioL.pop();
                            var j = prioL.pop();
                            var prio = prioL.pop();

                            if(this.validaJogadaLinha(nodo,i,j)){
                                let clone = deepClone(nodo);
                                jogadorAnterior = clone.jogadorAtual;
                                clone = this.simulaJogadaLinha(clone,i,j);


                                if (jogadorAnterior == clone.jogadorAtual){
                                    p+=1;
                                    var auxilio = caminho
                                    if ( profundidade == profundidadeMaxima && iteracoes<5 && dificuldade==3 ){
                                        auxilio.push(['l',i,j])
                                    }
                                    var auxL = this.minimax(clone,profundidade - 1 + p  ,alpha,beta,0,auxilio,iteracoes+1);
                                    auxilio = [];
                                    var valorTab = auxL[0];
                                    var lastChain = auxL[1];
                                }
                                else{

                                    var auxL = this.minimax(clone,profundidade - 1 ,alpha,beta,0,caminho,iteracoes+1);
                                    var valorTab = auxL[0];
                                    var lastChain = auxL[1];
                                }
                                
                                if(profundidade == profundidadeMaxima && fimEncontradoaux && mudarMelhorJogada || 
                                   profundidade == profundidadeMaxima && (valorTab > tamanhoTabuleiro/2) && mudarMelhorJogada ){
                                     fimEncontrado = 1;
                                 }



                                p = 0;
                                let a = valorMax;
                                valorMax = Math.max(valorMax,valorTab);


                                if(lateGame){

                                    cond = true

                                }
                                else{

                                    cond = prio >= prioridadeJogada
                                }



                                if (profundidade == profundidadeMaxima && mudarMelhorJogada == 1 && cond){               //so muda jogadas no primeiro minimax
                                    if (a == valorTab ){ //melhor jogada tambem
                                        if (Math.random() < 0.25){ //para ser mais aleatório a jogada, quando as jogadas são valorizadas de igual forma
                                            jogadaBotStruct.modo = 'l'
                                            jogadaBotStruct.iMelhor = i
                                            jogadaBotStruct.jMelhor = j
                                            jogadaBotStruct.caminho = lastChain
                                            jogadaBotStruct.valor = valorTab
                                            prioridadeJogada = Math.max(prio , prioridadeJogada)
                                            
                                        }   
                                    }
                                    else {
                                        if (valorMax == valorTab){ //melhor jogada agora
                                            jogadaBotStruct.modo = 'l'
                                            jogadaBotStruct.iMelhor = i
                                            jogadaBotStruct.jMelhor = j
                                            jogadaBotStruct.caminho = lastChain
                                            jogadaBotStruct.valor = valorTab
                                            prioridadeJogada = Math.max(prio , prioridadeJogada) 
                                        }
                                    } 
                                }  
                        }}
                        
                        if (m == 'c') {

                            var i = prioC.pop();
                            var j = prioC.pop();
                            var prio = prioC.pop();
                            if(this.validaJogadaColuna(nodo,i,j)){
                            
                                let clone = deepClone(nodo);
                                jogadorAnterior = clone.jogadorAtual;
                                clone = this.simulaJogadaColuna(clone,i,j);


                                if (jogadorAnterior == clone.jogadorAtual && iteracoes<5 && dificuldade==3 ){
                                    p+=1;
                                    var auxilio = caminho
                                    if ( profundidade == profundidadeMaxima){
                                        auxilio.push(['c',i,j])
                                    }
                                    var auxL = this.minimax(clone,profundidade - 1 + p  ,alpha,beta,0,auxilio,iteracoes+1);
                                    auxilio = [];
                                    var valorTab = auxL[0];
                                    var lastChain = auxL[1];
                                }
                                else{

                                    var auxL = this.minimax(clone,profundidade - 1 ,alpha,beta,0,caminho,iteracoes+1);
                                    var valorTab = auxL[0];
                                    var lastChain = auxL[1];
                                }
                                
                                if(profundidade == profundidadeMaxima && fimEncontradoaux && mudarMelhorJogada || 
                                   profundidade == profundidadeMaxima && (valorTab > tamanhoTabuleiro/2) && mudarMelhorJogada ){
                                    fimEncontrado = 1;
                                }
                                


                                p = 0
                                let a = valorMax
                                valorMax = Math.max(valorMax,valorTab)

                                if(lateGame){

                                    cond = true

                                }
                                else{

                                    cond = prio >= prioridadeJogada
                                }


                                if (profundidade == profundidadeMaxima && mudarMelhorJogada==1 && cond){
                                    if (a == valorTab ){ //melhor jogada tambem
                                        if (Math.random() < 0.25){   // desempate entre jogar coluna ou linha, nas igual valorizadas
                                            jogadaBotStruct.modo = 'c'
                                            jogadaBotStruct.iMelhor = i
                                            jogadaBotStruct.jMelhor = j
                                            jogadaBotStruct.caminho = lastChain
                                            jogadaBotStruct.valor = valorTab
                                            prioridadeJogada = Math.max(prio , prioridadeJogada)
                                        }
                                    }
                                    else {
                                        if (valorMax == valorTab){ //melhor jogada agora
                                            jogadaBotStruct.modo = 'c'
                                            jogadaBotStruct.iMelhor = i
                                            jogadaBotStruct.jMelhor = j
                                            jogadaBotStruct.caminho = lastChain
                                            jogadaBotStruct.valor = valorTab
                                            prioridadeJogada = Math.max(prio , prioridadeJogada)
                                        }
                                    }
                                }
                        }
                    }


                        alpha = Math.max(alpha,valorMax);
                        if (beta <= alpha || fimEncontrado)         // pruning
                            break;
                    
            }

            alpha = Math.max(alpha,valorMax);
            if (beta <= alpha || fimEncontrado)         // pruning
                break;


        }

            return [valorMax,caminho];
        }

        //minimizante
        else{
            var valorMin = Number.POSITIVE_INFINITY
            aux = ['l','c']
            prioL = this.prioridadeLinha(nodo);
            prioC = this.prioridadeColuna(nodo);
 

            for (var tipo = 0 ; tipo < 2 ; tipo+= 1){
                var m =aux[tipo];
                var zz;
                if (m == 'l'){zz = prioL.length;}
                else{zz = prioC.length;}
                for (var auxx = 0 ; auxx < zz; auxx = auxx + 3){
                        if (m == 'l'){
                            var i = prioL.pop();
                            var j = prioL.pop();
                            var prio = prioL.pop();

                            if (this.validaJogadaLinha(nodo,i,j)){
                                let clone = deepClone(nodo);
                                jogadorAnterior = clone.jogadorAtual;
                                clone = this.simulaJogadaLinha(clone,i,j);


                                if (jogadorAnterior == clone.jogadorAtual && iteracoes < 6 && dificuldade==3){
                                    p+=1;
                                    var auxL = this.minimax(clone,profundidade - 1 + p ,alpha,beta,0,caminho,iteracoes+1);
                                    var valorTab = auxL[0];
                                }
                                else{
                                    var auxL = this.minimax(clone,profundidade - 1 ,alpha,beta,0,caminho,iteracoes+1);
                                    var valorTab = auxL[0];
                                }

                                p = 0
                                let a = valorMin
                                valorMin = Math.min(valorMin,valorTab)
 

                        }
                    }
                        if (m == 'c'){ 
                            var i = prioC.pop();
                            var j = prioC.pop();
                            var prio = prioC.pop();

                                if (this.validaJogadaColuna(nodo,i,j)){

                                let clone = deepClone(nodo);
                                jogadorAnterior = clone.jogadorAtual;
                                clone = this.simulaJogadaColuna(clone,i,j)

                                if (jogadorAnterior == clone.jogadorAtual && iteracoes < 6 && dificuldade==3){
                                    p+=1;
                                    var auxL = this.minimax(clone,profundidade - 1 + p ,alpha,beta,0,caminho,iteracoes+1);
                                    var valorTab = auxL[0];
                                }
                                else{
                                    var auxL = this.minimax(clone,profundidade - 1 ,alpha,beta,0,caminho,iteracoes+1);
                                    var valorTab = auxL[0];
                                }

                                p = 0
                                let a = valorMin
                                valorMin = Math.min(valorMin,valorTab)


                        }}
                        beta = Math.min(beta,valorMin);
                        if (beta <= alpha)                // pruning
                            break;
                    }

                    beta = Math.min(beta,valorMin);
                    if (beta <= alpha)                // pruning
                        break;

                }

            return [valorMin,caminho];
        }


    }
