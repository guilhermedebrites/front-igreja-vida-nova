import React, { useEffect } from 'react';
import { MainTextStyled } from '../components/styles/TextStyled';
import { PrimaryButtonStyled } from '../components/styles/ButtonStyled';
import axios from 'axios';
import InputText from '../components/InputText';

const Perfil = () => {

    const [user, setUser] = React.useState({
        id: localStorage.getItem('userId'),
        fullName: '',
        username: '',
        birthday: '',
    });

    const getUserInfo = () => {
        axios.get(`http://18.223.170.200:8080/membros/buscarPorId/${user.id}`)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }

    const updateUserInfo = () => {
        axios.put(`http://18.223.170.200:8080/membros/atualizar/${user.id}`, user)
            .then((response) => {
                console.log('User updated successfully:', response.data);
                alert('Dados atualizados com sucesso!');
                getUserInfo();
            })
            .catch((error) => {
                console.error('Error updating user data:', error);
            });
    }

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <>
            <div 
                style={{
                    backgroundColor: '#F6F6F6',
                    margin: '69px auto',
                    width: '40%',
                    borderRadius: '20px',
                    padding: '38px',
                }}
            >
                <MainTextStyled color='#030B16' fontSize='34px' fontWeight='bold' style={{textAlign: 'center', marginBottom: '15px'}}>Editar Perfil</MainTextStyled>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderRadius: '20px',
                        padding: '20px'
                    }}
                >
                    <InputText 
                        id="fullName" 
                        value={user.fullName} 
                        onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                        type="text" 
                        label="Nome Completo"
                        width='400px'
                    />
                    <InputText 
                        id="userName" 
                        value={user.username} 
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        type="text" 
                        label="Apelido"
                        width='400px'
                    />
                    <InputText 
                        id="date" 
                        value={user.birthday} 
                        onChange={(e) => setUser({ ...user, birthday: e.target.value })}
                        type="date" 
                        label="Data de Aniversário"
                        width='400px'
                    />
                    <PrimaryButtonStyled width='300px' backgroundColor='#F4C400' backgroundColorHover='#CDA502' color='black' marginTop='50px' onClick={updateUserInfo}>
                        Salvar Alterações
                    </PrimaryButtonStyled>
                </div>
            </div>
        </>
    );

}

export default Perfil;