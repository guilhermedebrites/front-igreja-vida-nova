import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { MainTextStyled, SecondTextStyled } from './styles/TextStyled';

const CardEvent = (props) => {
    const separarData = (date) => {
        const [data] = date.split("T");
        return data;
    };

    const separarHorario = (date) => {
        const [, horarioCompleto] = date.split("T");
        return horarioCompleto.slice(0, 5);
    };

    return (
        <div
            style={{
                backgroundColor: '#FFFFFF',
                width: '342px',
                height: '370px',
                padding: '16px',
                borderRadius: '12px',
            }}
        >
            <img src="../src/assets/images/backgroundImage.png" alt="Event" style={{ width: '311px', height: '186px', marginBottom: '14px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <MainTextStyled color='#030B16' fontSize='16px'>{props.evento.tema}</MainTextStyled>
                {props.isPastor && (
                    <div>
                        <FontAwesomeIcon
                            icon={faPenToSquare}
                            style={{
                                color: 'black',
                                fontSize: '25px',
                                marginRight: '5px'
                            }}
                            onClick={props.handleOpenModalEdit}
                        />
                        <FontAwesomeIcon
                            icon={faTrash}
                            style={{
                                color: 'red',
                                fontSize: '25px'
                            }}
                            onClick={props.handleDelete}
                        />
                    </div>
                )}
            </div>
            <div style={{ marginTop: '25px' }}>
                <SecondTextStyled fontSize='14px'>Data: {separarData(props.evento.data)}</SecondTextStyled>
                <SecondTextStyled fontSize='14px'>Horário: {separarHorario(props.evento.data)}</SecondTextStyled>
                {props.evento.endereco && (
                    <SecondTextStyled fontSize='14px'>Local: {props.evento.endereco}</SecondTextStyled>
                )}
            </div>
        </div>
    );
};

export default CardEvent;
