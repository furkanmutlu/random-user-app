import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const NotFound = ({ error }) => {
    return (
        <div className="m-5">
            <p>Something went wrong... <br /> Error: {error}</p>
            <Link className='text-center' to='/'>Back to homepage</Link>
        </div>
    );
};
 
export default NotFound;