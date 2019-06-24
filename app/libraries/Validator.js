module.exports={
    make: function(body, rules){
        let error =0;
        let err_msg ={};
        for(var key in rules){
            var rule = rules[key];
            var label = (rule.label == null || rule.label == undefined || rule.label == "") ? key : rule.label ;

            var noRule = 0;
            for(var keyRule in rule){

                switch (keyRule) {



                    case "required":
                        if(rule[keyRule]){
                            if(body[key] == null || body[key] == undefined || body[key] == ""){
                                if(noRule == 0){
                                    err_msg[key] = [];
                                }
                                err_msg[key].push(`${label} is required.`);
                                noRule++;
                                error++;
                            }
                        }
                    break;
                    default:
                        continue;
                    break;


                
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