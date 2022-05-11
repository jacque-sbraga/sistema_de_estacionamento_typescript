;
(() => {
    var _a;
    const $ = (query) => document.querySelector(query);
    const calcTempo = (mil) => {
        const min = Math.floor(mil / 60000);
        const seg = Math.floor(mil % 60000) / 1000;
        return `${min}:${seg}`;
    };
    const patio = () => {
        const ler = () => {
            return localStorage.patio ?
                JSON.parse(localStorage.patio)
                : [];
        };
        const adicionar = (veiculo, salva) => {
            var _a, _b;
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
            `;
            (_a = row.querySelector(".delete")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                remover(this.dataset.placa);
            });
            (_b = $("#patio")) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            if (salva)
                salvar([...ler(), veiculo]);
        };
        const salvar = (veiculos) => {
            localStorage.setItem("patio", JSON.stringify(veiculos));
        };
        const remover = (placa) => {
            const { entrada, nome } = ler().find(veiculo => veiculo.placa === placa);
            const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());
            if (!confirm(`O veiculo ${nome} permaneceu por ${tempo}. Deseja encerrar?`))
                return;
            salvar(ler().filter(veiculo => veiculo.placa !== placa));
            render();
        };
        const render = () => {
            $("#patio").innerHTML = "";
            let patio = ler();
            if (patio.length) {
                patio.forEach(veiculo => adicionar(veiculo));
            }
        };
        return {
            ler, adicionar, remover, salvar, render
        };
    };
    patio().render();
    (_a = $("#cadastrar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        var _a, _b;
        const nome = (_a = $("#nome")) === null || _a === void 0 ? void 0 : _a.value;
        const placa = (_b = $("#placa")) === null || _b === void 0 ? void 0 : _b.value;
        if (!nome || !placa) {
            console.log("Os campos (nome e placa) devem ser preenchidos");
            alert("Os campos (nome e placa) devem ser preenchidos");
            return;
        }
        patio().adicionar({ nome, placa, entrada: new Date().toISOString() }, true);
    });
})();
