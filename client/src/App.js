import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import AddDog from './components/AddDog/AddDog';
import LandingPage from "./components/LandingPage/LandingPage";
import Dogs from './components/Dogs/Dogs'
import DogDetail from './components/DogDetail/DogDetail'
import {useEffect} from 'react'
import {getDogs,getTemperaments} from "../src/actions/index"
import {useDispatch} from 'react-redux'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDogs())
    dispatch(getTemperaments())
  }, [dispatch])

  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/dogs/add" component={AddDog}/>
        <Route path="/dogs/:id" component={DogDetail}/>
        <Route exact path="/dogs" component={Dogs}/>      
      </Switch>
    </div>
    </BrowserRouter>
  );
  }

export default App;


 
 
