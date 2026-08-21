import { motion } from 'motion/react';

const STATS = [
    { num: '3', label: 'Projetos desenvolvidos' },
    { num: '751', label: 'Cartas no Perfiz' },
    { num: '3', label: 'Desenvolvedores' },
    { num: '2026', label: 'Ano de fundação' },
];

export default function About() {
    return (
        <section id="sobre" className="about-section">
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
                <h3>Missão, visão e valores</h3>
            </motion.div>
            <div className="about-grid">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p><strong>Missão:</strong> desenvolver soluções tecnológicas modernas, eficientes e confiáveis, com qualidade e segurança, ajudando pessoas e empresas a crescerem por meio da tecnologia.</p>
                    <p><strong>Visão:</strong> ser reconhecida pela qualidade, inovação e confiabilidade no desenvolvimento de soluções tecnológicas, crescendo de forma sólida no mercado.</p>
                    <p><strong>Valores:</strong> satisfação do cliente, inovação constante, confiança, valorização das pessoas e qualidade tecnológica em cada solução desenvolvida.</p>
                    <ul className="about-list">
                        <li>Trabalho em equipe</li>
                        <li>Comprometimento e transparência</li>
                        <li>Aprendizado contínuo</li>
                    </ul>
                </motion.div>
                <motion.div
                    className="about-image"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="about-card">
                        {STATS.map((stat) => (
                            <div className="about-stat" key={stat.label}>
                                <span className="about-stat-num">{stat.num}</span>
                                <span className="about-stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
