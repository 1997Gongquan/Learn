var nodes;
window.onload=function(){
    var inpFile=document.querySelector('input[type=file]');
    inpFile.addEventListener('change',function(){
        var reader=new FileReader();
        reader.readAsText(this.files[0]);
        reader.onload=function(){
            nodes=getDictionary(this.result);
            document.write(nodes);
            
        }
    })
}



function getDictionary(s){
    var set=getSet(s);
    var total=parseFloat(set.total);
    var nodes=set.nodes;
    for(var i=0;i<nodes.length;i++){
        var node=nodes[i];
        node.percent=parseFloat(node.value)/total;
    }
    return nodes;
}
function getSet(s){
    var ch;
    var set=new Set();
    for(var i=0;i<s.length;i++){
        ch=s.charAt(i);
        set.add(new Node(ch));
    }
    delete s;
    delete ch;
    return set;

}
var Node=function(key){
    this.key=key;
    this.value=0;
}
// 数据内部的对象必须包含属性id
var Set = function () {
    this.nodes=new Array;
    this.len=0;
    //所有数的和
    this.total=0;
    this.add=function(node){
        for(var i=0;i<this.len;i++){
            if(this.nodes[i].key==node.key){
                this.nodes[i].value++;
                this.total++;
                return;
            }
        }
        this.nodes[this.len]=node;
        this.nodes[i].value++;
        this.len++;
    }

    this.get=function(key){
        for(var i=0;i<this.len;i++){
            if(this.nodes[i].key==key){
                return this.nodes[i].value;
            }
        }
        return null;
    }

}