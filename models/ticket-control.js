const path = require('path');
const fs = require('fs');

class Tikect {
    constructor(numero, escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}


class TicketControl {

    constructor(){

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        this.init();

    }

    get toJson(){
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4        
        }
    }

    init(){
        const {hoy, tickets, ultimo, ultimos4} = require('../db/data.json');
        if(hoy === this.hoy){
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4;
        }else{
            // Es otro dia
            this.guardarDB();
        }
    }

    guardarDB(){
        const pathDB = path.join( __dirname, '../db/data.json');
        fs.writeFileSync(pathDB, JSON.stringify(this.toJson));
    }

    siguienteTicket(){
        this.ultimo += 1;
        const tikect = new Tikect(this.ultimo, null);
        this.tickets.push(tikect);

        this.guardarDB();
        return 'Ticket '+ tikect.numero;
    }

    atenderTicket(escritorio){
        // No hay tickets
        if(this.tickets.length === 0){
            return null;
        }

        const ticket =  this.tickets.shift() //this.tickets[0]; obtenermos y borrmos
        ticket.escritorio = escritorio;

        this.ultimos4.unshift(ticket);

        if(this.ultimos4.length > 4){
            this.ultimos4.splice(-1,1);
        }

        this.guardarDB();
        return ticket;

    }

}

module.exports = TicketControl;