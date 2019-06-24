module.exports = {
    now: function(){
        let diff_hr=0;
        let dt = new Date(new Date().getTime()+diff_hr);

        let dtz= dt.getFullYear()+"-"
                +(((dt.getMonth()+1)<10)?"0"+(dt.getMonth()+1):(dt.getMonth()+1))+"-"
                +(((dt.getDate()+1)<10)?"0"+(dt.getDate()):(dt.getDate()))+" "
                +(((dt.getHours())<10)?"0"+(dt.getHours()):(dt.getHours()))+":"
                +(((dt.getMinutes())<10)?"0"+(dt.getMinutes()):(dt.getMinutes()))+":"
                +(((dt.getSeconds())<10)?"0"+(dt.getSeconds()):(dt.getSeconds()));

        return dtz;

    }
}