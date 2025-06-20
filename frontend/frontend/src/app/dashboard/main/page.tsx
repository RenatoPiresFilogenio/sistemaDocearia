import style from "./page.module.scss"

export default function Main(){
    return(
        <div>
           <main className={style.intro}>
            <h2>Bem-vindo ao CandyTrack 🍭</h2>
            <p>
                Aqui você controla seus doces, seus lucros e o seu tempo.<br />
                Nosso sistema foi criado para ajudar doceiras, confeiteiros e pequenos empreendedores a gerenciar seus produtos, ingredientes e custos de forma simples, rápida e bonita.
            </p>
            <p>
                Cadastre seus produtos, acompanhe o custo de cada receita e veja seus resultados de forma clara — tudo em um só lugar.
            </p>
            <p>
                Comece agora e adoce a sua gestão! 🍬
            </p>
            </main>
        </div>
    );
}