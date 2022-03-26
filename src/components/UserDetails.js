import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';

import Error from '../components/Error';

/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
const UserDetails = ({ allUsers, isPending, error }) => {
    const { uid, pageNumber } = useParams(null);
    const [user, setUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        if (!allUsers.length) return;

        const selectedUser = allUsers[pageNumber]?.results?.find(userObj => {
            return userObj.id.value === uid;
        });

        setUser(selectedUser);
    }, [allUsers]);

    const getUserAddress = () => {
        const location = user?.location;
        const streetName = location?.street?.name || '';
        const streetNumber = location?.street?.number || '';
        const state = location?.state || '';
        const postCode = location?.postcode || '';

        return `${streetName} ${streetNumber}, ${state} ${postCode}`;
    };

    useEffect(() => {
        setUserDetails([
            {
                text: 'Age:',
                value: user?.registered?.age || ''
            },
            {
                text: 'Phone: ',
                value: user?.phone || ''
            },
            {
                text: 'Address: ',
                value: getUserAddress(user)
            },
            {
                text: 'Country: ',
                value: user?.location?.country
            }
        ]);
    }, [user]);

    return (
        <>
            { error && <Error error={error} /> }
            { user && !error && 
                <Container className='mt-5' fluid="md">
                    <Row className="justify-content-center">
                        {isPending && <Col xs={12}>
                            <div className='text-center'>
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                        </Col>}
                        <Col xs={10}>
                            <div className='text-center'>
                                <Image className='p-2' src={user?.picture?.medium} alt={user?.name?.first} roundedCircle fluid />
                            </div>
                        </Col>
                        <Col xs={10}>
                            <h1 className='text-center'>{ `${user?.name?.first || ''} ${user?.name?.last || ''}`}</h1>
                            <Table striped bordered hover>
                                <tbody>
                                    { userDetails?.map((userDetail, idx) => {
                                        return (<tr key={idx}>
                                            <td className='font-weight-bold'>{userDetail.text}</td>
                                            <td>{userDetail.value}</td>
                                        </tr>);
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            }
        </>
    );
};
 
export default UserDetails;