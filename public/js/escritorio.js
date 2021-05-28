//Referencias HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams(window.location.search);

if( !searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerHTML = escritorio;

divAlerta.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});

socket.on('cola-tickets', (payload) => {
    
    if(!payload){
        divAlerta.style.display = ''
    }else{
        lblPendientes.innerHTML = payload;
    }
   // lblNuevoTicket.innerHTML = "Ultimo ticket " + payload;
});

btnAtender.addEventListener( 'click', () => {


    socket.emit( 'atender-ticket', {escritorio}, ( {ok, ticket, msg} ) => {
        if(!ok){
            lblTicket.innerHTML = 'Nadie.';
            return divAlerta.style.display = '';
        }
        
        lblTicket.innerHTML = 'Ticket ' + ticket.numero;
    });

});