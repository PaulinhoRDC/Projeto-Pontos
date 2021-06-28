var console = {};
console.log = function(){};



var pontuou = 0;
var teste = new Map();

var text1 = "";
var text2 = "";
var textFim = "";
var jogadorAtual = 1;
var tamanhoTabuleiro;

var scaleBox;
var stepBox;
var yAux;

var linhasMatrix = [];
var colunasMatrix = [];
var boxesMatrix = [];

var linhasMatrixJogadas = [];
var colunasMatrixJogadas = [];
var boxesMatrixJogadas = [];

var atualJogador;
var atualJogador2;


var scaleBox = 0;
var imagemColuna = 0;
var imagemLinha = 0;
var tamanho = 0;
var cheirinho = 0;
var cheirinho2 = 0;


var modo = "";
var dificuldade = 0;


var imagemSair;
var imagemClose;
var imagemSim;
var imagemNao;
var imagemCasinha;
var imagemFimJogo;
var imagemClose2;
var imagemPlayAgain;
var imagemVoltar;
var textFimDeJogo;


var jogosGanhos1;
var jogosGanhos2;

var textJogosGanhos1;
var textJogosGanhos2;



var jogadaBotStruct = {
    modo: '',
    iMelhor: 0,
    jMelhor: 0
}

var estado = {
    jogadorAtual: 0,
    linhasMatrixJogadas: [],
    colunasMatrixJogadas: [],
    boxesMatrixJogadas: []
}

var desempate;
var speechBuble;
var textBuble;

var profundidadeMaxima;
var jogoAcabou;

var t1;
var t2;
var t3;
var t4;

var imagemAmpulheta;
var imagemUltimaJogada;
var orientacaoUltimaJogada;
var probRandom;


var listaJogadasAnteriores;


var pontosJogador1 = 0;
var pontosJogador2 = 0;

var context;

class Jogo extends Phaser.Scene {
    constructor() {
        super('Jogo');
                pontosJogador1 = 0;
        pontosJogador2 = 0;
        this.imagens = [];
    }

    init(data) {

        pontosJogador1 = 0;
        pontosJogador2 = 0;
        console.log('init', data);
        tamanhoTabuleiro = data.t;
        modo = data.m;
        dificuldade = data.d;
        jogosGanhos1 = data.j1;
        jogosGanhos2 = data.j2;
        console.log(data.t);
        jogadorAtual = 1;

    }

    preload() {
        this.load.image('background', 'assets/backgroundSQ.png');
        this.load.image('titulo2', 'assets/titulo2.png');
        this.load.image('player_1', 'assets/player_1_azul.png');
        this.load.image('player_2', 'assets/player_1_red.png');
        this.load.image('computer', 'assets/computer.png');

        this.load.image('square_2', 'assets/square_2_rezise.png');
        this.load.image('square_2_red', 'assets/quadrados/square_2_rezise_red.png');
        this.load.image('square_2_blue', 'assets/quadrados/square_2_rezise_blue.png');


        this.load.image('linha_horizontal_verde', 'assets/linhas/linha_horizontal_verde.png');
        this.load.image('linha_vertical_verde', 'assets/linhas/linha_vertical_verde.png');

        this.load.image('linha_horizontal_vermelha', 'assets/linhas/linha_horizontal_vermelha.png');
        this.load.image('linha_vertical_vermelha', 'assets/linhas/linha_vertical_vermelha.png');

        this.load.image('linha_horizontal_azul', 'assets/linhas/linha_horizontal_azul.png');
        this.load.image('linha_vertical_azul', 'assets/linhas/linha_vertical_azul.png');

        this.load.image('linha_horizontal_preto', 'assets/linhas/linha_horizontal_preto.png');
        this.load.image('linha_vertical_preto', 'assets/linhas/linha_vertical_preto.png');

        this.load.image('m2', 'assets/monster_2.png');
        this.load.image('casinha', 'assets/retmenuBT.png');
        this.load.image('5x5', 'assets/bt_5x5.png');
        this.load.image('6x6', 'assets/bt_6x6n.png');
        this.load.image('8x8', 'assets/bt_8x8n.png');
        this.load.image('level1', 'assets/level1.png');
        this.load.image('level2', 'assets/level2.png');
        this.load.image('level3', 'assets/level3.png');




        this.load.image('boardEnd', 'assets/boardEnd.png');
        this.load.image('boardEnd2', 'assets/boardEnd2.png');

        this.load.image('refresh', 'assets/refreshBT.png');
        this.load.image('return', 'assets/retmenuBT.png');
        this.load.image('sair', 'assets/sair.png');
        this.load.image('sim', 'assets/btsim.png');
        this.load.image('nao', 'assets/btnao.png');
        this.load.image('fullScreen', 'assets/fullscreen.png');
        this.load.image('noFullScreen', 'assets/fullscreen2.png');



        this.load.image('ampulheta', 'assets/ampulheta.png');
        this.load.image('speechBuble', 'assets/speech_buble.png'); // Balao de fala do bot
        this.load.image('linha_ultima_jogada_v', 'assets/linhas/linha_vertical_vermelha_escura.png');
        this.load.image('linha_ultima_jogada_h', 'assets/linhas/linha_horizontal_vermelha_escura.png');




    }

