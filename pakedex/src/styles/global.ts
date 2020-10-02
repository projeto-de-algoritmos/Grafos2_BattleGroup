import { createGlobalStyle } from 'styled-components';

import PokemonSolid from '../assets/fonts/PokemonSolid.ttf';
import pokeball from '../assets/images/pokeball1.svg';


export default createGlobalStyle`
    @font-face {
        font-family: 'PokemonSolid';
        src: local('PokemonSolid'),
        url(${PokemonSolid}) format('truetype');
        font-weight: 300;
        font-style: normal;
        
    }

    *{
        margin:0;
        padding:0;
        outline:0;
        box-sizing: border-box;
    }

    body{
        background: url(${pokeball}) no-repeat center top; 
        background-color: #ededed;
    }

    p{
        font-family: 'Press Start 2P'
    }

    span{
        font-family: 'Press Start 2P'
    }

`;