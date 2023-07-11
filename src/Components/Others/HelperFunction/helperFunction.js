export const emailValidation = ( data, setValidity ) => {
    return setTimeout(() => {
        if (data.length){
            const check1 = data.indexOf('@');
            const check2 = data.indexOf('.com');
            if (check1 > 0 && check2 > 0){
                console.log(data.slice(check1+1, check2));
                data.slice(check1+1, check2) ? setValidity(true) : setValidity(false);
            }
            else {
                setValidity(false);
            }
        }
    }, 1200);
}