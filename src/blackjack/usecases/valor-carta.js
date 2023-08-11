/**
 * Esta funcion recibe una carta y retorna su valor
 * @param {String} carta 
 * @returns {Number} - Retorna el valor de la carta
 */

export const valorCarta = ( carta ) => {
    if ( !carta ) {
        throw new Error('No hay carta');
    }

    const valor = carta.substring(0, carta.length - 1);
    return ( isNaN( valor ) ) ? 
            ( valor === 'A' ) ? 11 : 10
            : valor * 1;
}