import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
    return (
        <>
            <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
            <Header />
            <main id="main-content">
                <Hero />
                <Services />
                <Portfolio />
                <About />
                <Contact />
            </main>
            <Footer />
        </>
    );
}
