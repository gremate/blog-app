import '../../styles/layout/_footer.scss';
import React from 'react';

export default function Footer() {
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