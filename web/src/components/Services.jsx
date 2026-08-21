import { motion } from 'motion/react';

const SERVICES = [
    {
        icon: 'fa-code',
        title: 'Desenvolvimento',
        text: 'Sistemas web, aplicativos e plataformas digitais sob medida, adaptados às necessidades do seu público.',
    },
    {
        icon: 'fa-lightbulb',
        title: 'Consultoria',
        text: 'Mapeamos o seu problema e indicamos a solução mais eficiente, com serviços de desenvolvimento de software.',
        featured: true,
    },
    {
        icon: 'fa-chart-line',
        title: 'Marketing digital',
        text: 'Cuidamos de campanhas, redes sociais e identidade visual para posicionar sua marca onde seu público está.',
    },
];

const tiltVariant = {
    hidden: { opacity: 0, y: 36, rotate: -5, scale: 0.92 },
    visible: { opacity: 1, y: 0, rotate: 0, scale: 1 },
};

export default function Services() {
    return (
        <section id="servicos" className="cards-section">
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
                <p className="section-subtitle">Nossos serviços</p>
                <h3>Faça seu pedido</h3>
            </motion.div>

            <div className="card-grid">
                {SERVICES.map((service, i) => (
                    <motion.article
                        key={service.title}
                        className={`card${service.featured ? ' featured' : ''}`}
                        variants={tiltVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, delay: i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                        <div className="card-icon">
                            <i className={`fa-solid ${service.icon}`} />
                        </div>
                        <h4>{service.title}</h4>
                        <p>{service.text}</p>
                    </motion.article>
                ))}
            </div>
        </section>
    );
}
