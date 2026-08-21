import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const SLIDES = [
    {
        id: 'perfiz',
        visualClass: 'slide-perfiz',
        title: 'Perfiz',
        text: 'Versão online e multiplayer do clássico jogo Perfil, com 751 cartas e 15 temas.',
        link: 'https://perfil-webapp.web.app/',
    },
    {
        id: 'nocturis',
        visualClass: 'slide-juridico',
        title: 'Nocturis',
        text: 'Triagem jurídica inteligente que conecta cidadãos a advogados independentes nas áreas cível e trabalhista.',
        link: 'https://nocturis.com.br',
        badge: 'Projeto em andamento',
    },
    {
        id: 'em-breve',
        visualClass: 'slide-soon',
        title: 'Novos projetos',
        text: 'Estamos sempre construindo novas soluções. Fique de olho!',
    },
];

const SPRING = { type: 'spring', stiffness: 300, damping: 30 };

function signedOffset(i, index, n) {
    let offset = i - index;
    if (offset > n / 2) offset -= n;
    if (offset < -n / 2) offset += n;
    return offset;
}

function OwlStage({ active }) {
    const stageRef = useRef(null);
    const owlRef = useRef(null);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        if (reduceMotion) return;
        if (window.matchMedia('(hover: none)').matches) return;
        const stage = stageRef.current;
        const owl = owlRef.current;
        if (!stage || !owl) return;

        function onMove(e) {
            const rect = stage.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width - 0.5;
            owl.style.transform = `rotate(${px * 10}deg) scale(1.04)`;
        }
        function onLeave() { owl.style.transform = ''; }

        stage.addEventListener('mousemove', onMove);
        stage.addEventListener('mouseleave', onLeave);
        return () => {
            stage.removeEventListener('mousemove', onMove);
            stage.removeEventListener('mouseleave', onLeave);
        };
    }, [reduceMotion]);

    return (
        <div className="slide-visual slide-juridico" ref={stageRef}>
            <span className="slide-badge">
                <span className="slide-badge-dot" />
                Projeto em andamento
            </span>
            <div className="owl-stage" ref={owlRef}>
                <img src="img/nocturis-logo.svg" alt="Logo do Nocturis" className="slide-nocturis-logo" />
            </div>
        </div>
    );
}

export default function Portfolio() {
    const [index, setIndex] = useState(0);
    const n = SLIDES.length;
    const reduceMotion = useReducedMotion();
    const trackRef = useRef(null);

    const goTo = (i) => setIndex(((i % n) + n) % n);
    const next = () => goTo(index + 1);
    const prev = () => goTo(index - 1);

    useEffect(() => {
        if (reduceMotion) return;
        const id = setInterval(next, 5000);
        return () => clearInterval(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index, reduceMotion]);

    function handleDragEnd(event, info) {
        const swipe = info.offset.x + info.velocity.x * 0.15;
        if (swipe < -80) next();
        else if (swipe > 80) prev();
    }

    return (
        <section id="portfolio" className="carousel-section">
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
                <h3>Nossas criações</h3>
            </motion.div>

            <motion.div
                className="carousel"
                aria-label="Carrossel de portfólio"
                initial={{ opacity: 0, y: 36, rotate: -5, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            >
                <button className="carousel-button prev" aria-label="Anterior" onClick={prev}>❮</button>

                <motion.div
                    className="carousel-track"
                    ref={trackRef}
                    drag={reduceMotion ? false : 'x'}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.4}
                    onDragEnd={handleDragEnd}
                >
                    {SLIDES.map((slide, i) => {
                        const offset = signedOffset(i, index, n);
                        const abs = Math.abs(offset);
                        const isActive = offset === 0;

                        return (
                            <motion.article
                                key={slide.id}
                                className={`carousel-slide${isActive ? ' active' : ''}`}
                                animate={{
                                    x: `${offset * 62 - 50}%`,
                                    z: abs === 0 ? 0 : -260,
                                    rotateY: offset * -32,
                                    opacity: abs === 0 ? 1 : abs === 1 ? 0.55 : 0,
                                }}
                                transition={SPRING}
                                style={{
                                    zIndex: n - abs,
                                    pointerEvents: abs <= 1 ? 'auto' : 'none',
                                }}
                                onClick={() => { if (!isActive) goTo(i); }}
                            >
                                {slide.id === 'nocturis' ? (
                                    <OwlStage active={isActive} />
                                ) : (
                                    <div className={`slide-visual ${slide.visualClass}`}>
                                        {slide.id === 'perfiz' && (
                                            <img src="img/Vector 1.png" alt="Logo do Perfiz" />
                                        )}
                                        {slide.id === 'em-breve' && (
                                            <span className="slide-visual-text">Em breve</span>
                                        )}
                                    </div>
                                )}
                                <div className="slide-caption">
                                    <h4>{slide.title}</h4>
                                    <p>{slide.text}</p>
                                    {slide.link && (
                                        <a
                                            href={slide.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="slide-link"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            Acessar projeto <i className="fa-solid fa-arrow-up-right-from-square" />
                                        </a>
                                    )}
                                </div>
                            </motion.article>
                        );
                    })}
                </motion.div>

                <button className="carousel-button next" aria-label="Próximo" onClick={next}>❯</button>
            </motion.div>

            <p className="carousel-hint">Arraste ou clique nas setas</p>

            <div className="carousel-progress">
                {SLIDES.map((slide, i) => (
                    <button
                        key={slide.id}
                        className="carousel-dot"
                        aria-label={`Ir para ${slide.title}`}
                        onClick={() => goTo(i)}
                    >
                        {i === index && (
                            <motion.div
                                className="carousel-dot-fill"
                                layoutId="carousel-dot-fill"
                                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                            />
                        )}
                    </button>
                ))}
            </div>
        </section>
    );
}
