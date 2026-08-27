import { Outlet } from 'react-router-dom'
import Header from '../header/Header'

export const NavbarLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default NavbarLayout;
