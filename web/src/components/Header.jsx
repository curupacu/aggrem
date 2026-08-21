import { useEffect, useState } from 'react';

const NAV_LINKS = [
    { href: '#sobre', label: 'Sobre' },
    { href: '#servicos', label: 'Serviços' },
    { href: '#portfolio', label: 'Portfólio' },
    { href: '#contato', label: 'Contato' },
];

export default function Header() {
    const [active, setActive] = useState('');

    useEffect(() => {
        const sections = NAV_LINKS
            .map((l) => document.querySelector(l.href))
            .filter(Boolean);
        if (!sections.length) return;

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive('#' + entry.target.id);
                });
            },
            { rootMargin: '-45% 0px -50% 0px' }
        );
        sections.forEach((s) => io.observe(s));
        return () => io.disconnect();
    }, []);

    return (
        <header className="site-header">
            <a className="logo-area" href="#">
                <svg className="logo-mark" width="37" height="65" viewBox="0 0 37 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.10297 62.7618L11.103 48.7618M34.103 42.2618V9.26178L11.103 48.7618M34.103 42.2618C32.503 42.2618 11.103 48.7618 11.103 48.7618M34.103 42.2618V63.2618" stroke="url(#navg)" strokeWidth="5" />
                    <defs>
                        <linearGradient id="navg" x1="18.103" y1="9.26178" x2="18.103" y2="63.2618" gradientUnits="userSpaceOnUse">
                            <stop offset="0.418269" stopColor="#6C0091" />
                            <stop offset="0.533654" stopColor="#46005D" />
                        </linearGradient>
                    </defs>
                </svg>
                <div>
                    <h1 className="brand-name">Aggrem</h1>
                    <p className="brand-tag">Seu caminho para evoluir</p>
                </div>
            </a>

            <nav className="site-nav">
                {NAV_LINKS.map((l) => (
                    <a key={l.href} href={l.href} className={active === l.href ? 'active' : ''}>
                        {l.label}
                    </a>
                ))}
            </nav>
        </header>
    );
}
