import { useState } from 'react';
import { motion } from 'motion/react';
import { sendContactMessage } from '../firebase';

export default function Contact() {
    const [form, setForm] = useState({ nome: '', email: '', assunto: '', mensagem: '' });
    const [status, setStatus] = useState('idle'); // idle | sending | success | error

    function handleChange(e) {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus('sending');
        try {
            await sendContactMessage(form);
            setStatus('success');
            setForm({ nome: '', email: '', assunto: '', mensagem: '' });
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    }

    return (
        <section id="contato" className="contact-section">
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
                <p className="section-subtitle">Contato</p>
                <h3>Quer falar com a gente?</h3>
            </motion.div>
            <div className="contact-grid">
                <motion.div
                    className="contact-card"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h4>Informações</h4>
                    <p>Endereço: Estr. das Lágrimas, 2461 - Ipiranga, São Paulo - SP, 04244-000 - ETEC de Heliópolis, Arquiteto Ruy Ohtake</p>
                    <p>Telefone: (11) 90000-0000</p>
                    <p>Email: Aggremtec@gmail.com</p>
                    <div className="map-container">
                        <iframe
                            src="https://maps.google.com/maps?q=-23.609320,-46.607720&z=16&output=embed"
                            title="Localização da Aggrem na ETEC Heliópolis"
                            className="map-iframe"
                            allowFullScreen
                            loading="lazy"
                        />
                    </div>
                </motion.div>
                <motion.form
                    className="contact-form"
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <label>
                        Nome
                        <input type="text" name="nome" placeholder="Seu nome" required value={form.nome} onChange={handleChange} />
                    </label>
                    <label>
                        Email
                        <input type="email" name="email" placeholder="seu@email.com" required value={form.email} onChange={handleChange} />
                    </label>
                    <label>
                        Assunto
                        <input type="text" name="assunto" placeholder="Sobre o que você quer falar?" required value={form.assunto} onChange={handleChange} />
                    </label>
                    <label>
                        Mensagem
                        <textarea rows="4" name="mensagem" placeholder="Escreva sua mensagem" required value={form.mensagem} onChange={handleChange} />
                    </label>
                    <button type="submit" className="button primary" style={{ width: '100%' }} disabled={status === 'sending'}>
                        <i className={`fa-solid ${status === 'sending' ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`} />{' '}
                        {status === 'sending' ? 'Enviando...' : 'Enviar mensagem'}
                    </button>
                    {status === 'success' && (
                        <div className="form-feedback success">✓ Mensagem enviada! Entraremos em contato em breve.</div>
                    )}
                    {status === 'error' && (
                        <div className="form-feedback error">✗ Erro ao enviar. Tente novamente ou mande um e-mail diretamente.</div>
                    )}
                </motion.form>
            </div>
        </section>
    );
}
