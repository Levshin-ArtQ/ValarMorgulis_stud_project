import './App.css';
import {Route, Routes} from 'react-router-dom';
import Header from './Header';
import LoginPage from './authorization/LoginPage1';
import RegisterPage from './authorization/RegisterPage';
import Players from './components/Players';
import Item from './components/Item';
import Tasks from './components/Tasks';
import React, { createContext, useState } from 'react';
import {PlayerContext} from './PlayerContext';
import Message from './components/Message';
import AuthService from './services/auth.service';


// Создание контекста
const UserContext = createContext(null);

// <Route path={'/service'} element={<SalonProfile><ProductList /><ReservationForm></ReservationForm></SalonProfile>}></Route>


function App() {
    const [player, setPlayer] = useState(null);

    return (
        <PlayerContext.Provider value={{player, setPlayer}}>
        <div className="App">
        {AuthService.getCurrentUser() ? <Header /> : null}
            
            <Routes>
                
                <Route index element={<LoginPage/>}/>
                <Route path={'/login'} element={<LoginPage />}/>
                <Route path={'/register'} element={<RegisterPage />}/>
                <Route path={'/items'} element={<Item />}/>
                <Route path={'/messages'} element={<Message />}/>
                <Route path={'/tasks'} element={<Tasks />}/>
                {/*<Route path={'/players'} element={<Players />}/>*/}
                <Route path='*' element={<LoginPage />}/>
                
            </Routes>
        </div>
        </PlayerContext.Provider>
        
    );
}

export default App;

// git add .
// git commit -m "commit name"
// git push

// import './App.css';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import { Fragment } from 'react';

// import OtherPage from './OtherPage';
// import MainComponent from './MainComponent';


// function App() {
//   return (
//     <Router>
//       <Fragment>
//         <header>
//           <div>This is a multicontainer Application</div>
//           <Link to="/">Home</Link>
//           <Link to="/otherPage">Other Page</Link>
//         </header>
//         <div>
//           <Routes>
//             <Route exact path="/" element={<MainComponent />} />
//             <Route exact path="/otherPage" element={<OtherPage />} />
//           </Routes>
//         </div>
//       </Fragment>

//     </Router>
//   );
// }

// export default App;
