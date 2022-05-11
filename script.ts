interface Veiculo {
    nome: string;
    placa: string;
    entrada: Date | string
};


(() =>{
    const $ = (query:string):HTMLInputElement | null => document.querySelector(query);
    const calcTempo = (mil: number) => {
        const min = Math.floor(mil / 60000);
        const seg = Math.floor(mil % 60000) / 1000;

        return `${min}:${seg}`;
    }
    const patio = () => {
        const ler = ():Veiculo[] => {
            return localStorage.patio ? 
            JSON.parse(localStorage.patio)
            :[];
        };
        const adicionar = (veiculo:Veiculo, salva?: boolean) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                            <td>
                                ${veiculo.nome}
                            </td>
                            <td>
                                ${veiculo.placa}
                            </td>
                            <td>
                                ${veiculo.entrada}
                            </td>
                            <td>
                                <button class="delete" data-placa="${veiculo.placa}">Excluir</button>
                            </td>
            `
            row.querySelector(".delete")?.addEventListener("click", function(){
                remover(this.dataset.placa)
            })
            $("#patio")?.appendChild(row)

            if(salva) salvar([...ler(), veiculo]);
        };
        const salvar = (veiculos:Veiculo[]) => {
            localStorage.setItem("patio", JSON.stringify(veiculos))
        };
        const remover = (placa:string) => {
            const {entrada, nome} = ler().find(veiculo => veiculo.placa === placa);
            const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());

            if(!confirm(`O veiculo ${nome} permaneceu por ${tempo}. Deseja encerrar?`)) return

            salvar(ler().filter(veiculo => veiculo.placa !== placa));
            render();
        };
        const render = () => {
            $("#patio").innerHTML = "";
            let patio = ler();

            if(patio.length){
                patio.forEach(veiculo => adicionar(veiculo))
            }
        };

        return {
            ler, adicionar, remover, salvar, render
        }
    }
    patio().render()
    $("#cadastrar")?.addEventListener("click", () =>{
        const nome = $("#nome")?.value;
        const placa = $("#placa")?.value;
        if(!nome || !placa){
            console.log("Os campos (nome e placa) devem ser preenchidos")
            alert("Os campos (nome e placa) devem ser preenchidos");
            return;
        }
        patio().adicionar({ nome, placa, entrada: new Date().toISOString() }, true)
    })
})()