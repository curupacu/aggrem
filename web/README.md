# Aggrem — site (React + Motion)

O site deixou de ser HTML/CSS/JS puro e agora é um projeto React (Vite) com a
biblioteca [Motion](https://motion.dev) para as animações de scroll, o
carrossel do portfólio e os efeitos do hero.

## Como rodar

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`. Hot reload automático ao salvar.

## Como gerar o build pra deploy

```bash
npm run build
```

Isso gera os arquivos finais direto em `../public` (a pasta que o Firebase
Hosting serve). **Sempre rode `npm run build` antes de fazer `firebase deploy`**
— o Firebase não sabe nada de React, ele só serve o que estiver em `public/`.

## Estrutura

- `src/components/` — um componente por seção do site (Hero, Services,
  Portfolio, About, Contact, Header, Footer).
- `src/firebase.js` — configuração do Firebase e função de envio do formulário
  de contato.
- `public/` (dentro de `web/`) — imagens, `404.html` e `admin.html`, copiados
  como estão pro build final.
- `vite.config.js` — está configurado pra jogar o build em `../public`
  (a pasta raiz do projeto, não a pasta `public/` daqui de dentro).

## O painel admin

`admin.html` continua sendo uma página HTML separada e estática (não faz
parte do app React) — ela é só copiada junto no build.
