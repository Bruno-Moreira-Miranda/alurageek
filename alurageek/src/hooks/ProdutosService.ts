import ProdutosService from "services/produtos-service";
import useHookfyService from "./utils/hookfyService";
const hooks = useHookfyService(new ProdutosService());

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