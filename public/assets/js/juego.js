

// *********** Patrón módulo ***********
// El patrón módulo es una forma de encapsular código para que no se mezcle con el código global
const miModulo = (() => {
    'use strict'
    // *********** Patrón módulo ***********

    let deck = [];
    const   tipos = ['C', 'D', 'H', 'S'],
            especiales = ['A', 'J', 'Q', 'K'];

    // let puntosJugador = 0,
    //     puntosComputadora = 0;
    let puntosJugadores = [];

    // ******************Referencias del HTML******************

    // Botones
    const   btnPedir = document.querySelector('#btnPedir'),
            btnDetener = document.querySelector('#btnDetener'),
            btnNuevo = document.querySelector('#btnNuevo');

    // Divs
    const   divCartasJugadores = document.querySelectorAll('.divCartas'),
            // Puntos
            puntosHTML = document.querySelectorAll('small');

    // Esta función inicializa el juego
    const inicializarJuego = ( numJugadores=2 ) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
        puntosHTML.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    };

    // Esta función crea una nueva baraja
    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }
        
        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }
        }
        return _.shuffle(deck);
    };


    // Esta función me permite tomar una carta
    const pedirCarta = () => {
        // condición para que en caso de que no haya cartas, se cree una nueva baraja
        // la palabra reservada throw sirve para lanzar un error
        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    }

    // Esta función me permite saber el valor de la carta

    const valorCarta = (carta) => {
        // substring es una función que permite extraer una parte de un string como un nuevo string
        const valor = carta.substring(0, carta.length - 1);

        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;

    }

    // Turno: 0 = primer jugador y el último será la computadora

    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        // Crear imagen de la carta
        const imgCarta = document.createElement('img');
        // Hacer referencia a la imagen
        imgCarta.src = `assets/cartas/${carta}.png`;
        // Agregar la clase carta a la imagen
        imgCarta.classList.add('carta');
        // Agregar la clase carta a la imagen
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () => {
        const [puntosMinimos, puntosComputadora] = puntosJugadores;
        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie gana :(');
            } else if (puntosMinimos > 21) {
                alert('Computadora gana');
            } else if (puntosComputadora > 21) {
                alert('Jugador gana');
            } else {
                alert('Computadora gana');
            }
        }, 100);
    }

    // turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => {

        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1 );
            crearCarta(carta, puntosJugadores.length - 1 );

        } while(  (puntosComputadora < puntosMinimos)  && (puntosMinimos <= 21 ) );

        determinarGanador();
    }

    // ************** Eventos de los botones **************
    // Una función que se ejecuta cuando se hace click en el botón pedir y se llama función callback

    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

        // condición para que en caso de que los puntos del jugador sean mayores a 21, se deshabilite el botón pedir
        if (puntosJugador > 21) {
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);

        } else if (puntosJugador === 21) {
            console.warn('21, genial');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }

    });

    // Una función que se ejecuta cuando se hace click en el botón detener y se llama función callback

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });

    // Una función que se ejecuta cuando se hace click en el botón nuevo y se llama función callback
    btnNuevo.addEventListener('click', () => {

        inicializarJuego();

    });
    return {
        nuevoJuego: inicializarJuego
    };

})(); 

