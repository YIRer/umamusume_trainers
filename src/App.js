import { InMemoryCache, ApolloClient, ApolloProvider } from "@apollo/client";
import UmamusumeList from "./components/UmamusumeList";

const client = new ApolloClient({ cache: new InMemoryCache({}), uri: "http://localhost:4000/graphql" });

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <UmamusumeList />
      </div>
    </ApolloProvider>
  );
}

export default App;