    create() {
        jogoAcabou = false;




        imagemUltimaJogada = null;
        this.add.image(0.5 * game.config.width, 0.5 * game.config.height, 'background');
        const style = {
            font: "bold 32px Arial",
            fill: "#fff"
        };


        for(var i=0; i<tamanhoTabuleiro; i++) {
            boxesMatrixJogadas[i] = new Array(tamanhoTabuleiro);
        }
        for(var i=0; i<tamanhoTabuleiro+1; i++) {
            linhasMatrixJogadas[i] = new Array(tamanhoTabuleiro);
            if (i < tamanhoTabuleiro){
            colunasMatrixJogadas[i] = new Array(tamanhoTabuleiro + 1);}
        }


        imagemAmpulheta = this.add.image(1065, 320, 'ampulheta').setScale(0.45);
        imagemAmpulheta.visible = false;


        speechBuble = this.add.image(0.81 * game.config.width, 0.80 * game.config.height, 'speechBuble').setScale(0.28);
        speechBuble.visible = false;
        this.imagens.push(speechBuble)

        textBuble = this.add.text(0.75 * game.config.width, 0.76 * game.config.height, "", {
            font: "bold 14px Arial",
            fill: "#000000"
        });
        textBuble.visible = false;
        this.imagens.push(textBuble)




        if (modo == "pvp") {
            imagem = this.add.image(1200, 320, 'player_2').setScale(0.45);
            this.imagens.push(imagem);
        } else {
            imagem = this.add.image(1200, 320, 'computer').setScale(0.45);
            this.imagens.push(imagem);
        }



        var imagem = this.add.image(1200, 220, 'player_1').setScale(0.45);
        this.imagens.push(imagem);



        text1 = this.add.text(1200, 200, '0', style);
        text2 = this.add.text(1200, 300, '0', style);
        this.imagens.push(text1);
        this.imagens.push(text2);


        if (jogosGanhos1 != 0 || jogosGanhos2 != 0) {

            const style2 = {
                font: "bold 24px Arial",
                fill: "#fff"
            };



            if (modo == "pvp") {
                imagem = this.add.image(1215, 540, 'player_2').setScale(0.35);
                this.imagens.push(imagem);
            } else {
                imagem = this.add.image(1215, 540, 'computer').setScale(0.35);
                this.imagens.push(imagem);
            }

            var imagem = this.add.image(1215, 470, 'player_1').setScale(0.35);
            this.imagens.push(imagem);


            textJogosGanhos1 = this.add.text(1215, 455, jogosGanhos1, style2);
            textJogosGanhos2 = this.add.text(1215, 525, jogosGanhos2, style2);
            this.imagens.push(textJogosGanhos1);
            this.imagens.push(textJogosGanhos2);
        }


        
        var imagemtitle = this.add.image(0.5 * game.config.width, 100, 'titulo2').setScale(0.45);
        this.imagens.push(imagemtitle);



        yAux = 220;
        imagem = this.add.image(0.93 * game.config.width, 0.86 * game.config.height, 'm2').setScale(0.45);
        this.imagens.push(imagem);

        imagemCasinha = this.add.image(0.04 * game.config.width, 0.82 * game.config.height, 'casinha').setScale(0.47);
        imagemCasinha.setInteractive();
        imagemCasinha.name = 'casinha';
        this.imagens.push(imagemCasinha);

        teste.set('casinha', imagemCasinha);
        teste.get('casinha').on('pointerover', () => {
            teste.get('casinha').displayHeight += 10;
            teste.get('casinha').displayWidth += 10;
        });
        teste.get('casinha').on('pointerout', () => {
            teste.get('casinha').displayHeight -= 10;
            teste.get('casinha').displayWidth -= 10;
        });


        if (tamanhoTabuleiro == 6) {
            scaleBox = 0.75;
            imagemColuna = 0.75;
            imagemLinha = 0.75;
            tamanho = 2.5;
            cheirinho = 20.0;
            cheirinho2 = 0.0;
            imagem = this.add.image(0.14 * game.config.width, 0.16 * game.config.height, '6x6').setScale(0.50);
            imagem = this.imagens.push(imagem);
            probRandom = 0.03;
        }
        if (tamanhoTabuleiro == 8) {
            scaleBox = 0.60;
            imagemColuna = 0.60;
            imagemLinha = 0.60;
            tamanho = 3.5;
            cheirinho = 0.0;
            cheirinho2 = 0.0;
            imagem = this.add.image(0.14 * game.config.width, 0.16 * game.config.height, '8x8').setScale(0.50);
            this.imagens.push(imagem);
            probRandom = 0.05;
        }
        if (tamanhoTabuleiro == 5) {
            scaleBox = 0.85;
            imagemColuna = 0.90;
            imagemLinha = 0.90;
            tamanho = 2.0;
            cheirinho = 20.0;
            cheirinho2 = 0.0;
            imagem = this.add.image(0.14 * game.config.width, 0.16 * game.config.height, '5x5').setScale(0.50);
            this.imagens.push(imagem);
            probRandom = 0.05;
        }

        if (modo == "pvcp") {
            if (dificuldade==1){
                imagem = this.add.image(0.195 * game.config.width, 0.195 * game.config.height, 'level1').setScale(0.35);
                this.imagens.push(imagem);
            }
            if (dificuldade==2){
                imagem = this.add.image(0.195 * game.config.width, 0.195 * game.config.height, 'level2').setScale(0.35);
                this.imagens.push(imagem);
            }
            if (dificuldade==3){
                imagem = this.add.image(0.195 * game.config.width, 0.195 * game.config.height, 'level3').setScale(0.35);
                this.imagens.push(imagem);
            }
        }

        stepBox = scaleBox * 100;
        for (var i = 0; i < tamanhoTabuleiro + 1; i++) {
            let linhaBox = [];
            let linhaLinhas = [];
            let colunaLinhas = [];

            for (var j = 0; j < tamanhoTabuleiro + 1; j++) {

                if (j < tamanhoTabuleiro && i < tamanhoTabuleiro) {
                    //4.5 para 10    2.5 para 6      3.5 para 8
                    var imageQuadrado = this.add.sprite(0.5 * game.config.width - tamanho * stepBox + stepBox * j, yAux + stepBox * i + cheirinho, 'square_2').setScale(scaleBox)
                    linhaBox[j] = imageQuadrado;
                    this.imagens.push(imageQuadrado);

                }


                if (j < tamanhoTabuleiro) {
                    var imageLinha = this.add.sprite(0.5 * game.config.width - tamanho * stepBox + stepBox * j + cheirinho2, yAux + (stepBox * i) - (stepBox / 2) + cheirinho, 'linha_horizontal_verde').setScale(imagemLinha);
                    var hitbox = new Phaser.Geom.Rectangle(0, -5, 100, 25);
                    this.imagens.push(imageLinha);
                    imageLinha.setInteractive(hitbox, Phaser.Geom.Rectangle.Contains);
                    imageLinha.on('clicked', this.clickHandlerLinha, this);
                    linhaLinhas[j] = imageLinha;

                }

                if (i < tamanhoTabuleiro) {
                    var imageColuna = this.add.sprite(0.5 * game.config.width - tamanho * stepBox + stepBox * j - (stepBox / 2), yAux + (stepBox * i) + cheirinho + cheirinho2, 'linha_vertical_verde').setScale(imagemColuna);
                    var hitbox = new Phaser.Geom.Rectangle(-5, 0, 25, 100);
                    this.imagens.push(imageColuna);
                    imageColuna.setInteractive(hitbox, Phaser.Geom.Rectangle.Contains);
                    imageColuna.on('clicked', this.clickHandlerColuna, this);
                    colunaLinhas[j] = imageColuna;
                }





            }
            boxesMatrix[i] = linhaBox;
            linhasMatrix[i] = linhaLinhas;
            colunasMatrix[i] = colunaLinhas;

        }



        atualJogador = this.add.sprite(1296, 220, 'assinala').setScale(0.55);
        this.imagens.push(atualJogador);
        atualJogador.visible = true;


        atualJogador2 = this.add.sprite(1296, 320, 'assinala').setScale(0.55);
        this.imagens.push(atualJogador2);
        atualJogador2.visible = false;


        this.input.on('gameobjectup', function(pointer, gameObject) {
            gameObject.emit('clicked', gameObject);
        }, this);


        this.events.on('transitionstart', function(fromScene, duration) {

            //console.log(duration)
            if (fromScene === this.scene.get('Menu')) {

                var targetsX = []
                this.imagens.forEach((item, index) => {
                    item.x += game.config.width;
                    targetsX.push(item)
                });


                this.tweens.add({
                    delay: 1000,
                    targets: targetsX,
                    durantion: 1000,
                    x: '-=' + game.config.width,
                    ease: 'Power2'
                });

            }


            if (fromScene === this.scene.get('Jogo')) {}
        }, this);



        this.input.on('gameobjectdown', function(pointer, gameObject) {

            switch (gameObject.name) {

                case 'casinha':
                    mudaInteractiveFalse();
                    imagemSair.visible = true;
                    imagemSim.visible = true;
                    imagemSim.setInteractive();
                    imagemNao.visible = true;
                    imagemNao.setInteractive();
                    imagemFimJogo.visible = false;
                    imagemFimJogo.visible = false;
                    imagemPlayAgain.visible = false;
                    t1.visible = false;
                    t2.visible = false;
                    t3.visible = false;
                    t4.visible = false;

                    break;

                case 'Voltar2':
                    imagemSair.visible = false;
                    imagemSim.visible = false;
                    imagemNao.visible = false;
                    this.scene.transition({
                        target: 'Menu',
                        duration: 1000,
                        moveBelow: true,
                        onUpdate: this.transitionOut,
                        data: {
                            t: tamanhoTabuleiro,
                            m: modo,
                            d: dificuldade
                        }
                    });
                    this.scene.stop('Jogo');

                    break;

                case 'PlayAgain':
                    this.registry.destroy();
                    this.events.off();
                    this.scene.start('Jogo', {
                        t: tamanhoTabuleiro,
                        m: modo,
                        d: dificuldade,
                        j1: jogosGanhos1,
                        j2: jogosGanhos2
                    });
                    break;


                case 'Sim':
                    imagemSair.visible = false;
                    imagemSim.visible = false;
                    imagemNao.visible = false;
                    this.scene.transition({
                        target: 'Menu',
                        duration: 1000,
                        moveBelow: true,
                        onUpdate: this.transitionOut,
                        data: {
                            t: tamanhoTabuleiro,
                            m: modo,
                            d: dificuldade
                        }
                    });
                    this.scene.stop('Jogo');
                    break;

                case 'Nao':
                    imagemSair.visible = false;
                    imagemSim.visible = false;
                    imagemSim.setInteractive(false);
                    imagemNao.visible = false;
                    imagemNao.setInteractive(false);
                    mudaInteractiveTrue();
                    jogoAcabou = false;
                    this.fimDeJogo();
                    break;
            }
        }, this);



        imagemSair = this.add.sprite(0.16 * game.config.width, 0.5 * game.config.height, 'sair').setScale(0.75);
        imagemSair.name = 'sair';
        imagemSair.visible = false;
        this.imagens.push(imagemSair);

        imagemClose = this.add.sprite(0.65 * game.config.width, 0.17 * game.config.height, 'close').setScale(0.5);
        imagemClose.name = 'close';
        imagemClose.visible = false;
        this.imagens.push(imagemClose);

        imagemSim = this.add.sprite(0.12 * game.config.width, 0.63 * game.config.height, 'sim').setScale(0.3);
        imagemSim.name = 'Sim';
        imagemSim.visible = false;
        this.imagens.push(imagemSim);
        teste.set('Sim', imagemSim);
        teste.get('Sim').on('pointerover', () => {
            teste.get('Sim').displayHeight += 10;
            teste.get('Sim').displayWidth += 10;
        });
        teste.get('Sim').on('pointerout', () => {
            teste.get('Sim').displayHeight -= 10;
            teste.get('Sim').displayWidth -= 10;
        });

        imagemNao = this.add.sprite(0.22 * game.config.width, 0.63 * game.config.height, 'nao').setScale(0.3);
        imagemNao.name = 'Nao';
        imagemNao.visible = false;
        this.imagens.push(imagemNao);
        teste.set('Nao', imagemNao);
        teste.get('Nao').on('pointerover', () => {
            teste.get('Nao').displayHeight += 10;
            teste.get('Nao').displayWidth += 10;
        });
        teste.get('Nao').on('pointerout', () => {
            teste.get('Nao').displayHeight -= 10;
            teste.get('Nao').displayWidth -= 10;
        });


        imagemFimJogo = this.add.sprite(0.16 * game.config.width, 0.5 * game.config.height, 'boardEnd2').setScale(0.60);
        imagemFimJogo.name = 'boardEnd2';
        imagemFimJogo.visible = false;
        this.imagens.push(imagemFimJogo);

        imagemClose2 = this.add.sprite(0.68 * game.config.width, 0.40 * game.config.height, 'close').setScale(0.5);
        imagemClose2.name = 'close';
        imagemClose2.visible = false;
        this.imagens.push(imagemClose2);

        imagemPlayAgain = this.add.sprite(0.16 * game.config.width, 0.65 * game.config.height, 'refresh').setScale(0.40).setRotation(115);
        imagemPlayAgain.name = 'PlayAgain';
        imagemPlayAgain.visible = false;
        this.imagens.push(imagemPlayAgain);
        teste.set('PlayAgain', imagemPlayAgain);
        teste.get('PlayAgain').on('pointerover', () => {
            teste.get('PlayAgain').displayHeight += 10;
            teste.get('PlayAgain').displayWidth += 10;
        });
        teste.get('PlayAgain').on('pointerout', () => {
            teste.get('PlayAgain').displayHeight -= 10;
            teste.get('PlayAgain').displayWidth -= 10;
        });


        this.setFullScreenButton();
    }

