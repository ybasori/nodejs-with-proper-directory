const db = require(`../libraries/Db.js`);

const dt = require(`../libraries/Date.js`);

const Helper = require(`../libraries/Helper.js`);

const table_article = "articles";

module.exports={
    save: async function(data){
        data.created_at = dt.now();
        data.updated_at = dt.now();
        return await db.query(`INSERT INTO ${table_article} SET ?`, data);
    },
    getAll: async function(select, limit, offset){
        return await db.query(`SELECT ${select} FROM ${table_article} ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`);
    },
    getAllByUserId: async function(select, user_id, limit, offset){
        return await db.query(`SELECT ${select} FROM ${table_article} WHERE user_id = "${user_id}" ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`);
    },
    getById: async function(select, id){
        return await db.query(`SELECT ${select} FROM ${table_article} WHERE id="${id}" LIMIT 1`);
    },
    updateById: async function(data, id){
        data.updated_at = dt.now();
        return await db.query(`UPDATE ${table_article} SET ? WHERE id='${id}'`, data);

    },
    deleteById: async function(id){
        return await db.query(`DELETE FROM ${table_article} WHERE id='${id}'`);
    },
    getByIdAsync: async function(){
        return await db.query('select * from articles');
    },
    checkUserId: async function(id, user_id){
        return await db.query(`SELECT COUNT(*) FROM ${table_article} WHERE id = "${id}" AND user_id = "${user_id}"  LIMIT 1`);
    },
    getLastRow: async function(select){
        return await db.query(`SELECT ${select} FROM ${table_article} ORDER BY created_at DESC  LIMIT 1`);
    },
    getBySlug: async function(select, slug){
        return await db.query(`SELECT ${select} FROM ${table_article} WHERE slug="${slug}" LIMIT 1`);
    },
    datatable: async function(query, cond={}){
        var select = "";
        var offset = query.start;
        var limit = query.length;

        var condition = "";
        var k = 0;
        for(var key in cond){
            if(k!=0){
                condition = condition + " AND ";
            }
            condition = condition + key + " = '" + cond[key] +"'";
            k++
        }


        var sql_search="";
        var j=0;
        for(var i=0; i<query.columns.length; i++){
            if(query.columns[i].name.trim() != ""){
                if(i != 0){
                    select = select + ", ";
                }
                select = select + query.columns[i].name;
            }

            if(typeof query.search != "undefined"){
                if(query.search.value!=""){
                    if(query.columns[i].searchable == "true" && query.columns[i].name != "0" && query.columns[i].name != "4" ){
                        if(j==0){
                            sql_search = sql_search + " " + query.columns[i].name + " LIKE \"%" + query.search.value + "%\"";
                            j++;
                        }
                        else{
                            sql_search = sql_search + " OR " + query.columns[i].name + " LIKE \"%" + query.search.value + "%\"";
                        }
                    }
                }
            }

        }

        condition = condition + ((sql_search!="") ? (((condition!="")?" AND ":"") +  "(" + sql_search + ")") : "");

        condition = (condition!="") ? " WHERE " + condition: "" ;

        select = select.trim().split(",").filter(val=>val).join(",");
        if(select==""){
            select = "*";
        }

        var order = "";
        if(typeof query.order != "undefined"){
            for(var i=0; i<query.order.length; i++){
                if(query.order[i].column != 0){
                    var orderby = query.columns[query.order[i].column].name;
                    var odr = query.order[i].dir;
                    order = ((order == "") ? "" : ", ") + " " + orderby + " " + odr + " ";
                }
            }
        }

        order = (order.trim() == "") ? "" : "ORDER BY " + order;

        await db.query(`SELECT ${select} FROM ${table_article} ${condition} ${order} LIMIT ${limit} OFFSET ${offset}`).then(response=>{
            query.data = response;
        });

        await db.query(`SELECT COUNT(*) as total FROM ${table_article} ${condition}`).then(response=>{
            query.recordsTotal = response[0].total;
            query.recordsFiltered = response[0].total;
        });

        for(var i = 0; i<query.data.length; i++){
            if(typeof query.data[i].thumbnail != "undefined"){
                await Helper.imageCache(query.data[i].thumbnail, 100, 100).then(response=>{
                    query.data[i].thumbnail = response
                });
            }
        }
        return query;
    }
}