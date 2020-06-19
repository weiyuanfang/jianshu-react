import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import Header from "./common/Header";
import Home from "./pages/home";
import Detail from "./pages/detail";
import store from "./store";

function App() {
  return (
      <Provider store={store}>
        <BrowserRouter>
            <Header />
            <Route path='/' exact component={Home} />
            <Route path='/detail/:id' exact component={Detail} />
        </BrowserRouter>
      </Provider>
  );
}

export default App;