    setFullScreenButton() {
        if (!this.scale.isFullscreen) {
            this.fullScreen = this.add.image(0.90 * game.config.width, 100, 'fullScreen').setScale(0.5);
        } else {
            this.fullScreen = this.add.image(0.90 * game.config.width, 100, 'noFullScreen').setScale(0.5);
        }
        this.fullScreen.name = 'fullScreen';
        this.imagens.push(this.fullScreen);


        this.fullScreen.setInteractive({
            useHandCursor: true
        });

        this.fullScreen.on('pointerover', () => {
            this.fullScreen.displayHeight += 5;
            this.fullScreen.displayWidth += 5;

        });
        this.fullScreen.on('pointerout', () => {
            this.fullScreen.displayHeight -= 5;
            this.fullScreen.displayWidth -= 5;

        });

        this.fullScreen.on('pointerup', function() {
            if (!this.scale.isFullscreen) {
                this.fullScreen.setTexture('noFullScreen');
                this.scale.startFullscreen();
            } else {
                this.scale.stopFullscreen();
                this.fullScreen.setTexture('fullScreen');
            }
        }, this);
    }


    //#region JogarLinha
    clickHandlerLinha(linha) {

        speechBuble.visible = false;
        textBuble.visible = false;

        var i = ((linha.y + (stepBox / 2) - yAux - cheirinho) / stepBox)
        var j = (linha.x - 0.5 * game.config.width + tamanho * stepBox) / stepBox

        if (linhasMatrixJogadas[i][j] == null) {
            this.jogarLinha(i, j, linha)

            //this.botMain()

            if (modo == "pvcp" && jogadorAtual == 2) {

                
                if (testeFimDeJogo()) {
                    
                    this.fimDeJogo()
                }

                else{           
                    mudaInteractiveFalse();      
                    imagemAmpulheta.visible = true;
                    var myWorker = new Worker('worker.js');


                    
                    estado = new auxiliares().atualizaEstado(estado, jogadorAtual, linhasMatrixJogadas, colunasMatrixJogadas, boxesMatrixJogadas);

                    var objetoEnviar = 
                    {
                        e : estado,
                        d : dificuldade,
                        t : tamanhoTabuleiro,
                        pr: probRandom
                    }

                    var object = JSON.stringify(objetoEnviar);

                    console.log("enviado", object);
                    myWorker.postMessage(object)
                    context = this;

                    myWorker.onmessage = function(oEvent) {
                        console.log('Worker said : ' + oEvent.data);
                        

                        var estadoRecebido = oEvent.data;
                        var colunasRecebidas = estadoRecebido.c;
                        var linhasRecebidas = estadoRecebido.l;
                        var boxesRecebidas = estadoRecebido.b;
                        var listajogadasBot = estadoRecebido.j;
                        console.log(colunasRecebidas,linhasRecebidas,boxesRecebidas,listajogadasBot)


                        listaJogadasAnteriores = listajogadasBot;

                        for(i = 0; i < listajogadasBot.length; i ++ ){
                            if(!(jogoAcabou)){
                                if (listaJogadasAnteriores[i][0] == "l"){
                                    context.jogarLinha(listaJogadasAnteriores[i][1],listaJogadasAnteriores[i][2],linhasMatrix[listaJogadasAnteriores[i][1]][listaJogadasAnteriores[i][2]]);
                                    
                                }
                                else {
                                    context.jogarColuna(listaJogadasAnteriores[i][1],listaJogadasAnteriores[i][2],colunasMatrix[listaJogadasAnteriores[i][1]][listaJogadasAnteriores[i][2]]);
                                }
                            }
                            

                        }

                        myWorker.terminate();
                        imagemAmpulheta.visible = false;
                        mudaInteractiveTrue();
                    };
                    imagemCasinha.setInteractive(true);
                    imagemCasinha.input.enabled = true;
                    
                }
                
                
                
            }



        }


        
    }




