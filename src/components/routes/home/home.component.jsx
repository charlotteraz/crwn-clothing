import { Outlet } from 'react-router-dom';

import Directory from '../../directory/directory.component.jsx';


function Home() {

    return (
        <div>
            <Outlet />
            <Directory />
        </div>
        
    )
};

export default Home;