const link = "http://localhost:4000";
var socket = io.connect(link);
//DOM
var codebox = document.getElementById('codebox');
var synxid = document.getElementById('synxId').value;
console.log(synxid); 

socket.emit('join' , {
    synxid : synxid
});
      
function managerCode(){
    socket.emit('code',{
        code : codebox.value,
        synxid : synxid
    });
}

socket.on('code', function(data){
    codebox.value = data.code;
});

