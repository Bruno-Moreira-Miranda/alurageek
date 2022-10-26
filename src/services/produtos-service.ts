import { IProduto } from "interfaces/IProduto";
import ProdutosApiConnection from "./apis/produtos-api-connection";

class ProdutosService {
    private connection: ProdutosApiConnection;

    constructor() {
        this.connection = new ProdutosApiConnection();
    }

    async obterProduto(id: string): Promise<IProduto> {
        const response = await this.connection.get(id);
        const data = await response.json();

        return Array.isArray(data)
            ? this.desformartarProduto(data[0])
            : this.desformartarProduto(data);
    }

    async buscarProdutos(query: string) {
        const response = await this.connection.get(query);
        const data = await response.json();

        return data.map(this.desformartarProduto, this);
    }

    async obterTodosProdutos(): Promise<IProduto[]> {
        const response = await this.connection.get();
        const data = await response.json();

        return data.map(this.desformartarProduto, this);
    }

    async novoProduto(produto: IProduto): Promise<boolean> {
        const produtoFormatdo = this.formartarProduto(produto);
        const response = await this.connection.post(produtoFormatdo);

        return response.ok;
    }

    async removerProduto(id: string): Promise<boolean> {
        const response = await this.connection.delete(id);

        return response.ok;
    }

    async obterSecaoDeProduto(categoria: string): Promise<IProduto[]> {
        const categoriaFormatada = this.formartarNome(categoria);
        const response = await this.connection.get(`?categoria=${categoriaFormatada}`);
        const data = await response.json();

        return data.map(this.desformartarProduto, this);
    }

    async atualizarProduto(atts: Partial<IProduto>, id: string): Promise<boolean> {
        const attsFormatada = this.formartarProduto(atts);
        const response = await this.connection.patch(attsFormatada, id);

        return response.ok;
    }

    private formartarNome(nome: string) {
        return nome
            .trim()
            .replaceAll(/\s/g, "_")
            .toLocaleLowerCase();
    }

    private desformartarNome(nome: string) {
        return nome.replaceAll(/_/g, " ");
    }

    private formartarProduto(produto: any) {
        const copy: IProduto = Object.assign({}, produto);
        copy.categoria &&= this.formartarNome(copy.categoria);
        copy.nome &&= this.formartarNome(copy.nome);

        return copy;
    }

    private desformartarProduto(produto: any) {
        const copy: IProduto = Object.assign({}, produto);
        copy.categoria &&= this.desformartarNome(copy.categoria);
        copy.nome &&= this.desformartarNome(copy.nome);

        return copy;
    }

    async jaExisteProp(searchObj: Partial<Record<"categoria" | "nome", string>>) {
        const entrys = Object.entries(searchObj);
        const entrysExiste = await Promise.all(
            entrys.map(async ([prop, value]) => {
                const valueFormatado = this.formartarNome(value);
                const response = await this.connection.get(`?${prop}=${valueFormatado}`);
                const data = await response.json();
                const existe = Boolean(data.length);
                return [prop, existe];
            }));
        const resultado = Object.fromEntries(entrysExiste);
        return resultado;
    }
}

export default ProdutosService;