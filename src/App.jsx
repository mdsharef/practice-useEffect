import useApp from "./App_hock";

const App = () => {
    const { user, loading, count, max, handlePrev, handleNext } = useApp();

    return (
        <div>
            <h3>Users {count}</h3>
            {loading && <p>loading...</p>}
            {!loading && user && (
                <div>
                    Name: {user.name}
                    <br />
                    Email: {user.email}
                    <br />
                    Phone: {user.phone}
                </div>
            )}
            <button onClick={handlePrev} disabled={count == 1}>prev</button>
            <button onClick={handleNext} disabled={count == max}>next</button>
        </div>
    )
};

export default App;