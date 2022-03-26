import { useState, useEffect } from "react";
import useFetchData from '../utils/useFetchData';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Placeholder from 'react-bootstrap/Placeholder';
import { Pagination } from 'react-bootstrap';

const List = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [url, setUrl] = useState(`https://randomuser.me/api/?nat=us&page=${pageNumber}&results=10&seed=randomUsers`);
    const { data: tableData, setData: setTableData, isPending, error } = useFetchData(url);

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

    const handlePagination = (num) => {
        const newPageNumber = pageNumber + num;
        setPageNumber(newPageNumber);
    };

    return (
        <>
            <h1 className='py-3 text-center'>List Page</h1>
            { error && <div>Something went wrong...</div> }
            {allUsers.length && <Container fluid="md">
                <Row className="justify-content-md-center">
                    <Col xs={12} md={10}>
                        {!isPending && tableData &&
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.results.map((user, idx) => {
                                        const firstName = user?.name?.first || '';
                                        const lastName = user?.name?.last || '';
                                        const userName = user?.login?.username || '';
                                        const email = user?.email || '';

                                        return (
                                            <tr key={idx} onClick={() => console.log(userName)}>
                                                <td>{((tableData.info.page - 1) * 10) + (idx + 1)}</td>
                                                <td>{`${firstName} ${lastName}`}</td>
                                                <td>{userName}</td>
                                                <td>{email}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        }
                        {isPending &&
                            <Placeholder className="text-center user-list-placeholder" as="p" animation="glow">
                                {[...Array(15)].map((e, i) => <Placeholder key={i} xs={10} />)}
                            </Placeholder>
                        }
                        <Pagination className="justify-content-center">
                            <Pagination.Prev disabled={isPending || pageNumber === 1} onClick={() => { handlePagination(-1); }} />
                            <Pagination.Item active>{pageNumber}</Pagination.Item>
                            <Pagination.Next disabled={isPending} onClick={() => { handlePagination(1); }} />
                        </Pagination>
                    </Col>
                </Row>
            </Container>}
        </>
    );
};
 
export default List;