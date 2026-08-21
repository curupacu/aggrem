import { useEffect, useRef, useState } from 'react';
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from 'motion/react';

const PHRASES = ['para evoluir.', 'para inovar.', 'para crescer.', 'para transformar.'];

function useTypedText(reduceMotion) {
    const [text, setText] = useState(reduceMotion ? PHRASES[PHRASES.length - 1] : '');

    useEffect(() => {
        if (reduceMotion) return;
        let pi = 0;
        let ci = 0;
        let deleting = false;
        let timer;

        function tick() {
            const phrase = PHRASES[pi];
            if (!deleting) {
                ci++;
                setText(phrase.slice(0, ci));
                if (ci === phrase.length) {
                    deleting = true;
                    timer = setTimeout(tick, 2400);
                    return;
                }
                timer = setTimeout(tick, 85);
            } else {
                ci--;
                setText(phrase.slice(0, ci));
                if (ci === 0) {
                    deleting = false;
                    pi = (pi + 1) % PHRASES.length;
                    timer = setTimeout(tick, 350);
                    return;
                }
                timer = setTimeout(tick, 48);
            }
        }

        timer = setTimeout(tick, 800);
        return () => clearTimeout(timer);
    }, [reduceMotion]);

    return text;
}

export default function Hero() {
    const reduceMotion = useReducedMotion();
    const typedText = useTypedText(reduceMotion);
    const heroRef = useRef(null);
    const stageRef = useRef(null);
    const layerRefs = useRef([]);

    // Scroll Zoom Hero: the visual scales up, blurs and fades as the hero scrolls out of view.
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.25]);
    const blurPx = useTransform(scrollYProgress, [0, 1], [0, 14]);
    const filter = useMotionTemplate`blur(${blurPx}px)`;

    // Mouse-driven depth parallax across the ring / particles / mark layers.
    useEffect(() => {
        if (reduceMotion) return;
        if (window.matchMedia('(hover: none)').matches) return;
        const stage = stageRef.current;
        if (!stage) return;

        function onMove(e) {
            const rect = stage.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width - 0.5;
            const py = (e.clientY - rect.top) / rect.height - 0.5;
            layerRefs.current.forEach((el) => {
                if (!el) return;
                const depth = parseFloat(el.dataset.depth) || 0.5;
                const tx = px * 30 * depth;
                const ty = py * 30 * depth;
                if (el.classList.contains('mark-tilt')) {
                    el.style.transform = `translate(${tx}px, ${ty}px) rotateY(${px * 14 * depth}deg) rotateX(${-py * 14 * depth}deg)`;
                } else {
                    el.style.transform = `translate(${tx}px, ${ty}px)`;
                }
            });
        }

        function onLeave() {
            layerRefs.current.forEach((el) => { if (el) el.style.transform = ''; });
        }

        stage.addEventListener('mousemove', onMove);
        stage.addEventListener('mouseleave', onLeave);
        return () => {
            stage.removeEventListener('mousemove', onMove);
            stage.removeEventListener('mouseleave', onLeave);
        };
    }, [reduceMotion]);

    return (
        <section className="hero" ref={heroRef}>
            <div className="hero-text">
                <motion.h2
                    initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    Seu caminho<br />
                    <span className="gradient">
                        {typedText}
                        {!reduceMotion && <span className="typed-cursor" />}
                    </span>
                </motion.h2>
                <motion.p
                    initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                    Fazemos projetos personalizados com competência: do jogo que conecta amigos à plataforma que transforma vidas.
                </motion.p>

                <motion.div
                    className="hero-actions"
                    initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <a className="button primary" href="#contato">Fale conosco</a>
                    <a className="button secondary" href="#portfolio">Ver portfólio</a>
                </motion.div>
            </div>

            <motion.div
                className="hero-visual"
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
                <motion.div className="hero-image" style={{ scale, opacity, filter }}>
                    <div className="mark-stage" ref={stageRef}>
                        <div className="mark-flash" aria-hidden="true" />
                        <div
                            className="mark-ring-wrap"
                            data-depth="0.4"
                            aria-hidden="true"
                            ref={(el) => { layerRefs.current[0] = el; }}
                        >
                            <div className="mark-ring" />
                        </div>
                        <div
                            className="mark-particles"
                            data-depth="0.7"
                            aria-hidden="true"
                            ref={(el) => { layerRefs.current[1] = el; }}
                        >
                            {Array.from({ length: 10 }).map((_, i) => <span key={i} />)}
                        </div>
                        <div
                            className="mark-tilt"
                            data-depth="1"
                            ref={(el) => { layerRefs.current[2] = el; }}
                        >
                            <svg className="hero-mark" width="120" height="211" viewBox="0 0 37 65" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Símbolo da Aggrem">
                                <path d="M2.10297 62.7618L11.103 48.7618M34.103 42.2618V9.26178L11.103 48.7618M34.103 42.2618C32.503 42.2618 11.103 48.7618 11.103 48.7618M34.103 42.2618V63.2618" stroke="url(#herog)" strokeWidth="5" />
                                <defs>
                                    <linearGradient id="herog" x1="18.103" y1="9.26178" x2="18.103" y2="63.2618" gradientUnits="userSpaceOnUse">
                                        <stop offset="0.418269" stopColor="#6C0091" />
                                        <stop offset="0.533654" stopColor="#46005D" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                    <span className="hero-mark-label">Aggrem</span>
                </motion.div>
            </motion.div>
        </section>
    );
}
