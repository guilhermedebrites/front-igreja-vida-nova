import { faHouse, faTicket, faEnvelopeOpen, faUser, faLongArrowAltLeft, faHandHoldingDollar, faHandsPraying, faWebAwesome } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import MenuItems from './MenuItems';
import { HeaderBox } from './styles/HeaderStyled';
import { HeaderTitleMenuTextStyled } from './styles/TextStyled';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const [activeItem, setActiveItem] = React.useState(location.pathname);
    const [isPastor, setIsPastor] = React.useState(false);
    const [isObreiro, setIsObreiro] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const navigate = useNavigate();

    const getEscopos = () => {
        const roles = JSON.parse(localStorage.getItem('roles'));
        if (roles) {
            const isPastor = roles.some(role => role === 'PASTOR');
            const isObreiro = roles.some(role => role === 'OBREIRO');
            setIsObreiro(isObreiro);
            setIsPastor(isPastor);
        }
    }

    const verifyAuth = () => {
        const publicRoutes = ['/login', '/cadastrar'];
        const currentPath = window.location.pathname;
        const accessToken = localStorage.getItem("access_token");

        if (!publicRoutes.includes(currentPath) && !accessToken) {
            navigate('/login', { replace: true });
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        verifyAuth();
    }, []);


    React.useEffect(() => {
        getEscopos();
    }, [activeItem]);

    return (
        <>
            <HeaderBox>
                <HeaderTitleMenuTextStyled>Igreja Vida Nova</HeaderTitleMenuTextStyled>
                <div style={{ display: 'flex', gap: '32px' }}>
                    <MenuItems 
                        icon={faHouse} 
                        text={'Home'} 
                        color={'#858D95'} 
                        isActive={activeItem === '/'} 
                        onClick={() => {
                            setActiveItem('/');
                            navigate('/');
                        }}
                    />
                    <MenuItems 
                        icon={faTicket} 
                        text={'Eventos'} 
                        color={'#858D95'}
                        isActive={activeItem === '/eventos'} 
                        onClick={() => {
                            setActiveItem('/eventos');
                            navigate('/eventos');
                        }}
                    />
                    <MenuItems 
                        icon={faWebAwesome} 
                        text={'Cerimonias'} 
                        color={'#858D95'}
                        isActive={activeItem === '/cerimonias'} 
                        onClick={() => {
                            setActiveItem('/cerimonias');
                            navigate('/cerimonias');
                        }}
                    />
                    {isPastor && (
                        <MenuItems 
                            icon={faEnvelopeOpen} 
                            text={'Gerenciar Obreiros'} 
                            color={'#858D95'}
                            isActive={activeItem === '/gerenciar-obreiros'} 
                            onClick={() => {
                                setActiveItem('/gerenciar-obreiros');
                                navigate('/gerenciar-obreiros');
                            }}
                        />
                    )}
                    {isObreiro && (
                        <MenuItems 
                            icon={faEnvelopeOpen} 
                            text={'Minhas Funções'} 
                            color={'#858D95'}
                            isActive={activeItem === '/minhas-funcoes'} 
                            onClick={() => {
                                setActiveItem('/minhas-funcoes');
                                navigate('/minhas-funcoes');
                            }}
                        />
                    )}
                    <MenuItems 
                        icon={faHandsPraying} 
                        text={'Pedir Oração'} 
                        color={'#858D95'}
                        isActive={activeItem === '/pedir-oracao'} 
                        onClick={() => {
                            setActiveItem('/pedir-oracao');
                            navigate('/pedir-oracao');
                        }}
                    />
                    <MenuItems 
                        icon={faHandHoldingDollar} 
                        text={'Doações'} 
                        color={'#858D95'}
                        isActive={activeItem === '/doacoes'} 
                        onClick={() => {
                            setActiveItem('/doacoes');
                            navigate('/doacoes');
                        }}
                    />
                    <MenuItems 
                        icon={faUser} 
                        text={'Perfil'} 
                        color={'#858D95'}
                        isActive={activeItem === '/perfil'} 
                        onClick={() => {
                            setActiveItem('/perfil');
                            navigate('/perfil');
                        }}
                    />
                    {localStorage.getItem('access_token') ? (
                        <MenuItems 
                            icon={faLongArrowAltLeft} 
                            text={'Sair'} 
                            color={'#858D95'}
                            onClick={() => {
                                localStorage.clear();
                                navigate('/login');
                            }}
                        />
                    ) : (
                        <MenuItems 
                            text={'Entrar'} 
                            color={'#858D95'}
                            onClick={() => {
                                navigate('/login');
                            }}
                        />
                    )}
                </div>
            </HeaderBox>
        </>
    )
}

export default Header;