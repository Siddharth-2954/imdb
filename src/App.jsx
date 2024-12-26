import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import UserContextProvider from "./context/UserContextProvider";
import ActorList from "./components/ActorList";

function App() {
  return (
    <Provider store={store}>
      <UserContextProvider>
        <div>
          <h1>Welcome to the Actor Management App</h1>
          <ActorList type="movie" id={12345} />
        </div>
      </UserContextProvider>
    </Provider>
  );
}

export default App;