    jogada(t, i, j) {
        if (t == 'l') {
            if (i > 0 && linhasMatrixJogadas[i - 1][j] != null && colunasMatrixJogadas[i - 1][j] != null && colunasMatrixJogadas[i - 1][j + 1] != null) {
                console.log("fechou quadrado")
                imagemUltimaJogada = null
                boxesMatrixJogadas[i - 1][j] = jogadorAtual;
                //jogadorAtual = jogadorAtual==1 ? 2 : 1;
                if (jogadorAtual == 1) {
                    boxesMatrix[i - 1][j].setTexture('square_2_blue')
                } else {
                    boxesMatrix[i - 1][j].setTexture('square_2_red')
                }
                linhasMatrix[i][j].setTexture('linha_horizontal_preto')
                linhasMatrix[i - 1][j].setTexture('linha_horizontal_preto')
                colunasMatrix[i - 1][j].setTexture('linha_vertical_preto')
                colunasMatrix[i - 1][j + 1].setTexture('linha_vertical_preto')
                pontuou = 1;
                aumentaPontos();
                this.fimDeJogo();

            }
            if (i < tamanhoTabuleiro && linhasMatrixJogadas[i + 1][j] != null && colunasMatrixJogadas[i][j] != null && colunasMatrixJogadas[i][j + 1] != null) {
                console.log("fechou quadrado")
                imagemUltimaJogada = null
                boxesMatrixJogadas[i][j] = jogadorAtual;
                //jogadorAtual = jogadorAtual==1 ? 2 : 1;
                if (jogadorAtual == 1) {
                    boxesMatrix[i][j].setTexture('square_2_blue')
                } else {
                    boxesMatrix[i][j].setTexture('square_2_red')
                }
                linhasMatrix[i][j].setTexture('linha_horizontal_preto')
                linhasMatrix[i + 1][j].setTexture('linha_horizontal_preto')
                colunasMatrix[i][j].setTexture('linha_vertical_preto')
                colunasMatrix[i][j + 1].setTexture('linha_vertical_preto')
                pontuou = 1;
                aumentaPontos();
                this.fimDeJogo();

            }
        } else {
            if (j > 0 && colunasMatrixJogadas[i][j - 1] != null && linhasMatrixJogadas[i][j - 1] != null && linhasMatrixJogadas[i + 1][j - 1] != null) {
                console.log("fechou quadrado")
                imagemUltimaJogada = null
                boxesMatrixJogadas[i][j - 1] = jogadorAtual;
                //jogadorAtual = jogadorAtual==1 ? 2 : 1;
                if (jogadorAtual == 1) {
                    boxesMatrix[i][j - 1].setTexture('square_2_blue')
                } else {
                    boxesMatrix[i][j - 1].setTexture('square_2_red')
                }
                linhasMatrix[i][j - 1].setTexture('linha_horizontal_preto')
                linhasMatrix[i + 1][j - 1].setTexture('linha_horizontal_preto')
                colunasMatrix[i][j - 1].setTexture('linha_vertical_preto')
                colunasMatrix[i][j].setTexture('linha_vertical_preto')
                pontuou = 1;
                aumentaPontos();
                this.fimDeJogo();

            }
            if (j < tamanhoTabuleiro && colunasMatrixJogadas[i][j + 1] != null && linhasMatrixJogadas[i][j] != null && linhasMatrixJogadas[i + 1][j] != null) {
                console.log("fechou quadrado")
                imagemUltimaJogada = null
                boxesMatrixJogadas[i][j] = jogadorAtual;
                //jogadorAtual = jogadorAtual==1 ? 2 : 1;
                if (jogadorAtual == 1) {
                    boxesMatrix[i][j].setTexture('square_2_blue')
                } else {
                    boxesMatrix[i][j].setTexture('square_2_red')
                }
                linhasMatrix[i][j].setTexture('linha_horizontal_preto')
                linhasMatrix[i + 1][j].setTexture('linha_horizontal_preto')
                colunasMatrix[i][j].setTexture('linha_vertical_preto')
                colunasMatrix[i][j + 1].setTexture('linha_vertical_preto')
                pontuou = 1;
                aumentaPontos();
                this.fimDeJogo();

    
            }
        }
    }
    




