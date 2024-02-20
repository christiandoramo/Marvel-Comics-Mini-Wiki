## checklist-cronograma de atividades do teste técnico até 18:00 - 22/02/2024 (quinta-feira)

    - Criar readme navegavel dividido em requisitos, como rodar/acessar, apresentação, colaboradores, indice, protótipo figma, imagens do projeto,  o passo a passo/cronograma do que fiz - inserir checklist no readme com essas atividades
    - Iniciar figma buscando ser minimalista e rápido/reutilizável
    - Prototipar componente carrossel
    - Prototipar componentes da page home
    - Prototipar componentes da page do pesonagem
    - Prototipar componentes do modal de comics
    - Prototipar componentes da page da comic
    - Prototipar page do carrossel
    - Prototipar page do home
    - Prototipar page do pesonagem
    - Prototipar modal de comics
    - Prototipar page da comic
    - Iniciar (funcional sem estilo) page de Home
    - Iniciar (funcional sem estilo) page do personagem
    - Iniciar (funcional sem estilo) page da comic
    - Iniciar (funcional sem estilo) componente carrosel

    ### plus
    - Prototipar componentes do modal de series
    - Prototipar componentes da page da serie
    - Prototipar modal de series
    - Prototipar page da serie
    - Iniciar (funcional sem estilo) page da serie
    - criar botões favoritar (apenas estilos)
    - criar botões favoritar personagem (funcional)
    - criar botões favoritar comic funcional
    - criar botões favoritar serie funcional
    - criar favoritos com abas para personagens, series comics

    # Requisitos
    ## Requisitos funcionais
    - deve poder voltar em todas as paginas
    - deve poder fechar qualquer modal
    - navegação da page com componente carrosel para home
    - navegação de page home para page personagem
    - dentro de perfil pode se abrir um modal com as comics ao clickar em ver comics - o modal possui todos as comics e suas informações ( pode-se usar barra de busca para achar series desse personagem, mas sem filtros)
    - ao clickar em uma comic vai para a page de comic
    - na page comic o nome dos personagens da comics podem ser clickados indo ate o perfil do personagem que foi clickado
    - em Home deve ser usado os limits, counts,offset, para listar os personagem buscados ou renderizados sem input na busca ao apertar enter(ou clickar) para buscar
    - em Home podem ser aplicado filtros (com base nos personagens ja achados, nao precisa fazer nova requisição)
    - no modal de comics pode ser aplicado filtros (com base nos comics ja carregados, nao precisa fazer nova requisição - comics já vem com o personagem da pagina de personagem)

    ## Requisitos não funcionais

    - usuário pode navegar livremente pelo site - (até um máximo de 3000 requisições diárias feitas pelo site)
    - deve ser usado os limits, counts e offsets na pagina home, e no modal de comics
    - perfil do personagem com suas informações
    - perfil do personagem deve ter botão para ver comics com o personagem
    - menu de navegação em cima com barra de busca
    - menu de navegação deve ter filtros(filtro se aplica aos personagens ja buscados na bara busca - nao usa requusição novamente)

## Next Project informations

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
