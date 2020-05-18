
const btnMine = document.querySelector(".mine");
const getTrans = document.querySelector(".getTrans");


const socket = io.connect('http://localhost:5000');
/*
btnMine.addEventListener('click', () => {



    axios({
        method: 'post',
        url: 'http://localhost:5000/transaction',
        data: {
          amount: 1000,
          sender: 'Sergio',
          recipient: 'Rina'
        }
      }).then(data => {
        console.log(data)
    })
})

getTrans.addEventListener('click', () => {

})

*/



//Message from server
//Aquí podría ser un buen lugar para minar. Ya veremos
//Cuando haya 10 transacciones, se envía la opción de minar a uno de los mineros que estén conecados
socket.on('message', message => {
    console.log(message);

});

/*

socket.on('minar', message => {


        axios.get('http://localhost:5000/getPendingTransactions')
        .then(data => {
            console.log(data)
            
        })
        //Una vez haya 10 transacciones, mediante sockets-servidor se envía aquí el mensaje. Entonces, se hace un post a la ruta minería.
        console.log(message);


});*/