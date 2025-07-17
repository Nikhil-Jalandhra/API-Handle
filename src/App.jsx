import './App.css';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, ScrollToTop, AllBooks, AllUsers, AllJokes, Platform, AllStocks, BookDetails, StockDetail, VideoDetails, AllProducts, GetRandomJoke, GetRandomUser, UserDetailPage, GetRandomBooks, PlaylistDetail, ProductDetail, GetRandomProduct, } from './Index';

export default function MainPage() {
  return (
    <Router>
        <Navbar/>
        <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home/>} />

        {/* User */}
        <Route path="/user/page/:pageNo" element={<AllUsers/>} />
        <Route path="/user/:id" element={<UserDetailPage/>} />
        <Route path="/user/random" element={<GetRandomUser/>} />

        {/* Products */}
        <Route path="/products/page/:pageNo" element={<AllProducts/>} />
        <Route path="/products/:id" element={<ProductDetail/>} />
        <Route path="/products/random" element={<GetRandomProduct/>} />
        
        {/* Jokes */}
        <Route path="/jokes" element={<AllJokes/>} />
        <Route path="/jokes/random" element={<GetRandomJoke/>} />

        {/* Bookes */}
        <Route path="/books" element={<AllBooks/>} />
        <Route path="/books/:id" element={<BookDetails/>} />
        <Route path="/books/random" element={<GetRandomBooks/>} />

        {/* Stockes */}
        <Route path="/stocks/page/:pageNo" element={<AllStocks/>} />
        <Route path="/stocks/:stockSymbol" element={<StockDetail/>} />

        {/* video */}
        <Route path="videos" element={<Platform/>} />
        <Route path="/videos/:videoId" element={<VideoDetails/>} />
        <Route path="/playlist/:playlistId" element={<PlaylistDetail/>} />

      </Routes>
        <Footer />
    </Router>
  );
}
