# Blackjack Vite

Pasos para ejecutar el proyecto:

1. Clonar el repositorio
2. Ejecutar el comando `npm install` para instalar las dependencias
3. Ejecutar el comando `npm run dev` para ejecutar el proyecto en modo desarrollo
4. Abrir el navegador en la dirección `http://localhost:3000/`

## Descripción

El proyecto consiste en un juego de cartas de Blackjack, en el que el jugador juega contra la banca. El objetivo del juego es conseguir una puntuación lo más cercana posible a 21, sin pasarse. Si el jugador se pasa de 21, pierde la partida. Si el jugador se planta, la banca roba cartas hasta que su puntuación sea igual o superior a 17. Si la banca se pasa de 21, el jugador gana la partida. Si la banca se planta, gana el que tenga la puntuación más alta. Si la puntuación es la misma, se considera empate.

## Producción

1. Ejecutar el comando `npm run build` para generar los archivos de producción
2. Tomar los archivos de la carpeta `dist` y subirlos a un servidor web