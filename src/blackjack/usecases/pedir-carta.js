/**
 * Esta funcion recibe un deck y retorna una carta
 * @param {Array<String>} deck Un Arraa de strings
 * @returns{String} Retorna una carta del deck
 */

export const pedirCarta = (deck) => {

    if (!deck || deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();
    return carta;
}