    //#endregion

    //#region JogarColuna
    clickHandlerColuna(linha) {

        speechBuble.visible = false;
        textBuble.visible = false;

        var i = ((linha.y - yAux - cheirinho) / stepBox)
        var j = (linha.x - 0.5 * game.config.width + tamanho * stepBox + (stepBox / 2)) / stepBox

        if (colunasMatrixJogadas[i][j] == null) {
            this.jogarColuna(i, j, linha)

            //this.botMain()

            if (modo == "pvcp" && jogadorAtual == 2) {

                
                if (testeFimDeJogo()) {
                    context = this;
                    this.fimDeJogo()
                }

                else{              
                    imagemAmpulheta.visible = true;
                    var myWorker = new Worker('worker.js');


                    
                    estado = new auxiliares().atualizaEstado(estado, jogadorAtual, linhasMatrixJogadas, colunasMatrixJogadas, boxesMatrixJogadas);

                    var objetoEnviar = 
                    {
                        e : estado,
                        d : dificuldade,
                        t : tamanhoTabuleiro,
                        pr: probRandom
                    }

                    var object = JSON.stringify(objetoEnviar);

                    console.log("enviado", object);
                    myWorker.postMessage(object)
                    context = this;


                    myWorker.onmessage = function(oEvent) {
                        console.log('Worker said : ' + oEvent.data);
                        

                        var estadoRecebido = oEvent.data;
                        var colunasRecebidas = estadoRecebido.c;
                        var linhasRecebidas = estadoRecebido.l;
                        var boxesRecebidas = estadoRecebido.b;
                        var listajogadasBot = estadoRecebido.j;
                        console.log(colunasRecebidas,linhasRecebidas,boxesRecebidas,listajogadasBot)


                        //Atualizar estado do jogo
                        
                        listaJogadasAnteriores = listajogadasBot;

                        for(i = 0; i < listajogadasBot.length; i ++ ){
                            if(!(jogoAcabou)){
                                if (listaJogadasAnteriores[i][0] == "l"){
                                    context.jogarLinha(listaJogadasAnteriores[i][1],listaJogadasAnteriores[i][2],linhasMatrix[listaJogadasAnteriores[i][1]][listaJogadasAnteriores[i][2]]);
                                    
                                }
                                else {
                                    context.jogarColuna(listaJogadasAnteriores[i][1],listaJogadasAnteriores[i][2],colunasMatrix[listaJogadasAnteriores[i][1]][listaJogadasAnteriores[i][2]]);
                                }
                            }
                        }

                        myWorker.terminate();
                        imagemAmpulheta.visible = false;
                    };

                    
                }
                
            }



        }


    }




