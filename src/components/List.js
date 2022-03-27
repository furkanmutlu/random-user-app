import { useHistory } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Placeholder from 'react-bootstrap/Placeholder';
import { Pagination } from 'react-bootstrap';

import Error from '../components/Error';

/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
const List = ({ allUsers, setAllUsers, pageNumber, setPageNumber, error, isPending, tableData }) => {
    const history = useHistory();

    const handlePagination = (num) => {
        const newPageNumber = pageNumber + num;
        setPageNumber(newPageNumber);
    };

    const handleClick = (uid, idx) => {
        const copyAllUsers = [...allUsers];
        copyAllUsers[pageNumber].results[idx].viewed = true;
        console.log(copyAllUsers);
        
        setAllUsers(copyAllUsers);

        history.push(`/details/${pageNumber}/${uid}`);
    };

    return (
        <>
            { error && <Error error={error} /> }
            { !error && 
                <>
                    {/* <h1 className='py-3 text-center'>List Page</h1> */}
                    <Container className='my-5' fluid="md">
                        <Row className="justify-content-md-center">
                            <Col xs={12} md={11}>
                                {!isPending && tableData &&
                                    <Table bordered hover>
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
                                                    <tr 
                                                        key={idx} 
                                                        onClick={() => handleClick(user.id.value, idx)} 
                                                        className={ user.viewed ? 'bg-dark text-white' : null }
                                                    >
                                                        <td>{((tableData.info.page - 1) * 20) + (idx + 1)}</td>
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
                    </Container>
                </>
            }
        </>
    );
};
 
export default List;