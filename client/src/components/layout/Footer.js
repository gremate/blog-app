import '../../styles/layout/footer.scss';

export default function Footer(props) {
    const links = ['About', 'Support', 'Privacy Policy', 'Terms of Service', 'Copyright Policy'];

    return (
        <footer>
            <div className="content-container">
                <div className="links">
                    {links.map(x => <div key={x} className="link">{x}</div>)}
                </div>
            </div>
        </footer>
    );
}