    //#endregion


    /**
     * Animation to start a new game
     * @param {number} progress Animation progress
     */
    transitionOut(progress) {

        progress = progress / 9;

        this.imagens.forEach((values, keys) => {
            values.x = values.x + progress * (game.config.width / 4);
        })

        if (jogoAcabou) { // se Ã© fim de jogo
            t1.x = t1.x + progress * (game.config.width / 4);
            t2.x = t2.x + progress * (game.config.width / 4);
            t3.x = t3.x + progress * (game.config.width / 4);
            t4.x = t4.x + progress * (game.config.width / 4);
        }
    }

    update() {

    }

    
    fimDeJogo() {
        if (!jogoAcabou) {

            var f = 1;
            var fim= Math.floor((tamanhoTabuleiro*tamanhoTabuleiro)/2);
            if (pontosJogador1>fim || pontosJogador2>fim){
                f=0;
            }
            
            if (f == 0) {
                imagemAmpulheta.visible = false;
                mudaInteractiveFalse();
                imagemCasinha.setInteractive(true);
                imagemCasinha.input.enabled = true;
                jogoAcabou = true;
                imagemFimJogo.visible = true;
                imagemPlayAgain.visible = true;
                imagemPlayAgain.setInteractive();

                /*imagemVoltar.visible = true;
                imagemVoltar.setInteractive();*/
                //textFimDeJogo.visible = true;


                const style1 = {
                    font: "bold 18px Arial",
                    fill: "#000000"
                }; //preto
                const style4 = {
                    font: "bold 18px Arial",
                    fill: "#000000"
                }; //preto big
                const style2 = {
                    font: "bold 18px Arial",
                    fill: "#FF0000"
                }; //vermelho
                const style3 = {
                    font: "bold 18px Arial",
                    fill: "#0846A4"
                }; //azul


                t1 = this.add.text(0.095 * game.config.width, 0.495 * game.config.height, '', style1); //resultado
                t2 = this.add.text(0.15 * game.config.width, 0.55 * game.config.height, '', style3); // difere -6 
                t3 = this.add.text(0.165 * game.config.width, 0.55 * game.config.height, '', style4); // normal
                t4 = this.add.text(0.1725 * game.config.width, 0.55 * game.config.height, '', style2); // +4

                this.imagens.push(t1)
                this.imagens.push(t2)
                this.imagens.push(t3)
                this.imagens.push(t4)

                if(modo == "pvcp")
                {
                    if (localStorage.jogosTotais) {
                        localStorage.jogosTotais = Number(localStorage.jogosTotais) + 1;
                    } else {
                        localStorage.jogosTotais = 1;
                    }

                    if(dificuldade == 1){
                        if (localStorage.jogosTotaisN1) {
                            localStorage.jogosTotaisN1 = Number(localStorage.jogosTotaisN1) + 1;
                        } else {
                            localStorage.jogosTotaisN1 = 1;
                        }
                    }
                    if (dificuldade == 2){
                        if (localStorage.jogosTotaisN2) {
                            localStorage.jogosTotaisN2 = Number(localStorage.jogosTotaisN2) + 1;
                        } else {
                            localStorage.jogosTotaisN2 = 1;
                        }
                    }
                    if (dificuldade == 3){
                        if (localStorage.jogosTotaisN3) {
                            localStorage.jogosTotaisN3 = Number(localStorage.jogosTotaisN3) + 1;
                        } else {
                            localStorage.jogosTotaisN3 = 1;
                        }
                    }


                    if (pontosJogador1 > pontosJogador2) {
                        if(dificuldade == 1){
                            if (localStorage.jogosVencidosN1) {
                                localStorage.jogosVencidosN1 = Number(localStorage.jogosVencidosN1) + 1;
                            } else {
                                localStorage.jogosVencidosN1 = 1;
                            }
                        }
                        if (dificuldade == 2){
                            if (localStorage.jogosVencidosN2) {
                                localStorage.jogosVencidosN2 = Number(localStorage.jogosVencidosN2) + 1;
                            } else {
                                localStorage.jogosVencidosN2 = 1;
                            }
                        }
                        if (dificuldade == 3){
                            if (localStorage.jogosVencidosN3) {
                                localStorage.jogosVencidosN3 = Number(localStorage.jogosVencidosN3) + 1;
                            } else {
                                localStorage.jogosVencidosN3 = 1;
                            }
                        }
                
                    }

                }


                //fim de jogo
                if (pontosJogador1 > pontosJogador2) {

                    if(modo == "pvcp")
                    {
                        t1.setText("    O jogador venceu \n    ao computador!")
                        speechBuble.visible = true;
                        textBuble.setText("             Parabéns!\n Estás no bom caminho!");
                        textBuble.visible = true;

                    }
                    else {
                        t1.setText("O jogador 1 Venceu!")
                    }

                    console.log("ganhou 1")
                    jogosGanhos1 += 1;
                    t2.setText(pontosJogador1)
                    t3.setText("-")
                    t4.setText(pontosJogador2)
                    
                } else if (pontosJogador1 < pontosJogador2) {
                    if(modo == "pvcp")
                    {
                        t1.setText("O computador Venceu!")
                        speechBuble.visible = true;
                        textBuble.setText("      Tenta novamente.\n         Concentra-te!");
                        textBuble.visible = true;
                    }
                    else {
                        t1.setText("O jogador 2 Venceu!")
                    }
                    console.log("ganhou 2")
                    jogosGanhos2 += 1;
                    
                    t2.setText(pontosJogador1)
                    t3.setText("-")
                    t4.setText(pontosJogador2)
                
                } else {
                    if(modo == "pvcp")
                    {
                        speechBuble.visible = true;
                        textBuble.setText("             Quase...\n       joga novamente!\n         Concentra-te!");
                        textBuble.visible = true;

                    }
                    console.log("empate")
                    t1.setText("Empate!")
                    t2.setText(pontosJogador1)
                    t3.setText("-")
                    t4.setText(pontosJogador2)
                    
                }
            }
    }
}


jogarLinha(i, j, linha) {
    if (jogadorAtual == 1) {
        if (modo == "pvcp" && imagemUltimaJogada != null) {
            if (orientacaoUltimaJogada == 'c') {
                imagemUltimaJogada.setTexture('linha_vertical_vermelha');
            } else {
                imagemUltimaJogada.setTexture('linha_horizontal_vermelha');
            }

        }
        linha.setTexture('linha_horizontal_azul');
    } else {
        orientacaoUltimaJogada = 'l';
        if (modo == "pvcp") {
            linha.setTexture('linha_ultima_jogada_h');
            imagemUltimaJogada = linha;
        } else {
            linha.setTexture('linha_horizontal_vermelha');
        }

    }

    linhasMatrixJogadas[i][j] = jogadorAtual;
    this.jogada('l', i, j);
    if (pontuou == 0) {
        if (jogadorAtual == 1) {
            jogadorAtual = 2;
            atualJogador.visible = false;
            atualJogador2.visible = true;

        } else {
            jogadorAtual = 1;
            atualJogador2.visible = false;
            atualJogador.visible = true;

        }
    } else {
        pontuou = 0;
    }
}



jogarColuna(i, j, linha) {
    if (jogadorAtual == 1) {
        if (modo == "pvcp" && imagemUltimaJogada != null) {
            if (orientacaoUltimaJogada == 'c') {
                imagemUltimaJogada.setTexture('linha_vertical_vermelha');
            } else {
                imagemUltimaJogada.setTexture('linha_horizontal_vermelha');
            }
        }


        linha.setTexture('linha_vertical_azul');
    } else {
        orientacaoUltimaJogada = 'c';
        if (modo == "pvcp") {
            linha.setTexture('linha_ultima_jogada_v');
            imagemUltimaJogada = linha;
        } else {
            linha.setTexture('linha_vertical_vermelha');
        }

    }




    colunasMatrixJogadas[i][j] = jogadorAtual;
    this.jogada('c', i, j);

    if (pontuou == 0) {
        if (jogadorAtual == 1) {
            jogadorAtual = 2;
            atualJogador.visible = false;
            atualJogador2.visible = true;

        } else {
            jogadorAtual = 1;
            atualJogador2.visible = false;
            atualJogador.visible = true;
        }
    } else {
        pontuou = 0;
    }
}





}



