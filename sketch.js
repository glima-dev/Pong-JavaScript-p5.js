//variáveis referentes à bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 18;
let raio = diametro / 2;

//referentes à velocidade da bolinha
let velocidadeXBolinha = 8;
let velocidadeYBolinha = 8;


//variáveis referentes às raquetes
let xRaquete = 3;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis referentes à raquete oponente
let xRaqueteOponente = 583;
let yRaqueteOponente = 150;
let velocidadeYOponente;


//variável utilizada para a solução fornecida por terceiro
let colidiu = false;

//Placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//Sons do jogo
let raquetada;
let ponto;
let trilha;

//Erro para o oponente
let chanceDeErrar = 0;

function preload() {
  trilha = loadSound('trilha.wav'); //loadSound é uma função do p5
  ponto = loadSound('ponto.wav');
  raquetada = loadSound('raquetada.wav');
  
  
}


function setup() {
  createCanvas(600, 400);
  trilha.loop(); //Vai tocar a trilha apenas 1x
  //trilha.play(); //Vai tocar a trilha apenas 1x
}

function draw() {
  background(0);  //1 - Desenha o background 
  mostraBolinha(); // 2 - Desenha a bolinha
  movimentaBolinha(); // 3 - Movimenta a Bolinha
  verificaColisaoBorda(); // 4 - Verifica Colisão da bolinha
  
  // 5- Volta para o início da função draw()
  
  mostraRaquete(xRaquete, yRaquete); // 6- Cria a raquete do player
  movimentaMinhaRaquete();  //7- Faz movimento da nossa raquete através das setas UP e DOWN teclado
  //verificaColisaoRaquete(); //8- essa é a nossa solução para detectar colisão
  verificaColisaoRaquete(xRaquete, yRaquete); //9- usando a solução de outra pessoa que postou nas bibliotecas do p5.js
  mostraRaquete(xRaqueteOponente, yRaqueteOponente); //10- Cria raquete do oponente
  movimentaRaqueteOponente(); //11- Esse movimenta a raquete do oponente (mas ainda não entendi a lógica)
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente); //12- esse vai verificara colisão da bolinha com a raquete do oponente
  incluiPlacar(); //13- Vai mostrar o placar dos pontos de cada um
  marcaPonto(); //14- Vai contar os pontos marcados que serão exibidos na função placar
  //bolinhaNaoFicaPresa(); //15- Ajeita quele problema da bolinah presa
 
}

//Criando a bolinha
function mostraBolinha() {
  fill('#FF00FF');
  circle(xBolinha, yBolinha, diametro);  
}

//Movimentando a bolinha
function movimentaBolinha() {
  xBolinha += velocidadeXBolinha; //Essa é uma maneira legal de escrever 'xBolinha = xBolinha + velocidadeXBolinha'
  yBolinha += velocidadeYBolinha;
}

//Função que irá verificar as colisões da bolinha com a borda:
function verificaColisaoBorda() {
  //Fazer as tangentes x da bolinha quicarem nas bordas horizontais e mudar seu sentido
  //width é a largura da borda do nossa canvas. É uma variável pré pronta que o p5 dá pra nois
  if (xBolinha + raio > width || xBolinha - raio < 0) {    
    velocidadeXBolinha *= -1; //uma bela maneira de escrever velocidadeXBolinha = velocidadeXBolinha * -1;  
  }

  //Fazer as tangentes x da bolinha quicarem nas bordas verticais e mudar seu sentido
  //height é a largura da borda do nossa canvas. É uma variável pré pronta que o p5 dá pra nois  
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

//Cria o retangulo que será utilizado para raquete
function mostraRaquete(x, y) {
  fill('#00FF7F');
  rect(x, y, raqueteComprimento, raqueteAltura);
    
}


//Dará movimento à raquete do jogador
function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;    
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

//Fará a verificação se a bolinha coludiu com a raquete
/*function verificaColisaoRaquete() {
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete) {
    velocidadeXBolinha *= -1;
  }    
} */

//função usando a solução de outra pessoa para detectar colisão entre bolinha e raquete
function verificaColisaoRaquete(x, y) {
  
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play(); //som da raquetada
  }
}

//Fará o movimento da raquete do oponente baseando-se no movimentod da bolinha
function movimentaRaqueteOponente() {
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteAltura / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
  calculaChanceDeErrar();
  
//abaixo, vamos modificar para ser multiplayer, mas vou manter esse bloco multi comentado
 /* if (keyIsDown(87)) {
    yRaqueteOponente -= 10;    
  }
  if (keyIsDown(83)) {
    yRaqueteOponente += 10;
  }
    */
}

//Irá incluir os placares certinho na tela
function incluiPlacar()  {
  textAlign(CENTER);
  textSize(16);
  fill('#00FF7F');
  rect(150, 10, 50, 30, 6); //rect player
  rect(410, 10, 50, 30, 6); //rect opponent
  fill('black');
  rect(154, 14, 42, 22, 4); //rect player
  rect(414, 14, 42, 22, 4); //rect opponent
  fill('#00FF7F');
  stroke('#00FF7F');
  text(meusPontos, 175, 31);  //text player            //função do p5 para texto  
  text(pontosOponente, 435, 31);  //text opponent
  noStroke();
}

//Irá fazer a contagem dos pontos
function marcaPonto() {
  if (xBolinha > 590) {
    meusPontos += 1;
    ponto.play(); //som da raquetada
  }
  if(xBolinha < 10) {
    pontosOponente += 1;
    ponto.play(); //som da raquetada
  }  
}
//Calcula chance de errar, ams é uma bosta! Precisa fazer de outra forma
function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 2;
    if (chanceDeErrar >= 49){
    chanceDeErrar = 50;
    }
  } else {
    chanceDeErrar -= 1;
    if (chanceDeErrar <= 45){
    chanceDeErrar = 45;
    }
  }
}

//Ajeitar o bug da bolinha presa
function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}

//uma outra forma de corrigir
/*function bolinhaNaoFicaPresa(){
    if (xBolinha + raio < 0){
    console.log('bolinha ficou presa');
    xBolinha = 300;
    }
}
*/



//Limitar a tela para que as raquetes nao fujam dela (usar depois)
/*

function moveRaquetePC(x){
 velocidadeYRaquetePC = yBola - yRaquetePC - comprimentoRaquete /2 -x;
  yRaquetePC += velocidadeYRaquetePC;
  yRaquetePC = constrain(yRaquetePC,20,485); // limita o movimento para que a raquete não deixe a tela.
}

*/




