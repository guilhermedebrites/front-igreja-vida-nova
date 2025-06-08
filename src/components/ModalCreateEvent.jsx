import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import * as React from 'react';
import InputText from '../components/InputText';
import InputSelect from './InputSelect';
import { MainTextStyled } from './styles/TextStyled';
import { PrimaryButtonStyled } from './styles/ButtonStyled';

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


const ModalCreateEvent = (props) => {

    const [tipoEvento, setTipoEvento] = React.useState('CULTO');
    const [tema , setTema] = React.useState("");
    const [data, setData] = React.useState("");
    const [endereco, setEndereco] = React.useState("");

    const handleEventType = (value) => {
        setTipoEvento(value);
        setObreiroSelecionado("");
    }

    React.useEffect(() => {
        setTema("");
        setData("");
        setEndereco("");
    }, [props.open]);

    const handleCriarEvento = () => {
        const evento = {
            tipo: tipoEvento,
            endereco: endereco,
            data: data,
            tema: tema,
        };
        axios.post('http://18.223.170.200:8080/evento/cadastrar', evento)
            .then(() => {
                props.handleClose();
            })
            .catch(error => {
                console.error('Erro ao criar evento:', error.response.data);
                alert(`Erro ao criar evento: ${error.response.data}`);
            });
    }

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            >
            <Box sx={style}>
                <MainTextStyled color='#030B16' fontSize='34px' fontWeight='bold' style={{textAlign: 'center'}}>Criar Evento</MainTextStyled>
                <div 
                    style={{
                        backgroundColor: '#FFFFFF',
                        margin: '19px 62px',
                        borderRadius: '20px',
                        padding: '38px',
                    }}
                >
                    <InputSelect 
                        label= 'Tipo de Evento'
                        value={tipoEvento}
                        options={['CULTO', 'VISITA']}
                        onChange={(e) => handleEventType(e.target.value)}
                        width='300px'
                    />
                    <InputText
                        label= 'Tema' 
                        type='text'
                        value={tema} 
                        onChange={(e) => setTema(e.target.value)}
                        placeholder='Tema do evento'
                        width='300px'
                    />
                    <InputText
                        label= 'Data' 
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        type='datetime-local'
                        width='300px'
                    />
                    <InputText
                        label= 'Endereço' 
                        placeholder='Endereço do evento'
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                        width='300px'
                    />
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <PrimaryButtonStyled width='180px' backgroundColor='#F4C400' backgroundColorHover='#CDA502' color='black' onClick={handleCriarEvento}>
                        Criar!
                    </PrimaryButtonStyled>
                </div>
            </Box>
        </Modal>
    );
}

export default ModalCreateEvent;
