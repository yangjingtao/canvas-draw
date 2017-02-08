$(function(){
    var canvasBox=document.querySelector(".canvas-box");
    var canvasBoxW=canvasBox.offsetWidth;
    var canvasBoxH=canvasBox.offsetHeight;
    var canvas=document.querySelector("canvas");
    var cobj=canvas.getContext("2d");
    var copy=document.querySelector(".copy");
    canvas.width=canvasBoxW;
    canvas.height=canvasBoxH;

    var drawObj=new shape(canvas,copy,cobj);

    /*效果*/
    $(".main:eq(0) li").click(function(){
        var index=$(this).index();
        if(index==0){
            if(drawObj.history.length>0){
                var yes=confirm("是否保存");
                if(yes){
                    var url=canvas.toDataURL();
                    var newurl=url.replace("image/png","stream/octet")
                    location.href=newurl;
                }
                cobj.clearRect(0,0,canvasBoxW,canvasBoxH);
                drawObj.history=[];
            }
        }else if(index==1){
            var url=canvas.toDataURL();
            var newurl=url.replace("image/png","stream/octet")
            location.href=newurl;
        }else if(index==2){
            if(drawObj.history.length==0){
                cobj.clearRect(0,0,canvasBoxW,canvasBoxH);
                setTimeout(function(){
                    alert("已经是最后一步");
                },50)
            }else{
                if(drawObj.isback){
                    if(drawObj.history.length==1){
                        drawObj.history.pop();
                        cobj.clearRect(0, 0, canvas.width, canvas.height);
                    }else{
                        drawObj.history.pop();
                        cobj.putImageData(drawObj.history[drawObj.history.length-1],0,0);
                    }
                }else{
                    cobj.putImageData(drawObj.history.pop(),0,0);
                }

                drawObj.isback=false;
            }
        }else if(index==3){
            var yes=confirm("确认全部清空");
            if(yes){
                cobj.clearRect(0,0,canvasBoxW,canvasBoxH);
                drawObj.history=[];
            }
        }
    });

    $(".main:eq(1) li").click(function(){
        var index=$(this).index();
        if(index==3){
            var bianNum=prompt("请输入你所要绘制图形的边数",5);
            drawObj.bianNum=bianNum;
        }else if(index==4){
            var jiaoNum=prompt("请输入你要绘制的多角形",5);
            drawObj.jiaoNum=jiaoNum;
        }
        var fn=$(this).attr("data-role");
        if(fn!="penil"){
            drawObj.type=fn;
            drawObj.draw();
        }else{
            drawObj.penil();
        }
    });
    $(".main:eq(2) li").click(function(){
        var fn=$(this).attr("data-role");
            drawObj.style=fn;
            drawObj.draw();
    });
    $(".main:eq(3) li input").change(function(){
        drawObj[$(this).attr("data-role")]=$(this).val();
        drawObj.draw();
    });
    $(".main:eq(4) li").click(function(){
        var fn=$(this).attr("data-role");
        drawObj.linew=fn;
        drawObj.draw();
    });
    $(".main:eq(4) li input").change(function(){
        var fn=$(this).val();
        drawObj.linew=fn;
        drawObj.draw();
    });
    $(".main:eq(5) li").click(function(){
        drawObj.isshowEs=true;
        var xcObj=$(".earser");
        var fn=$(this).attr("data-role");
        xcObj.css({
            width:fn+"px",
            height:fn+"px",
        });
        drawObj.earsersize=fn;
        drawObj.earser(xcObj);
    });

});
