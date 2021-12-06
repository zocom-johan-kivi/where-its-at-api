const express = require('express');
const PORT = process.env.PORT || 5000;

const App = new express();

App.use(express.json());

App.get('/', (req, res) => {
    res.status(200).send('Where its at API by ZoCom. \nEndpoints avaible are /events and /orders.');
})

App.get('/events', (req, res) => {

    res.status(200).send(JSON.stringify({ events: [
        {
        name : "Lasse-Stefanz",
        price : 400,
        where : "Avicii arena",
        when : {
            date: "21 Mar",
            from : "20.00",
            to : "22:00"
            }
        },
        {
        name : "Pelle trubadur",
        price : 119,
        where : "Puben på hörnet",
        when : {
            date: "11 Apr",
            from : "21.00",
            to : "23:00"
            }
        },
        {
        name : "Kajsas kör",
        price : 0,
        where : "Götaplatsen",
        when : {
            date: "13 Dec",
            from : "15.00",
            to : "16:00"
            }
        },
        {
        name : "Klubb Untz",
        price : 150,
        where : "Mörka hörnet",
        when : {
            date: "4 Jul",
            from : "20.00",
            to : "05:00"
            }
        },
        {
        name : "Greats symfoniker",
        price : 300,
        where : "Kungliga operan",
        when : {
            date: "15 Nov",
            from : "18.00",
            to : "20:00"
            }
        }
    ] 
    }))
})

App.post('/orders', (req, res) => {

      let orderValue = req.body.tickets.reduce((acc, event) => acc + event.price*1, 0);
      let tickets = req.body.tickets.map(ticket => {

          let a = 'ABCDEFGHIJKLMNOPQRSTUVXYZ';
          let code = '';
          for(let i=0; i<5; i++ ){
            code += a[Math.floor(Math.random()*a.length)]
          }
        return { ...ticket, id: code }
      })
      let resp = { orderValue: orderValue, orderNumber: `WIA${Date.now()}L`, tickets: tickets };
      res.send(resp);
})


App.listen(PORT, () => {
    console.log('Server up n running.')
})