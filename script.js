switch_=document.querySelector('input');


// Проверка наличия объекта в localStorage
if (JSON.parse(localStorage.getItem('theme')) == null) {
    let theme =  0;
    localStorage.setItem('theme', JSON.stringify(theme));
}



switch_.addEventListener('change',function(){
    if(switch_.checked){

        document.querySelector('#theme').innerHTML='Светлая тема';

        document.querySelector('.icn').src="images/icn_black.png";

        document.documentElement.style.setProperty('--header-bg-color', '#374151');
        document.documentElement.style.setProperty('--main-bg-color', '#444D5B');
        document.documentElement.style.setProperty('--body-bg-color', '#626262');


        document.documentElement.style.setProperty('--text-color', 'white');

        document.documentElement.style.setProperty('--spawn-button-color', '#1F2937');


        // Сохранение объекта в localStorage
        let theme = true;
        localStorage.setItem('theme', JSON.stringify(theme));
    }else{

        document.querySelector('#theme').innerHTML='Тёмная тема';

        document.querySelector('.icn').src="images/icn_white.png";

        document.documentElement.style.setProperty('--header-bg-color', '#C2C2C2');
        document.documentElement.style.setProperty('--main-bg-color', '#DBDBDB');
        document.documentElement.style.setProperty('--body-bg-color', '#white');


        document.documentElement.style.setProperty('--text-color', 'black');

        document.documentElement.style.setProperty('--spawn-button-color', '#C2C2C2');
        

        // Сохранение объекта в localStorage
        let theme =  false;
        localStorage.setItem('theme', JSON.stringify(theme));
    }
});


// Извлечение объекта из localStorage
const retrievedUser = JSON.parse(localStorage.getItem('theme'));

switch_.checked = retrievedUser;
const event = new Event('change', { bubbles: true });
switch_.dispatchEvent(event);