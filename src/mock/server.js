import { Server, JSONAPISerializer, Model, hasMany, belongsTo } from "miragejs";
import { cadastros, produtos } from "./data";

function populate(server) {
    produtos.forEach(data => {
        const copy = Object.assign({}, data);

        const categoriaName = data.categoria;
        const catModel = server.create("cat", { name: categoriaName });

        const finalData = Object.assign(copy, { categoria: catModel });

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
            this.get("/produto", (schema, req) => {
                return schema.all("produto");
            })

            this.get("/produto/:id", (schema, req) => {
                const id = req.params.id;
                if(!id) return false;

                const item = schema.find("produto", id);
                if(!item) return false;

                return item;
            })

            this.post("/produto", (schema, req) => {
                const produtoInfo = req.requestBody;
                
                if(!produtoInfo) return false;

               return schema.create("produto", produtoInfo) ? true : false;
            })

            this.patch("/produto/:id", (schema, req) => {
                const id = req.params.id;
                if(!id) return false;

                const atts = req.requestBody;
                if(!atts) return false;

                const item = schema.find("produto", id);
                if(!item) return false;

                item.update(atts);

                return true;
            })

            this.delete("/produto/:id", (schema, req) => {
                const id = req.params.id;
                if(!id) return false;

                const item = schema.find("produto", id);
                if(!item) return false;

                 item.destroy();

                return true; 
            })

            this.get("/produto/categoria", (schema, req) => {
                return schema.all("cat");
            })

            this.get("produto/categoria/:name", (schema, req) => {
                const name = req.params.name;
                if(!name) return false;

                return schema.findBy("cat", name);
            })

            this.post("/singup", (schema, req) => {
                const cadastro = req.requestBody;
                if(!cadastro) return false;

                schema.create("cadastro", cadastro);

                return true;
            })

            this.post("/login", (schema, req) => {
                const credencias = req.requestBody;
                if(!credencias) return false;

                return Boolean(schema.findBy("cadastro", credencias));
            })
        }
    })
}

export default serverInit;