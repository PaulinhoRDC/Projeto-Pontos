var console = {};
console.log = function(){};

class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
        this.menu = new Map();
        this.tamanhoTabuleiro = 5;
        this.modo = "pvp";
        this.dificuldade = "1";
        this.primeiroMenu = 1;
    }


    init(data) {

        console.log('initMenu', data);
        if (this.primeiroMenu == 0) {

            console.log('init', data);
            this.tamanhoTabuleiro = data.t;
            this.modo = data.m;
            this.dificuldade = data.d;
            console.log(data.t);
        } else {
            this.primeiroMenu = 0;
        }
        console.log('initMenu', data);

    }




    preload() {

        this.load.image('background', 'assets/backgroundSQ.png');
        this.load.image('titulo2', 'assets/titulo2.png');
        this.load.image('computer', 'assets/computer.png');
        this.load.image('info', 'assets/infoBT.png');
        this.load.image('creditosBT', 'assets/creditosBT.png');
        this.load.image('stats', 'assets/btstats.png');
        this.load.image('5x5', 'assets/bt_5x5.png');
        this.load.image('6x6', 'assets/bt_6x6n.png');
        this.load.image('8x8', 'assets/bt_8x8n.png');
        this.load.image('plvscp', 'assets/plvscpBT.png');
        this.load.image('plvspl', 'assets/2playersBT.png');
        this.load.image('m1', 'assets/monster_1.png');
        this.load.image('assinala', 'assets/assinalaBT.png');
        this.load.image('boardEnd', 'assets/boardEnd.png');
        this.load.image('boardEnd2', 'assets/boardEnd2.png');
        this.load.image('close', 'assets/close.png');
        this.load.image('play', 'assets/playGame.png');
        this.load.image('creditos', 'assets/creditos2.png');
        this.load.image('level1', 'assets/level1.png');
        this.load.image('level2', 'assets/level2.png');
        this.load.image('level3', 'assets/level3.png');
        this.load.image('fullScreen', 'assets/fullscreen.png');
        this.load.image('noFullScreen', 'assets/fullscreen2.png');
        this.load.image('estatisticas', 'assets/estatisticas.png');
        this.load.image('infoQuadro', 'assets/info.png');


    }




    create() {






        this.add.sprite(0, 0, 'background').setOrigin(0);
        var imagem = this.add.sprite(0.5 * game.config.width, 100, 'titulo2').setScale(0.55);
        this.menu.set(imagem.name, imagem);

        imagem = this.add.sprite(0.25 * game.config.width, 350, '5x5').setScale(0.6);
        imagem.setInteractive();
        imagem.name = '5x5';
        this.menu.set(imagem.name, imagem);

        this.setFullScreenButton();

        imagem = this.add.sprite(0.5 * game.config.width, 350, '6x6').setScale(0.6);
        imagem.setInteractive();
        imagem.name = '6x6';
        this.menu.set(imagem.name, imagem);

        imagem = this.add.sprite(0.75 * game.config.width, 350, '8x8').setScale(0.6);
        imagem.setInteractive();
        imagem.name = '8x8';
        this.menu.set(imagem.name, imagem);

        imagem = this.add.sprite(0.375 * game.config.width, 550, 'plvspl').setScale(0.6);
        imagem.setInteractive();
        imagem.name = 'plvspl';
        this.menu.set(imagem.name, imagem);

        imagem = this.add.sprite(0.625 * game.config.width, 550, 'plvscp').setScale(0.6);
        imagem.setInteractive();
        imagem.name = 'plvscp';
        this.menu.set(imagem.name, imagem);



        imagem = this.add.sprite(0.720 * game.config.width, 480, 'level1').setScale(0.4);
        imagem.setInteractive();
        imagem.name = 'level1';
        this.menu.set(imagem.name, imagem);
        this.menu.get("level1").setVisible = false;


        imagem = this.add.sprite(0.740 * game.config.width, 550, 'level2').setScale(0.4);
        imagem.setInteractive();
        imagem.name = 'level2';
        this.menu.set(imagem.name, imagem);
        this.menu.get("level2").setVisible = false;


        imagem = this.add.sprite(0.720 * game.config.width, 620, 'level3').setScale(0.4);
        imagem.setInteractive();
        imagem.name = 'level3';
        this.menu.set(imagem.name, imagem);
        this.menu.get("level3").setVisible = false;


        imagem = this.add.sprite(0.745 * game.config.width, 460, 'assinala').setScale(0.4);
        imagem.visible = false;
        imagem.name = 'assinala_level1';
        this.menu.set(imagem.name, imagem);

        imagem = this.add.sprite(0.765 * game.config.width, 530, 'assinala').setScale(0.4);
        imagem.visible = false;
        imagem.name = 'assinala_level2';
        this.menu.set(imagem.name, imagem);

        imagem = this.add.sprite(0.745 * game.config.width, 600, 'assinala').setScale(0.4);
        imagem.visible = false;
        imagem.name = 'assinala_level3';
        this.menu.set(imagem.name, imagem);



        imagem = this.add.sprite(0.435 * game.config.width, 560, 'assinala').setScale(0.55);
        imagem.visible = false;
        imagem.name = 'assinala_2pl';
        this.menu.set(imagem.name, imagem);

        imagem = this.add.sprite(0.6955 * game.config.width, 560, 'assinala').setScale(0.55);
        imagem.visible = false;
        imagem.name = 'assinala_plvscp';
        this.menu.set(imagem.name, imagem);




        imagem = this.add.sprite(0.5 * game.config.width, 650, 'play').setScale(0.6);
        imagem.setInteractive();
        imagem.name = 'play';
        this.menu.set(imagem.name, imagem);

        imagem = this.add.sprite(0.96 * game.config.width, 500, 'stats').setScale(0.45);
        imagem.setInteractive();
        imagem.name = 'stats';
        this.menu.set(imagem.name, imagem);
        



        imagem = this.add.sprite(0.96 * game.config.width, 590, 'info').setScale(0.45);
        imagem.setInteractive();
        imagem.name = 'info';
        this.menu.set(imagem.name, imagem);

        imagem = this.add.sprite(0.96 * game.config.width, 680, 'creditosBT').setScale(0.45);
        imagem.setInteractive();
        imagem.name = 'creditos';
        this.menu.set(imagem.name, imagem);

        imagem = this.add.sprite(0.09 * game.config.width, 670, 'm1').setScale(0.55);
        imagem.name = 'm1';
        this.menu.set(imagem.name, imagem);




        imagem = this.add.sprite(0.31 * game.config.width, 360, 'assinala').setScale(0.55);
        if (this.tamanhoTabuleiro == 5) {
            imagem.visible = true;
        } else {
            imagem.visible = false;
        }
        imagem.name = 'assinala_5x5';
        this.menu.set(imagem.name, imagem);


        imagem = this.add.sprite(0.56 * game.config.width, 360, 'assinala').setScale(0.55);
        if (this.tamanhoTabuleiro == 6) {
            imagem.visible = true;
        } else {
            imagem.visible = false;
        }
        imagem.name = 'assinala_6x6';
        this.menu.set(imagem.name, imagem);

        imagem = this.add.sprite(0.81 * game.config.width, 360, 'assinala').setScale(0.55);
        if (this.tamanhoTabuleiro == 8) {
            imagem.visible = true;
        } else {
            imagem.visible = false;
        }
        imagem.name = 'assinala_8x8';
        this.menu.set(imagem.name, imagem);

        imagem = this.add.sprite(0.435 * game.config.width, 560, 'assinala').setScale(0.55);
        if (this.modo == 'pvp') {
            imagem.visible = true;
        } else {
            imagem.visible = false;
        }
        imagem.name = 'assinala_2pl';
        this.menu.set(imagem.name, imagem);

        imagem = this.add.sprite(0.6955 * game.config.width, 560, 'assinala').setScale(0.55);
        if (this.modo == 'pvcp') {
            imagem.visible = true;
        } else {
            imagem.visible = false;
        }
        imagem.name = 'assinala_plvscp';
        this.menu.set(imagem.name, imagem);




        imagem = this.add.sprite(0.5 * game.config.width, 0.6 * game.config.height, 'infoQuadro').setScale(0.90);
        imagem.name = 'texto_info';
        imagem.visible = false;
        this.menu.set(imagem.name, imagem);

        imagem = this.add.sprite(0.5 * game.config.width, 0.6 * game.config.height, 'estatisticas').setScale(0.90);
        imagem.name = 'texto_trofeus';
        imagem.visible = false;
        this.menu.set(imagem.name, imagem);





        imagem = this.add.sprite(0.5 * game.config.width, 0.6 * game.config.height, 'creditos').setScale(0.90);
        imagem.name = 'texto_creditos';
        imagem.visible = false;
        this.menu.set(imagem.name, imagem);

        imagem = this.add.sprite(0.66 * game.config.width, 0.36 * game.config.height, 'close').setScale(0.5);
        imagem.name = 'fechar';
        imagem.visible = false;
        this.menu.set(imagem.name, imagem);

        this.menu.get('level1').visible = false;
        this.menu.get('level2').visible = false;
        this.menu.get('level3').visible = false;

        const style = {
            font: "bold 32px Arial",
            fill: "#000000"
        };

        

        var jogosTotais = 0;
        if (localStorage.jogosTotais) {
            jogosTotais = Number(localStorage.jogosTotais);
        }
        

        var jogosVencidosN1 = 0;
        var jogosVencidosN2 = 0;
        var jogosVencidosN3 = 0;

        if (localStorage.jogosVencidosN1) {
            jogosVencidosN1 = Math.trunc((Number(localStorage.jogosVencidosN1)/Number(localStorage.jogosTotaisN1))*100);
        }

        if (localStorage.jogosVencidosN2) {
            jogosVencidosN2 = Math.trunc((Number(localStorage.jogosVencidosN2)/Number(localStorage.jogosTotaisN2))*100);
        }

        if (localStorage.jogosVencidosN3) {
            jogosVencidosN3 = Math.trunc((Number(localStorage.jogosVencidosN3)/Number(localStorage.jogosTotaisN3))*100);
        }

        var t1 = this.add.text(0.475 * game.config.width, 0.54 * game.config.height, jogosTotais.toString(), style);
        var t2 = this.add.text(0.575 * game.config.width, 0.64 * game.config.height, jogosVencidosN1.toString()+"%", style);
        var t3 = this.add.text(0.575 * game.config.width, 0.705 * game.config.height,jogosVencidosN2.toString()+"%", style);
        var t4 = this.add.text(0.575 * game.config.width, 0.77 * game.config.height, jogosVencidosN3.toString()+"%", style);



        this.menu.set('t1', t1);
        this.menu.set('t2', t2);
        this.menu.set('t3', t3);
        this.menu.set('t4', t4);

        this.menu.get('t1').visible = false;
        this.menu.get('t2').visible = false;
        this.menu.get('t3').visible = false;
        this.menu.get('t4').visible = false;



        this.input.on('gameobjectdown', function(pointer, gameObject) {

            switch (gameObject.name) {

                case '5x5':
                    this.menu.get('assinala_5x5').visible = true;
                    this.menu.get('assinala_6x6').visible = false;
                    this.menu.get('assinala_8x8').visible = false;
                    this.tamanhoTabuleiro = 5;
                    break;

                case '6x6':
                    this.menu.get('assinala_5x5').visible = false;
                    this.menu.get('assinala_6x6').visible = true;
                    this.menu.get('assinala_8x8').visible = false;
                    this.tamanhoTabuleiro = 6;
                    break;

                case '8x8':
                    this.menu.get('assinala_5x5').visible = false;
                    this.menu.get('assinala_6x6').visible = false;
                    this.menu.get('assinala_8x8').visible = true;
                    this.tamanhoTabuleiro = 8;
                    break;

                case 'plvspl':
                    this.menu.get('assinala_2pl').visible = true;
                    this.menu.get('assinala_plvscp').visible = false;

                    this.menu.get('level1').visible = false;
                    this.menu.get('level2').visible = false;
                    this.menu.get('level3').visible = false;
                    this.menu.get('assinala_level1').visible = false;
                    this.menu.get('assinala_level2').visible = false;
                    this.menu.get('assinala_level3').visible = false;
                    this.modo = "pvp";
                    
                    
                    break;

                case 'plvscp':
                    this.menu.get('assinala_2pl').visible = false;
                    this.menu.get('assinala_plvscp').visible = true;

                    this.menu.get('level1').visible = true;
                    this.menu.get('level2').visible = true;
                    this.menu.get('level3').visible = true;

                    this.menu.get('assinala_level1').visible = true;
                    this.menu.get('assinala_level2').visible = false;
                    this.menu.get('assinala_level3').visible = false;
                    this.modo = "pvcp";
                    this.dificuldade = 1;
                    break;


                case 'level1':
                    this.menu.get('assinala_level1').visible = true;
                    this.menu.get('assinala_level2').visible = false;
                    this.menu.get('assinala_level3').visible = false;
                    this.dificuldade = 1;
                    break;


                case 'level2':
                    this.menu.get('assinala_level1').visible = false;
                    this.menu.get('assinala_level2').visible = true;
                    this.menu.get('assinala_level3').visible = false;
                    this.dificuldade = 2;
                    break;


                case 'level3':
                    this.menu.get('assinala_level1').visible = false;
                    this.menu.get('assinala_level2').visible = false;
                    this.menu.get('assinala_level3').visible = true;
                    this.dificuldade = 3;
                    break;



                case 'info':
                    this.menu.get('texto_info').visible = true;
                    this.menu.get('texto_trofeus').visible = false;
                    this.menu.get('texto_creditos').visible = false;
                    this.menu.get('fechar').visible = true;
                    this.menu.get('fechar').setInteractive();
                    this.menu.get('t1').visible = false;
                    this.menu.get('t2').visible = false;
                    this.menu.get('t3').visible = false;
                    this.menu.get('t4').visible = false;
                    break;

                case 'stats':
                    this.menu.get('texto_info').visible = false;
                    this.menu.get('texto_trofeus').visible = true;
                    this.menu.get('texto_creditos').visible = false;
                    this.menu.get('fechar').visible = true;
                    this.menu.get('fechar').setInteractive();
                    this.menu.get('t1').visible = true;
                    this.menu.get('t2').visible = true;
                    this.menu.get('t3').visible = true;
                    this.menu.get('t4').visible = true;
                    break;

                case 'creditos':
                    this.menu.get('texto_info').visible = false;
                    this.menu.get('texto_trofeus').visible = false;
                    this.menu.get('texto_creditos').visible = true;
                    this.menu.get('fechar').visible = true;
                    this.menu.get('fechar').setInteractive();
                    this.menu.get('t1').visible = false;
                    this.menu.get('t2').visible = false;
                    this.menu.get('t3').visible = false;
                    this.menu.get('t4').visible = false;
                    break;

                case 'fechar':
                    this.menu.get('texto_info').visible = false;
                    this.menu.get('texto_trofeus').visible = false;
                    this.menu.get('texto_creditos').visible = false;
                    this.menu.get('fechar').visible = false;
                    this.menu.get('fechar').setInteractive(false);
                    this.menu.get('t1').visible = false;
                    this.menu.get('t2').visible = false;
                    this.menu.get('t3').visible = false;
                    this.menu.get('t4').visible = false;
                    break;


                case 'play':
                    this.scene.transition({
                        target: 'Jogo',
                        duration: 1000,
                        moveBelow: true,
                        onUpdate: this.transitionOut,
                        data: {
                            t: this.tamanhoTabuleiro,
                            m: this.modo,
                            d: this.dificuldade,
                            j1: 0,
                            j2: 0
                        }
                    });
                    this.scene.stop('Menu');
                    this.menu.get('t1').visible = false;
                    this.menu.get('t2').visible = false;
                    this.menu.get('t3').visible = false;
                    this.menu.get('t4').visible = false;
                    //this.scene.start('Main' , {t : this.tamanhoTabuleiro});
                    break;


                default:
                    break;

            }

        }, this);

        //-------------------------------------------------------------------------------------------------

        this.menu.get('play').on('pointerover', () => {
            this.menu.get('play').displayHeight += 8;
            this.menu.get('play').displayWidth += 8;
        });

        this.menu.get('play').on('pointerout', () => {
            this.menu.get('play').displayHeight -= 8;
            this.menu.get('play').displayWidth -= 8;
        });

        this.menu.get('creditos').on('pointerover', () => {
            this.menu.get('creditos').displayHeight += 10;
            this.menu.get('creditos').displayWidth += 10;
        });

        this.menu.get('creditos').on('pointerout', () => {
            this.menu.get('creditos').displayHeight -= 10;
            this.menu.get('creditos').displayWidth -= 10;
        });

        this.menu.get('info').on('pointerover', () => {
            this.menu.get('info').displayHeight += 10;
            this.menu.get('info').displayWidth += 10;
        });

        this.menu.get('info').on('pointerout', () => {
            this.menu.get('info').displayHeight -= 10;
            this.menu.get('info').displayWidth -= 10;
        });

        this.menu.get('stats').on('pointerover', () => {
            this.menu.get('stats').displayHeight += 10;
            this.menu.get('stats').displayWidth += 10;
        });

        this.menu.get('stats').on('pointerout', () => {
            this.menu.get('stats').displayHeight -= 10;
            this.menu.get('stats').displayWidth -= 10;
        });

        this.menu.get('fechar').on('pointerover', () => {
            this.menu.get('fechar').displayHeight += 10;
            this.menu.get('fechar').displayWidth += 10;
        });

        this.menu.get('fechar').on('pointerout', () => {
            this.menu.get('fechar').displayHeight -= 10;
            this.menu.get('fechar').displayWidth -= 10;
        });

        this.menu.get('5x5').on('pointerover', () => {
            this.menu.get('5x5').displayHeight += 10;
            this.menu.get('5x5').displayWidth += 10;
            this.menu.get('assinala_5x5').displayHeight += 10;
            this.menu.get('assinala_5x5').displayWidth += 10;
        });

        this.menu.get('5x5').on('pointerout', () => {
            this.menu.get('5x5').displayHeight -= 10;
            this.menu.get('5x5').displayWidth -= 10;
            this.menu.get('assinala_5x5').displayHeight -= 10;
            this.menu.get('assinala_5x5').displayWidth -= 10;
        });

        this.menu.get('6x6').on('pointerover', () => {
            this.menu.get('6x6').displayHeight += 10;
            this.menu.get('6x6').displayWidth += 10;
            this.menu.get('assinala_6x6').displayHeight += 10;
            this.menu.get('assinala_6x6').displayWidth += 10;
        });

        this.menu.get('6x6').on('pointerout', () => {
            this.menu.get('6x6').displayHeight -= 10;
            this.menu.get('6x6').displayWidth -= 10;
            this.menu.get('assinala_6x6').displayHeight -= 10;
            this.menu.get('assinala_6x6').displayWidth -= 10;
        });

        this.menu.get('8x8').on('pointerover', () => {
            this.menu.get('8x8').displayHeight += 10;
            this.menu.get('8x8').displayWidth += 10;
            this.menu.get('assinala_8x8').displayHeight += 10;
            this.menu.get('assinala_8x8').displayWidth += 10;
        });

        this.menu.get('8x8').on('pointerout', () => {
            this.menu.get('8x8').displayHeight -= 10;
            this.menu.get('8x8').displayWidth -= 10;
            this.menu.get('assinala_8x8').displayHeight -= 10;
            this.menu.get('assinala_8x8').displayWidth -= 10;
        });

        this.menu.get('plvspl').on('pointerover', () => {
            this.menu.get('plvspl').displayHeight += 10;
            this.menu.get('plvspl').displayWidth += 10;
            this.menu.get('assinala_2pl').displayHeight += 10;
            this.menu.get('assinala_2pl').displayWidth += 10;
        });

        this.menu.get('plvspl').on('pointerout', () => {
            this.menu.get('plvspl').displayHeight -= 10;
            this.menu.get('plvspl').displayWidth -= 10;
            this.menu.get('assinala_2pl').displayHeight -= 10;
            this.menu.get('assinala_2pl').displayWidth -= 10;
        });

        this.menu.get('plvscp').on('pointerover', () => {
            this.menu.get('plvscp').displayHeight += 10;
            this.menu.get('plvscp').displayWidth += 10;
            this.menu.get('assinala_plvscp').displayHeight += 10;
            this.menu.get('assinala_plvscp').displayWidth += 10;
        });

        this.menu.get('plvscp').on('pointerout', () => {
            this.menu.get('plvscp').displayHeight -= 10;
            this.menu.get('plvscp').displayWidth -= 10;
            this.menu.get('assinala_plvscp').displayHeight -= 10;
            this.menu.get('assinala_plvscp').displayWidth -= 10;
        });

        this.menu.get('level1').on('pointerover', () => {
            this.menu.get('level1').displayHeight += 10;
            this.menu.get('level1').displayWidth += 10;
            this.menu.get('assinala_level1').displayHeight += 10;
            this.menu.get('assinala_level1').displayWidth += 10;
        });

        this.menu.get('level1').on('pointerout', () => {
            this.menu.get('level1').displayHeight -= 10;
            this.menu.get('level1').displayWidth -= 10;
            this.menu.get('assinala_level1').displayHeight -= 10;
            this.menu.get('assinala_level1').displayWidth -= 10;
        });

        this.menu.get('level2').on('pointerover', () => {
            this.menu.get('level2').displayHeight += 10;
            this.menu.get('level2').displayWidth += 10;
            this.menu.get('assinala_level2').displayHeight += 10;
            this.menu.get('assinala_level2').displayWidth += 10;
        });

        this.menu.get('level2').on('pointerout', () => {
            this.menu.get('level2').displayHeight -= 10;
            this.menu.get('level2').displayWidth -= 10;
            this.menu.get('assinala_level2').displayHeight -= 10;
            this.menu.get('assinala_level2').displayWidth -= 10;
        });

        this.menu.get('level3').on('pointerover', () => {
            this.menu.get('level3').displayHeight += 10;
            this.menu.get('level3').displayWidth += 10;
            this.menu.get('assinala_level3').displayHeight += 10;
            this.menu.get('assinala_level3').displayWidth += 10;
        });

        this.menu.get('level3').on('pointerout', () => {
            this.menu.get('level3').displayHeight -= 10;
            this.menu.get('level3').displayWidth -= 10;
            this.menu.get('assinala_level3').displayHeight -= 10;
            this.menu.get('assinala_level3').displayWidth -= 10;
        });


        //---------------------------------------------------------------------------------------------------------------
        this.events.on('transitionstart', function(fromScene, duration) {

            //console.log(duration)
            if (fromScene === this.scene.get('Menu')) {


            }


            if (fromScene === this.scene.get('Jogo')) {

                var targetsX = []
                this.menu.forEach((item, index) => {
                    item.x -= game.config.width;
                    targetsX.push(item)
                });


                this.tweens.add({
                    delay: 1000,
                    targets: targetsX,
                    durantion: 1000,
                    x: '+=' + game.config.width,
                    ease: 'Power2'
                });
            }
        }, this);
    }


    /**
     * Animation to start a new game
     * @param {number} progress Animation progress
     */
    transitionOut(progress) {

        progress = progress / 9;

        this.menu.forEach((values, keys) => {
            values.x = values.x - progress * (game.config.width / 4);
        })




    }


    /**
     * Button to witch between full screen mode and normal mode
     */
    setFullScreenButton() {
        if (!this.scale.isFullscreen) {
            this.fullScreen = this.add.image(0.90 * game.config.width, 100, 'fullScreen');
        } else {
            this.fullScreen = this.add.image(0.90 * game.config.width, 100, 'noFullScreen');
        }

        this.menu.set('fullScreen', this.fullScreen);
        this.fullScreen.setScale(0.5);

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



    update() {

    }
}