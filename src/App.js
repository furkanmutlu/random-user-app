import { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

// Hooks
import useFetchData from './hooks/useFetchData';
import useAllUsers from './hooks/useAllUsers';

// Bootstrap Components
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

// Custom Components
import List from './components/List';
import UserDetails from './components/UserDetails';
import NotFound from './components/NotFound';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    const [url, setUrl] = useState('https://randomuser.me/api/?nat=us&page=1&results=20&seed=randomUsers');
    const { data: tableData, setData: setTableData, isPending, error} = useFetchData(url);
    const { allUsers, setAllUsers, pageNumber, setPageNumber } = useAllUsers(tableData, setTableData, setUrl);

    return (
        <div className="App">
            <Router>
                <Navbar bg="primary" variant="dark">
                    <Container>
                        <Link className='text-white' to='/'>Home</Link>
                    </Container>
                </Navbar>
                <div className="content">
                    <Switch>
                        <Route exact path='/'>
                            <List
                                allUsers={allUsers}
                                setAllUsers={setAllUsers}
                                pageNumber={pageNumber}
                                setPageNumber={setPageNumber}
                                error={error}
                                isPending={isPending}
                                tableData={tableData}
                            />
                        </Route>
                        <Route path='/details/:pageNumber/:uid'>
                            <UserDetails 
                                allUsers={allUsers}  
                                isPending={isPending}
                                error={error}
                            />
                        </Route>
                        <Route path='*'>
                            <NotFound />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
