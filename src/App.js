import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Header } from './components/ui/Header';
import { DirectorView } from './components/director/DirectorView'
import { GenreView} from './components/genre/GenreView'
import { MediaView } from './components/media/MediaView'
import { ProducerView } from './components/producer/ProducerView'
import { TypeView } from './components/type/TypeView'
import { MediaUpdate } from './components/media/MediaUpdate';

function App() {
  return <Router>
    <Header/>
    <Switch>
      <Route exact path='/' component={MediaView} />
      <Route exact path='/director' component={DirectorView} />
      <Route exact path='/genre' component={GenreView} />
      <Route exact path='/producer' component={ProducerView} />
      <Route exact path='/type' component={TypeView} />
      <Route exact path='/medias/edit/:mediaId' component={ MediaUpdate } />
      <Redirect to='/' />
    </Switch> 
</Router>
}

export default App;
