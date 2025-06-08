import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import InputText from './InputText';
import { PrimaryButtonStyled } from './styles/ButtonStyled';
import { MainTextStyled } from './styles/TextStyled';
import api from '../axiosConfig';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#F6F6F6',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '20px',
};

const ModalEditEvent = (props) => {
    const [evento, setEvento] = React.useState(props.evento);
    const navigate = useNavigate();

    React.useEffect(() => {
        setEvento(props.evento);
    }, [props.evento]);

    const handleSave = () => {
        api.put(`/evento/atualizar/${props.evento.id}`, {
            tema: evento.tema,
            data: evento.data,
            endereco: evento.endereco
        })
        .then(() => {
            props.handleClose();
        })
        .catch(error => {
            console.error('Erro ao salvar evento:', error);
        });
    };

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
        >
            <Box sx={style}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MainTextStyled color='#030B16' fontSize='34px' fontWeight='bold' style={{ textAlign: 'center', marginRight: '50px' }}>
                        Editar Evento
                    </MainTextStyled>
                    {evento.tipo === 'CULTO' && (
                        <PrimaryButtonStyled
                            width='160px'
                            height='50px'
                            backgroundColor='#F4C400'
                            backgroundColorHover='#CDA502'
                            color='black'
                            fontSize='14px'
                            onClick={() => navigate(`/gerenciar-obreiros/${evento.id}`)}
                        >
                            Gerenciar Obreiros
                        </PrimaryButtonStyled>
                    )}
                </div>
                <div style={{ backgroundColor: '#FFFFFF', margin: '19px 62px', borderRadius: '20px', padding: '38px' }}>
                    <InputText
                        label='Tema'
                        value={evento.tema}
                        onChange={(e) => setEvento({ ...evento, tema: e.target.value })}
                        width='400px'
                    />
                    <InputText
                        label='Data'
                        type='datetime-local'
                        value={evento.data}
                        onChange={(e) => setEvento({ ...evento, data: e.target.value })}
                        width='400px'
                    />
                    <InputText
                        label='Endereço'
                        value={evento.endereco}
                        onChange={(e) => setEvento({ ...evento, endereco: e.target.value })}
                        width='400px'
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <PrimaryButtonStyled
                        width='180px'
                        backgroundColor='#F4C400'
                        backgroundColorHover='#CDA502'
                        color='black'
                        onClick={handleSave}
                    >
                        Salvar!
                    </PrimaryButtonStyled>
                </div>
            </Box>
        </Modal>
    );
};

export default ModalEditEvent;
