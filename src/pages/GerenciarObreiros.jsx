import { Container } from "@mui/material";
import React, { useState } from "react";
import api from "../axiosConfig";
import ModalAddObreiro from "../components/ModalAddObreiro";
import ModalGerenciarFuncoes from "../components/ModalGerenciarFuncoes";
import { PrimaryButtonStyled } from "../components/styles/ButtonStyled";
import { MainTextStyled, SecondTextStyled } from "../components/styles/TextStyled";

const GerenciarObreiros = () => {

    const [openModalAddObreiro, setOpenModalAddObreiro] = useState(false);
    const [openModalGerenciarFuncoes, setOpenModalGerenciarFuncoes] = useState(false);
    const [obreiros, setObreiros] = React.useState([]);

    const getObreiros = () => {
        api.get('/obreiros/')
                .then(response => {
                    setObreiros(response.data);
                })
                .catch(error => {
                    console.error('Erro ao buscar eventos:', error);
                });
    }

    const handleOpenModalAddObreiros = () => setOpenModalAddObreiro(true);
    const handleCloseModalAddObreiros = () => {
        setOpenModalAddObreiro(false);
        getObreiros();
    } 

    const handleOpenModalGerenciarFuncoes = () => setOpenModalGerenciarFuncoes(true);
    const handleCloseModalGerenciarFuncoes = () => setOpenModalGerenciarFuncoes(false);

    React.useEffect(() => {
        getObreiros();
    }, []);

    return (
        <>
            <Container disableGutters maxWidth={false} sx={{marginTop: '61px'}}>
                <Container 
                    item 
                    sx={{
                        display: 'flex', 
                        justifyContent: 'space-between',
                        marginBottom: '61px'
                    }}
                >
                    <MainTextStyled>Gerenciamento de Obreiros</MainTextStyled>
                    <div
                        style={{
                            display: 'flex', 
                            alignItems: 'center',
                            gap: '16px'
                        }}
                    >
                        <PrimaryButtonStyled
                            backgroundColor='#1E984F'
                            color='white'
                            width='160px'
                            height='32px'
                            fontSize='16px'
                            fontWeight='bold'
                            style ={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onClick={handleOpenModalGerenciarFuncoes}
                        >
                            Gerenciar Funções
                        </PrimaryButtonStyled>
                        <PrimaryButtonStyled 
                            backgroundColor='#1E984F'
                            color='white'
                            width='160px'
                            height='32px'
                            fontSize='16px'
                            fontWeight='bold'
                            style ={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onClick={handleOpenModalAddObreiros}
                        >
                            Adicionar Obreiro
                        </PrimaryButtonStyled>
                    </div>
                </Container>
                <Container 
                    item 
                    sx={{
                            display: 'flex', 
                            flexWrap: 'wrap',
                            minWidth: '80vw',
                            gap: '38px',
                            marginBottom: '61px'
                    }}
                >
                    {obreiros.map((obreiro) => (
                        <div
                            key={obreiro.id} 
                            style={{
                                display: 'flex', 
                                alignItems: 'center',
                                padding: '16px', 
                                backgroundColor: '#F5F5F5', 
                                borderRadius: '8px',
                                gap: '16px',
                                width: '384px',
                            }}
                        >
                            <img 
                                src="../src/assets/images/Elipse.png" 
                                style={{width: '80px', height: '80px', borderRadius: '50%'}}
                            />
                            <SecondTextStyled>{obreiro.fullName}</SecondTextStyled>
                        </div>
                    ))}
                </Container>
            </Container>
            <ModalAddObreiro
                open={openModalAddObreiro} 
                handleClose={() => handleCloseModalAddObreiros()}
            />
            <ModalGerenciarFuncoes
                open={openModalGerenciarFuncoes} 
                handleClose={() => handleCloseModalGerenciarFuncoes()}
            />
        </>
    );
}

export default GerenciarObreiros;