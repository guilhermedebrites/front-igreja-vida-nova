import axios from 'axios';
import * as React from 'react';
import InputText from '../components/InputText';
import { PrimaryButtonStyled } from '../components/styles/ButtonStyled';
import { MainTextStyled } from '../components/styles/TextStyled';

const PedirOracao = () => {

    const [evento, setEvento] = React.useState();
    const [descricao, setDescricao] = React.useState();

    const getNextEvent = () => {
        axios.get(`http://18.223.170.200:8080/evento/proximoCulto`)
            .then((res) => {
                setEvento(res.data);
            })
            .catch((error) => {
                console.error('Erro ao buscar proximo evento:', error);
            });
    }

    const sendPedido = () => {
        axios.post(`http://18.223.170.200:8080/pedidoOracao/cadastrar`, {
            id: evento.id,
            descricao: descricao
        })
        .then((res) => {
            alert("Pedido de oração enviado!");
            setDescricao('');
        })
        .catch((error) => {
            console.error('Erro ao executar pedido de oração:', error);
        });
    }

    React.useEffect(() => {
        getNextEvent();
    }, []);

    return (
        <>
        <MainTextStyled style={{ textAlign: 'center', fontSize: '36px', marginTop: '20px' }}>
            Solicitar Pedido De Oração
        </MainTextStyled>
        <div
            style={{
                backgroundColor: '#F6F6F6',
                margin: '69px auto',
                width: '80%',
                borderRadius: '20px',
                padding: '38px'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <InputText
                    label={evento && evento.tema}
                    value={evento?.data || ''}
                    read-only
                    type="datetime-local"
                    width="100%"
                />
                <label htmlFor="descricao" style={{ fontSize: '20px', color: '#0F6D47', marginTop: '20px', fontWeight: 'bold' }}>
                    Descrição do Pedido
                </label>
                <textarea
                    style={{
                        marginTop: '5px',
                        backgroundColor: '#E8EDF5',
                        color: '#0F6D47',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '10px 14px',
                        fontSize: '24px',
                        outline: 'none'
                    }}
                    placeholder="Descrição do Pedido" 
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />
                <PrimaryButtonStyled
                    width='120px'
                    backgroundColor='#F4C400'
                    backgroundColorHover='#CDA502'
                    color='black'
                    onClick={() => sendPedido()}
                    style={{
                        marginTop: '20px'
                    }}
                >
                    Enviar
                </PrimaryButtonStyled>
            </div>
        </div>
        </>
    );
}


export default PedirOracao;