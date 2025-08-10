import { Outlet } from 'react-router-dom'
import Hero from '../hero/Hero';

export const HeroLayout = () => {
    return (
        <>
            <Hero />
            <Outlet />
        </>
    );
}

export default HeroLayout;