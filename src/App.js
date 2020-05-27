import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import gql from 'graphql-tag'

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/players/:playerId">
            <PlayerDetail/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const ALL_PLAYERS = gql`
  query {
    players {
      id
      name
    }
  }
`

function Home() {
  const { loading, error, data } = useQuery(ALL_PLAYERS)
  return (
    <>
      <h2>Players</h2>
      {loading && (
        <p>Loading...</p>
      )}
      {error && (
        <p>Error... Something happened..</p>
      )}
      {data && (
        <>
          {data.players.map(({ id,name }) => (
            <p key={id}>
              <Link to={`/players/${id}`}>
                {name}
              </Link>
            </p>
          ))}
        </>
      )}
    </>
  )
}

const GET_PLAYER = gql`
  {
    player(id: id) {
      id
      name
    }
  }
`

function PlayerDetail() {
  const { playerId } = useParams();
  const { loading, error, data } = useQuery(GET_PLAYER, {
    variables: {
      id: playerId
    }
  });

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  return (
    <>
      <h2>{data.player.name}</h2>
    </>
  )

}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
