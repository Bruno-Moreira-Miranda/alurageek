import { Server, Model, hasMany, RestSerializer, belongsTo } from "miragejs";
import { cadastros, produtos } from "./data";

function handleFind(schema, model, id) {
    const isFindByProp = /^_.+=/.test(id);

    if (isFindByProp) {
        const { value, flag } = getQueryParams(id);
        const isSearchLike = flag === "_like";
        if (isSearchLike) return schema.where(model, item => {
            console.log(item)
            const entry = Object.entries(value);
            const match = entry.every(([key, value]) => new RegExp(`^${value}`).test(item[key]));
            return match;
        });
        return schema.findBy(model, value);
    }
    else return schema.find(model, id);
}

function getQueryParams(query) {
    return query.substring(1, query.length)
        .split("&")
        .reduce((queryObj, string) => {
            const [flaglessString, flag] = removeFlag(string);
            const keyValueEntry = [flaglessString.split("=")];
            const obj = Object.fromEntries(keyValueEntry);

            queryObj.value = obj;
            queryObj.flag = flag;

            return queryObj;
        }, { value: null, flag: null });
}

function removeFlag(string) {
    const match = string.match(/(?<!^)_.+(?==)/, "");
    const flag = match ? match[0] : null;
    return [string.replace(flag, ""), flag];
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
            produto: Model.extend({
                categoriaOwner: belongsTo("cat")
            }),
            cadastro: Model,
            cat: Model.extend({
                produtos: hasMany("produto")
            })
        },

        seeds(server) {
            populate(server);
        },

        serializers: {
            application: RestSerializer.extend({
                root: false,
                include: ["produtos"],
                embed: true,
                serializeIds: "never"
            })
        },

        routes() {
            this.urlPrefix = "http://localhost:8080"

            this.get("/produtos/:id", (schema, req) => {
                const id = req.params.id;
                if (!id) return false;

                const item = handleFind(schema, "produto", id);
                if (!item) return false;

                return item;
            })

            this.get("/produtos", (schema, req) => {
                const produtosModels = schema.all("produto").models;

                return produtosModels;
            })

            this.post("/produtos", (schema, req) => {
                const produtoInfo = JSON.parse(req.requestBody);
                if (!produtoInfo) return false;

                const { categoria } = produtoInfo;
                return schema
                    .findOrCreateBy("cat", { name: categoria })
                    .createProduto(produtoInfo) ? true : false;
            })

            this.patch("/produtos/:id", (schema, req) => {
                const id = req.params.id;
                if (!id) return false;

                const atts = JSON.parse(req.requestBody);
                if (!atts) return false;

                const item = handleFind(schema, "produto", id);
                if (!item) return false;

                if (atts.categoria !== item.categoria) {
                    const oldOwner = item.categoriaOwner;
                    item.categoriaOwner = schema.findOrCreateBy("cat", { name: atts.categoria });

                    item.save();

                    if (oldOwner.produtos.length === 0) oldOwner.destroy();
                }

                item.update(atts);

                return true;
            })

            this.delete("/produtos/:id", (schema, req) => {
                const id = req.params.id;
                if (!id) return false;

                const item = handleFind(schema, "produto", id);
                if (!item) return false;
                const { categoriaOwner } = item;

                item.destroy();
                if (categoriaOwner.produtos.length === 0) categoriaOwner.destroy();

                return true;
            })

            this.get("produtos/categoria/:name", (schema, req) => {
                const name = req.params.name;
                if (!name) return false;

                const item = schema.findBy("cat", { name });
                if (!item) return false;

                return item;
            })

            this.get("/produtos/categoria", (schema, req) => {
                console.log(this.db)
                console.log(schema.all("cat"));
                return schema.all("cat");
            })

            this.post("/singin", (schema, req) => {
                const cadastro = JSON.parse(req.requestBody);
                if (!cadastro) return false;

                return Boolean(schema.create("cadastro", cadastro));
            })

            this.post("/login", (schema, req) => {
                const credencias = JSON.parse(req.requestBody);
                if (!credencias) return false;

                return Boolean(schema.findBy("cadastro", credencias));
            })

            this.post("/verify", (schema, req) => {
                const dados = JSON.parse(req.requestBody);
                if (!dados) return false;

                return Boolean(schema.findBy("cadastro", { ...dados }));
            })
        }
    })
}

export default serverInit;