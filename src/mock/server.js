import { Server, JSONAPISerializer, Model, hasMany, belongsTo } from "miragejs";
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
        const copy = Object.assign({}, data);

        const categoriaName = data.categoria;
        const categoria = server.schema.findOrCreateBy("cat", { name: categoriaName });

        const finalData = Object.assign(copy, { categoria });

        server.create("produto", finalData);
    });

    cadastros.forEach(data => server.create("cadastro", data));
}

function serverInit() {
    new Server({
        models: {
            produto: Model.extend({
                categoria: belongsTo("cat")
            }),
            cadastro: Model,
            cat: Model.extend({
                produtos: hasMany("produto")
            })
        },

        serializers: {
            application: JSONAPISerializer
        },

        seeds(server) {
            populate(server);
        },

        routes() {
            this.urlPrefix = "http://localhost:8080";

            this.get("/produtos", (schema, req) => {
                return schema.all("produto");
            })

            this.get("/produtos/:id", (schema, req) => {
                const id = req.params.id;
                if (!id) return false;

                const item = handleFind(schema, "produto", id);
                if (!item) return false;

                return item;
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
                if(!item) return false;

                return item.produtos;
            })

            this.post("/singup", (schema, req) => {
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
        }
    })
}

export default serverInit;