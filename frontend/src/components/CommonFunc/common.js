export function setQDate(date){
    const qDate = new Date(date).getTime() / 1000;
    const currDate = new Date().getTime() / 1000;
    const difference = Math.abs(currDate - qDate);
    var date = "" ;
    if (difference < 60) {
        date = Math.floor(difference) + ' sec ago';
    } else if (difference < 3600 && difference > 60) {
        date = Math.floor(difference / 60) + ' mins ago';
    }else if (difference < 86400 && difference > 3600) {
        date = Math.floor(difference / 3600) + ' hrs ago';
    }else if (difference < 31536000 && difference > 86400) {
        date = Math.floor(difference / 86400) + ' days ago';
    }else if (difference > 31536000) {
        date = Math.floor(difference / 31536000) + ' years';
    }

    return (date);

}

export function checktoken(){
    if(!(localStorage.getItem('token'))){
        window.location.href = "/login"
    }
}