function filledout(){
    count = 0;
    form = document.querySelectorAll(".form");
    if (document.getElementById('cCreator').checked || document.getElementById('cAbsorber').checked){
        for (i = 0; i < form[0].length; i++) {
            // console.log(form[0].elements[i].value);
            if (form[0].elements[i].value !== ""){
                count++;
            }
        }
    }
    if ((count + 1) == form[0].length){
        return true;
    }else{
        document.getElementById('filledout').innerHTML = "fill out the form pussy";
        return false;
    }
}
