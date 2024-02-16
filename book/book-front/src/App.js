import './App.css';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import {Routes, Route} from 'react-router-dom'
import BookList from './book/BookList';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/booklist' element={<BookList />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
