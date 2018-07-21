function filledout(){
    count = 0;
    form = document.querySelectorAll(".form");
    if (document.getElementById('cCreator').checked || document.getElementById('cAbsorber').checked){
        for (i = 0; i < form[0].length; i++) {
            console.log(i, form[0].elements[i].value);
            if (form[0].elements[i].value !== ""){
                console.log("pissssss");
                count++;
                if (i==form[0].length - 3)
                {
                    var password = form[0].elements[i].value;
                }
                else if (i==(form[0].length - 2))
                {
                    var passwordConfirm = form[0].elements[i].value;
                }

            }
        }
    }
    if ((count + 1) == form[0].length && password == passwordConfirm){
        return true;
    }else{
        document.getElementById('filledout').innerHTML = "fill out the form pussy";
        return false;
    }
}
