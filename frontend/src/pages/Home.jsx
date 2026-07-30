import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      <h1>Welcome to Kitchen Friend</h1>

      <p>
        Your grocery shopping made easy.
      </p>

      <div>
        <Link to="/register">
          Register
        </Link>

        {" | "}

        <Link to="/login">
          Login
        </Link>
      </div>
    </main>
  );
}

export default Home;