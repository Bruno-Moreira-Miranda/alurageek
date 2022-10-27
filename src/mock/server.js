import { Server, Model, hasMany, belongsTo } from "miragejs";
import { cadastros, produtos } from "./data";

function handleFind(schema, model, id) {
    const isFindBy = /^\?.+=/.test(id);

    if (isFindBy) {
        return schema.findBy(model, getQueryParams(id));
    }
    else return schema.find(model, id);
}

function getQueryParams(query) {
    return query.substring(1, query.length)
        .split("&")
        .reduce((queryObj, stringEntry) => {
            const entryObj = [stringEntry.split("=")];
            const obj = Object.fromEntries(entryObj);

            Object.assign(query, obj);

            return queryObj;
        }, {});
}

function populate(server) {
    produtos.forEach(data => {
        const catModel =
            server.schema.findBy("cat", { name: data.categoria })
            ??
            server.create("cat", { name: data.categoria });
        catModel.createProduto(data)
    });

    cadastros.forEach(data => server.create("cadastro", data));
}

function serverInit() {
    new Server({
        models: {
            produto: Model,
            cadastro: Model,
            cat: Model.extend({
                produtos: hasMany("produto")
            })
        },

        seeds(server) {
            populate(server);
        },

        routes() {
            this.urlPrefix = "http://localhost:8080";

            this.get("/produtos", (schema, req) => {
                const produtosModels = schema.all("produto").models;
                const produtos = produtosModels.map(model => model.attrs);
                return produtos;
            })

            this.get("/produtos/:id", (schema, req) => {
                const id = req.params.id;
                if (!id) return false;

                const item = handleFind(schema, "produto", id);
                if (!item) return false;

                return item.attrs;
            })

            this.post("/produtos", (schema, req) => {
                const produtoInfo = req.requestBody;

                if (!produtoInfo) return false;

                return schema.create("produto", produtoInfo) ? true : false;
            })

            this.patch("/produtos/:id", (schema, req) => {
                const id = req.params.id;
                if (!id) return false;

                const atts = req.requestBody;
                if (!atts) return false;

                const item = handleFind(schema, "produto", id);
                if (!item) return false;

                item.update(atts);

                return true;
            })

            this.delete("/produtos/:id", (schema, req) => {
                const id = req.params.id;
                if (!id) return false;

                const item = handleFind(schema, "produto", id);
                if (!item) return false;

                item.destroy();

                return true;
            })

            this.get("/produtos/categoria", (schema, req) => {
                return schema.all("cat");
            })

            this.get("produtos/categoria/:name", (schema, req) => {
                const name = req.params.name;
                if (!name) return false;

                const item = schema.findBy("cat", { name });
                if (!item) return false;

                const produtosModels = item.produtos.models;
                const produtos = produtosModels.map(model => model.attrs);

                console.log(produtos)

                return produtos;
            })

            this.post("/singin", (schema, req) => {
                const cadastro = req.requestBody;
                if (!cadastro) return false;

                schema.create("cadastro", cadastro);

                return true;
            })

            this.post("/login", (schema, req) => {
                const credencias = req.requestBody;
                if (!credencias) return false;

                return Boolean(schema.findBy("cadastro", credencias));
            })

            this.post("/verify", (schema, req) => {
                const dados = req.requestBody;
                if (!dados) return false;

                return Boolean(schema.findBy("cadastro", { dados }));
            })
        }
    })
}

export default serverInit;