import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './features/home/components/HomePage/HomePage';
import ListingsPage from './features/listings/components/ListingsPage/ListingsPage';
import { SearchProvider } from './context/SearchContext';

type Page = 'home' | 'listings';

function App() {
    const [currentPage, setCurrentPage] = useState<Page>('home');

    const navigate = (page: Page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    return (
        <SearchProvider>
            <Header onNavigate={navigate} />
            <main>
                {currentPage === 'home' && <HomePage onSearch={() => navigate('listings')} />}
                {currentPage === 'listings' && <ListingsPage />}
            </main>
            <Footer />
        </SearchProvider>
    );
}

export default App;