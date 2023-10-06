import { Link } from 'react-router-dom';

function Home() {
    return (
        <>
            <h1>Home</h1>
            <Link to={`/login`}>Login</Link>
            <br />
            <br />
            <Link to={`/register`}>Signup</Link>
        </>
    )
}

export default Home;