const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.emit('ultimo-ticket', ticketControl.ultimo);
    socket.emit('ultimos-tickets', ticketControl.ultimos4);
    socket.emit('cola-tickets', ticketControl.tickets.length);

    socket.on('siguiente-ticket', (payload, callback ) => {

        const siguente = ticketControl.siguienteTicket();
        callback(siguente);
        socket.broadcast.emit('cola-tickets', ticketControl.tickets.length);
            // notificar que hay un nuevo ticket pendiente

    });

    socket.on('atender-ticket', ({ escritorio }, callback ) => {

        

       if (!escritorio) {
           return callback({
               ok: false,
               msg: 'El escritorio es obligatorio'
           });
       }

       const ticket = ticketControl.atenderTicket( escritorio );
       if( !ticket ){
           callback({
               ok: false,
               msg: 'Ya no hay tickets pendientes'
           });
       }else{
           callback({
               ok: true,
               ticket
           });
       }
       socket.broadcast.emit('ultimos-tickets', ticketControl.ultimos4);
       socket.broadcast.emit('cola-tickets', ticketControl.tickets.length);
       socket.emit('cola-tickets', ticketControl.tickets.length);
    });

}



module.exports = {
    socketController
}

