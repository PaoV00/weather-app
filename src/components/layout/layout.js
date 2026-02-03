import MainNavigation from '../mainNavigation';
import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <>
            <MainNavigation />
            <main className="container mt-4">
                <Outlet />
            </main>
        </>
    );
}

export default Layout;