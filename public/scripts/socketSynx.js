const link = "http://localhost:4000";
var socket = io.connect(link);
var synxId = document.getElementById('synxId').value;
console.log(synxId); 

socket.emit('join' , {
    synxId : synxId
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
        synxId : synxId
    });
}

function saveSynx(){
    //console.log('yes');
    socket.emit('save' , {
        synxId : synxId,
        code : editor.getValue()
    });   
}

socket.on('code', function(data){
    //console.log('recived!!1');
    editor.setValue(data.code);
    editor.setCursor(data.cursorPos);
});


