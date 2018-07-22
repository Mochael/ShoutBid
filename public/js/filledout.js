function filledout(){
    count = 0;
    form = document.querySelectorAll(".form");
    if (document.getElementById('cCreator').checked || document.getElementById('cAbsorber').checked){
        for (i = 0; i < form[0].length; i++) {
            // console.log(i, form[0].elements[i].value);
            if (form[0].elements[i].value !== ""){
                count++;
                // if (i==form[0].length - 3)
                // {
                //     var password = form[0].elements[i].value;
                // }
                // else if (i==(form[0].length - 2))
                // {
                //     var passwordConfirm = form[0].elements[i].value;
                // }
                // if we are checking the condition of i equalling something AND
                // referencing i later on, cant we just do this? :

                // var password = form[0].elements[(form[0].length - 3)].value
                // var passwordConfirm = form[0].elements[(form[0].length - 2)].value;
            }
        }
    }
    if ((count + 1) == form[0].length){
      if (form[0].elements[(form[0].length - 3)].value == form[0].elements[(form[0].length - 2)].value) return true;
      else document.getElementById('filledout').innerHTML = "passwords dont match"; return false;
    }else document.getElementById('filledout').innerHTML = "fill out the form pussy"; return false;

    // i want to see if we can have the password match thing be live ?? like where
    // it says if they match or not BEFORE we press the submit button..
}