//#region mudaInteractive
function mudaInteractiveFalse() {
    for (var i = 0; i < tamanhoTabuleiro + 1; i++) {
        for (var j = 0; j < tamanhoTabuleiro; j++) {

            linhasMatrix[i][j].setInteractive(false);
            linhasMatrix[i][j].input.enabled = false;
            colunasMatrix[j][i].setInteractive(false);
            colunasMatrix[j][i].input.enabled = false;

        }
    }
};

function mudaInteractiveTrue() {
    for (var i = 0; i < tamanhoTabuleiro + 1; i++) {
        for (var j = 0; j < tamanhoTabuleiro; j++) {

            linhasMatrix[i][j].setInteractive();
            linhasMatrix[i][j].input.enabled = true;
            colunasMatrix[j][i].setInteractive();
            colunasMatrix[j][i].input.enabled = true;

        }
    }
};
//#endregion



function testeFimDeJogo() {
    var f = 1;
    var fim= Math.floor((tamanhoTabuleiro*tamanhoTabuleiro)/2);
    if (pontosJogador1>fim || pontosJogador2>fim){
        f=0;
    }
    return !f;
}




function sample(array) {
    return array[Math.floor(Math.random() * array.length)];
}




function aumentaPontos() {
    if (jogadorAtual == 1) {
        pontosJogador1++;
        text1.setText(pontosJogador1.toString());
    } else {
        pontosJogador2++;
        text2.setText(pontosJogador2.toString());
    }
}