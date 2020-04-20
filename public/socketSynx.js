const link = "http://localhost:4000";
var socket = io.connect(link);

var synxid = document.getElementById('synxId').value;
console.log(synxid); 

socket.emit('join' , {
    synxid : synxid
});

var codebox1 = document.getElementById('codebox');

var editor = CodeMirror.fromTextArea(codebox1,{
    mode : 'text',
    theme: 'rubyblue',
    lineNumbers : true,
    autoCloseTags : true,
    autoCloseBrackets : true,
});
editor.setSize("100%", "100%");
//DOM
editor.on('inputRead',() => {
    managerCode();
})
function managerCode(){
    socket.emit('code',{
        code : editor.getValue(),
        cursorPos : editor.getCursor(),
        synxid : synxid
    });
}

socket.on('code', function(data){
    editor.setValue(data.code);
    editor.setCursor(data.cursorPos);
});


