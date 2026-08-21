export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-grid">
                <div className="footer-section">
                    <h4>Aggrem</h4>
                    <p><i className="fa-solid fa-envelope footer-icon" aria-hidden="true" /><a href="mailto:Aggremtec@gmail.com">Aggremtec@gmail.com</a></p>
                    <p><i className="fa-brands fa-instagram footer-icon" aria-hidden="true" /><a href="https://instagram.com/aggrem_oficial" target="_blank" rel="noreferrer">@aggrem_oficial</a></p>
                </div>
                <div className="footer-section">
                    <h4>Integrantes</h4>
                    <ul className="team-list">
                        <li>
                            <strong>Guilherme Reche Alamino</strong>
                            <div className="member-contacts">
                                <a href="mailto:guialamino2008@gmail.com"><i className="fa-solid fa-envelope footer-icon" aria-hidden="true" />guialamino2008@gmail.com</a>
                                <a href="https://www.instagram.com/alaminoguilherme/" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram footer-icon" aria-hidden="true" />@guilhermereche</a>
                            </div>
                        </li>
                        <li>
                            <strong>Gustavo Cereja Peres</strong>
                            <div className="member-contacts">
                                <a href="mailto:gustavo.peres@aggrem.com"><i className="fa-solid fa-envelope footer-icon" aria-hidden="true" />gustavo.peres@aggrem.com</a>
                                <a href="https://www.instagram.com/gustavo0161587/" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram footer-icon" aria-hidden="true" />@gustavocereja</a>
                            </div>
                        </li>
                        <li>
                            <strong>Gabriel Paulucci</strong>
                            <div className="member-contacts">
                                <a href="mailto:gpghjke@gmail.com"><i className="fa-solid fa-envelope footer-icon" aria-hidden="true" />gpghjke@gmail.com</a>
                                <a href="https://www.instagram.com/nebu_64/" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram footer-icon" aria-hidden="true" />@gabrielpaulucci</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <p className="footer-note">© 2026 Aggrem. Todos os direitos reservados.</p>
        </footer>
    );
}
