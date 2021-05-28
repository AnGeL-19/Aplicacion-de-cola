
//Referencias html
const lblTicket1 = document.querySelector('#lblTicket1');
const lblEscritorio1 = document.querySelector('#lblEscritorio1');

const lblTicket2 = document.querySelector('#lblTicket2');
const lblEscritorio2 = document.querySelector('#lblEscritorio2');

const lblTicket3 = document.querySelector('#lblTicket3');
const lblEscritorio3 = document.querySelector('#lblEscritorio3');

const lblTicket4 = document.querySelector('#lblTicket4');
const lblEscritorio4 = document.querySelector('#lblEscritorio4');


const socket = io();

socket.on('ultimos-tickets', (payload) => {

    const audio = new Audio('./audio/new-ticket.mp3');
    audio.play();

    const [t1, t2, t3, t4] = payload;

    if(t1){
        lblTicket1.innerHTML = 'Ticket ' + t1.numero;
        lblEscritorio1.innerHTML = t1.escritorio;
    }else{
        lblTicket1.innerHTML = 'No hay Ticket';
        lblEscritorio1.innerHTML = 'No escritorio';
    }

    if(t2){
        
        lblTicket2.innerHTML = 'Ticket ' + t2.numero;
        lblEscritorio2.innerHTML = t2.escritorio;
        
    }else{
        lblTicket2.innerHTML = 'No hay Ticket';
        lblEscritorio2.innerHTML = 'No escritorio';
    }
    if(t2){
        
        lblTicket3.innerHTML = 'Ticket ' + t3.numero;
        lblEscritorio3.innerHTML = t3.escritorio;
        
    }else{
        lblTicket3.innerHTML = 'No hay Ticket';
        lblEscritorio3.innerHTML = 'No escritorio';
    }
    if(t2){
        
        lblTicket4.innerHTML = 'Ticket ' + t4.numero;
        lblEscritorio4.innerHTML = t4.escritorio;
        
    }else{
        lblTicket4.innerHTML = 'No hay Ticket';
        lblEscritorio4.innerHTML = 'No escritorio';
    }

})