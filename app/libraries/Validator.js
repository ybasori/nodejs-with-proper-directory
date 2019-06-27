const db = require(`../libraries/Db.js`);

const uniqueness = async function(table, column, value, ignoreId=null, ignoreIdColumn=null){
    var algo = ""
    if(ignoreId!=null){
        algo = algo + ' AND ' + ignoreIdColumn + ' != "' + ignoreId + '"';
    }
    return await db.query('select * from '+table+' where '+column+'="'+value+'" '+algo+' limit 1');
}


module.exports={
    make: async function(body, rules){
        let error =0;
        let err_msg ={};
        for(var key in rules){
            var rule = rules[key];
            var label = (rule.label == null || rule.label == undefined || rule.label == "") ? key : rule.label ;

            var noRule = 0;
            for(var keyRule in rule.rule){

                if(keyRule == "required"){

                    if(rule.rule[keyRule]){
                        if(body[key] == null || body[key] == undefined || body[key] == ""){
                            if(noRule == 0){
                                err_msg[key] = [];
                            }
                            err_msg[key].push(`${label} is required.`);
                            noRule++;
                            error++;
                        }
                    }
                    else{
                        continue;
                    }

                }
                else if(keyRule=="unique"){

                    if(rule.rule[keyRule]){
                        var uniqueRule=rule.rule[keyRule].split(",");
                        var table = uniqueRule[0];
                        var column = uniqueRule[1];
                        var ignoreId = null;
                        var ignoreIdColumn = "id";
                        if(uniqueRule[2]!=undefined){
                            ignoreId = uniqueRule[2];
                        }
                        if(uniqueRule[3]!=undefined){
                            ignoreIdColumn = uniqueRule[3];
                        }
                        await uniqueness(table, column, body[key], ignoreId, ignoreIdColumn).then(function(res){
                            if(res[0]){
                                if(noRule == 0){
                                    err_msg[key] = [];
                                }
                                err_msg[key].push(`${label} is already in use.`);
                                noRule++;
                                error++;
                            }
                        });

                    }
                    else{
                        continue;
                    }
                    
                }
                else if(keyRule == "email"){
                    if(rule.rule[keyRule]){
                        var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

                        if(!re.test(body[key].toLowerCase().trim())){
                            if(noRule == 0){
                                err_msg[key] = [];
                            }
                            err_msg[key].push(`${label} is invalid.`);
                            noRule++;
                            error++;
                        }
                    }
                }
                else if(keyRule == "equalsTo"){
                    if(rule.rule[keyRule]){

                        var value2 = body[rule.rule[keyRule]];

                        var key2 = rule.rule[keyRule];

                        var label2 = (rules[key2].label == null || rules[key2].label == undefined || rules[key2].label == "") ? key2 : rules[key2].label ;

                        if(body[key] != value2){
                            if(noRule == 0){
                                err_msg[key] = [];
                            }


                            err_msg[key].push(`${label} must be match to ${label2}.`);
                            noRule++;
                            error++;
                        }
                    }
                }
                else{
                    continue;
                }

            }
        }
        return {
            fails: function(){
                if(error>0){
                    return true;
                }
                else{
                    return false;
                }
            },
            getMessages: function(){
                return err_msg;
            }
        }
    },
}