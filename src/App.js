import { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

import useFetchData from './utils/useFetchData';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';


import List from './components/List';
import UserDetails from './components/UserDetails';
import NotFound from './components/NotFound';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    const [allUsers, setAllUsers] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [url, setUrl] = useState(`https://randomuser.me/api/?nat=us&page=${pageNumber}&results=10&seed=randomUsers`);
    const { data: tableData, setData: setTableData, isPending, error} = useFetchData(url);

    useEffect(() => {
        setAllUsers((prevUsers) => {
            const newUsers = [...prevUsers];
            newUsers[pageNumber] = tableData;

            return newUsers;
        });

        if (tableData && pageNumber !== tableData.info.page) {
            setPageNumber(tableData.info.page);
        }
    }, [tableData]);

    useEffect(() => {
        if (allUsers[pageNumber]) {
            setTableData(allUsers[pageNumber]);
            return;
        }

        setUrl(`https://randomuser.me/api/?nat=us&page=${pageNumber}&results=10&seed=randomUsers`);
    }, [pageNumber]);

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
