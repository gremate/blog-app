import '../../styles/layout/layout.scss';
import Header from './Header';
import Footer from './Footer';

export default function Layout(props) {
    return (
        <div className="page-container">
            <Header />
            <div></div>
            <Footer />
        </div>
    );
}