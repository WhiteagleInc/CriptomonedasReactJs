import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Error from './Error';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: border-left;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor: pointer;
    }
`;

const Formulario = ({setMoneda, setCriptomoneda}) => {
    //State del listado de criptomonedas
    const [listCripto, setListCripto] = useState([]);
    const [error, setError] = useState(false);

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        { codigo: 'MXN', nombre: 'Peso Mexicano' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' }
    ];

    //Utilizar useMoneda
    const [moneda, SelectMonedas] = useMoneda('Elige tu Moneda', '', MONEDAS);

    //Utilizar useCriptomoneda
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listCripto);

    //Ejecutar llamado a la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            setListCripto(resultado.data.Data);
        }
        consultarAPI();
    }, [])

    //Cuando el usuario hace Submit
    const cotizarMoneda = e => {
        e.preventDefault();

        //validar si ambos campos estan llenos
        if (moneda.trim() === '' || criptomoneda.trim() === '') {
            setError(true);
            return;
        }

        //pasar los datos al componente principal
        setError(false);

        setMoneda(moneda);
        setCriptomoneda(criptomoneda);
    }

    return ( 
        <form onSubmit={cotizarMoneda}>
            { error ? <Error mensaje='Todos los campos son obligatorios'></Error> : null }
            <SelectMonedas />
            <SelectCripto />
            <Boton 
                type='submit' 
                value='Calcular'
            />
        </form>
     );
}
 
export default Formulario;