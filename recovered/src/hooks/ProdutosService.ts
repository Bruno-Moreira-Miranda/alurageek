import ProdutosService from "services/produtos-service";
import hookfyService from "../utils/hookfyService";
const hooks = hookfyService(new ProdutosService());

const {
    useObterProduto,
    useBuscarProdutos,
    useObterTodosProdutos,
    useNovoProduto,
    useRemoverProduto,
    useObterSecaoDeProduto,
    useAtualizarProduto,
    useJaExisteProp
} = hooks;

export {
    useObterProduto,
    useBuscarProdutos,
    useObterTodosProdutos,
    useNovoProduto,
    useRemoverProduto,
    useObterSecaoDeProduto,
    useAtualizarProduto,
    useJaExisteProp
};