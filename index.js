var visor = document.getElementById('Visor');
var valor_operador;
var valor_numero;
var proximo_vai_substituir;

function somar(n1, n2){ return parseFloat(n1) + parseFloat(n2) }
function subtrair(n1, n2){ return parseFloat(n1) - parseFloat(n2) }
function dividir(n1, n2){ return parseFloat(n1) / parseFloat(n2) }
function multiplicar(n1,n2){ return parseFloat(n1) * parseFloat(n2); }
function porcentagem(n1, n2){ return parseFloat(n1) * (parseFloat(n2)/100); }

function alterar_sinal(){

    var alterado = parseFloat(visor.innerText) * (-1);
    visor.innerText = alterado;
}

function mostrar_caractere_no_visor(n){

    
    if (visor.innerText == '0' || proximo_vai_substituir) {
      
        visor.innerText = '';
        proximo_vai_substituir = false;
        desativar_operadores(true);
    }

    visor.innerText += n;
}

function ativar_operador(event){

    var operador = event.currentTarget; // salva o botão que foi clicado em uma variável

    desativar_operadores();
    operador.classList.add('active');

    valor_operador = operador.value; // salvou o operador que tem a propriedade value
    valor_numero = visor.innerText; // salvou o número do visor

    proximo_vai_substituir = true;
}

function desativar_operadores(so_visualmente = false){

    document.querySelectorAll('.operador').forEach(element => 
        element.classList.remove('active')
    );

    if(so_visualmente) return; // se so_visualmente for true, a função termina aqui

    valor_operador = null; // false a função termina aqui
}

function mostrar_resultado(){
    
    var segundo_numero = visor.innerText;
    var resultado;

    if (valor_operador == '+') resultado = somar(valor_numero, segundo_numero)
    else if (valor_operador == '-') resultado = subtrair(valor_numero, segundo_numero)
    else if (valor_operador == '/') resultado = dividir(valor_numero, segundo_numero)
    else if (valor_operador == 'x') resultado = multiplicar(valor_numero, segundo_numero)
    else if (valor_operador == '%') resultado = porcentagem(valor_numero, segundo_numero)
    else alert('Operador inválido');

    desativar_operadores();

    visor.innerText = resultado;
}

function limpar_visor(){

    desativar_operadores();
    visor.innerText = '0';
}

function apagar_ultimo_numero(){

    visor.innerText = visor.innerText.slice(0,-1); 
    //visor.innerText = '0';

    if (visor.innerText.length == 0) {

        visor.innerText = '0'
    }
}

document.querySelectorAll('.operador').forEach(function(operador){

    operador.addEventListener('click', ativar_operador);
})