import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import ModalDoar from './ModalDoar';
import { PrimaryButtonStyled } from './styles/ButtonStyled';
import { MainTextStyled, SecondTextStyled } from './styles/TextStyled';

const CardDoacao = (props) => {

    const [openModalDoar, setOpenModalDoar] = React.useState(false);

    const handleCloseModalDoar = () => {
        setOpenModalDoar(false);
        props.getDoacoes();
    }

    return (
        <div
            style={{
                backgroundColor: '#FFFFFF',
                width: '342px',
                height: '470px',
                padding: '16px',
                borderRadius: '12px',
            }}
        >
            <img src="../src/assets/images/backgroundImage.png" alt="Event" style={{ width: '311px', height: '186px', marginBottom: '14px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <MainTextStyled color='#030B16' fontSize='16px'>{props.doacao.titulo}</MainTextStyled>
            </div>
            <div style={{ marginTop: '25px' }}>
                <SecondTextStyled fontSize='14px'>Descrição: {props.doacao.descricao}</SecondTextStyled>
                <SecondTextStyled fontSize='14px'>Meta de Arrecadação: R${props.doacao.meta}</SecondTextStyled>
            </div>
            <div style={{ marginTop: '20px' }}>
                <div style={{
                    backgroundColor: '#E0E0E0',
                    width: '100%',
                    height: '10px',
                    borderRadius: '5px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        width: `${Math.min((props.doacao.valorArrecadado / props.doacao.meta) * 100, 100)}%`,
                        height: '100%',
                        backgroundColor: '#4CAF50'
                    }}></div>
                </div>
                <SecondTextStyled fontSize='12px' style={{ marginTop: '5px', color: '#333' }}>
                    R$ {props.doacao.valorArrecadado} arrecadado de R$ {props.doacao.meta}
                </SecondTextStyled>
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <PrimaryButtonStyled
                    backgroundColor='#F4C400'
                    backgroundColorHover='#CDA502'
                    color='black'
                    width='60%'
                    height='40px'
                    fontSize='24px'
                    marginTop='10px'
                    onClick={() => setOpenModalDoar(true)}
                >
                    Doar!
                </PrimaryButtonStyled>

                <ModalDoar  
                    open={openModalDoar}
                    handleClose={handleCloseModalDoar}
                    doacaoId={props.doacao.id}
                />

            </div>

            {props.isPastor && (
                    <div
                        style={{
                            marginTop: '10px',
                        }}
                    >
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
    );
};

export default CardDoacao;
