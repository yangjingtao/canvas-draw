function shape(canvas,copy,cobj){
    this.canvas=canvas;
    this.cobj=cobj;
    this.copy=copy;
    this.width=canvas.width;
    this.height=canvas.height;
    this.type="line";
    this.style="stroke";
    this.fill="#000";
    this.bianNum=3;
    this.jiaoNum=5;
    this.border="#000";
    this.linew=1;
    this.history=[];
    this.isback=true;
    this.earsersize=30;
    this.isshowEs=true;
}
shape.prototype={
    init:function(){
       this.cobj.strokeStyle=this.border;
       this.cobj.fillStyle=this.fill;
        this.cobj.lineWidth=this.linew;
    },
    draw:function(){
        var that=this;
        that.copy.onmousedown=function(e){
            var startx=e.offsetX;
            var starty=e.offsetY;
            
            that.copy.onmousemove=function(e){
                that.isback=true;
                that.init();
                var endx=e.offsetX;
                var endy=e.offsetY;
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.history.length>0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0);
                }
                that[that.type](startx,starty,endx,endy);
            };
            that.copy.onmouseup=function(){
                that.copy.onmousemove=null;
                that.copy.onmouseup=null;
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
            }
        }
    },
    line:function(x,y,x1,y1){
        this.cobj.beginPath();
        this.cobj.moveTo(x,y);
        this.cobj.lineTo(x1,y1);
        this.cobj[this.style]();
    },
    rect:function(x,y,x1,y1){
        this.cobj.beginPath();
        this.cobj.rect(x,y,x1-x,y1-y);
        this.cobj[this.style]();
    },
    arc:function(x,y,x1,y1){
        this.cobj.beginPath();
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        this.cobj.arc(x,y,r,0,2*Math.PI);
        this.cobj[this.style]();
    },
    bian:function(x,y,x1,y1){
        this.cobj.beginPath();
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var angle=360/this.bianNum*Math.PI/180;
        for(var i=0 ; i<this.bianNum; i++){
            this.cobj.lineTo(Math.cos(i*angle)*r+x,Math.sin(i*angle)*r+y);
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    jiao:function(x,y,x1,y1){
        this.cobj.beginPath();
        var angle=360/(this.jiaoNum*2)*Math.PI/180;
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var r1=r/3;
        for(var i=0; i<this.jiaoNum*2 ;i++){
            if(i%2==0){
                this.cobj.lineTo(Math.cos(i*angle)*r+x,Math.sin(i*angle)*r+y);
            }else{
                this.cobj.lineTo(Math.cos(i*angle)*r1+x,Math.sin(i*angle)*r1+y);
            }
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    penil:function(){
        var that=this;
        that.copy.onmousedown=function(e){
            var startx=e.offsetX;
            var starty=e.offsetY;
            that.cobj.beginPath();
            that.cobj.moveTo(startx,starty);
            that.copy.onmousemove=function(e){
                that.init();
                var endx=e.offsetX;
                var endy=e.offsetY;
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.history.length>0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0);
                }
                that.cobj.lineTo(endx,endy);
                that.cobj.stroke();
            }
            that.copy.onmouseup=function(){
                that.copy.onmousemove=null;
                that.copy.onmouseup=null;
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
            }
        }
    },
    earser:function(xcObj){
        var that=this;
        that.copy.onmousemove=function(e){
            if(!that.isshowEs){
                return false;
            }
            var movex=e.offsetX;
            var movey=e.offsetY;
            var lefts=movex-that.earsersize/2;
            var tops=movey-that.earsersize/2;
            if(lefts<0){
                lefts=0;
            }
            if(lefts>that.width-that.earsersize){
                lefts=that.width-that.earsersize
            }
            if(tops<0){
                tops=0;
            }
            if(tops>that.width-that.earsersize){
                tops=that.width-that.earsersize
            }
            xcObj.css({
                width:that.earsersize+"px",
                height:that.earsersize+"px",
                position:"absolute",
                left:lefts+"px",
                top:tops+"px",
                display:"block"
            });
        };
        that.copy.onmousedown=function(e){
            var dx=e.offsetX;
            var dy=e.offsetY;
            that.copy.onmousemove=function(e){
                var movex=e.offsetX;
                var movey=e.offsetY;
                var lefts=movex;
                var tops=movey;
                if(lefts<0){
                    lefts=0;
                }
                if(lefts>that.width-that.earsersize){
                    lefts=that.width-that.earsersize
                }
                if(tops<0){
                    tops=0;
                }
                if(tops>that.height-that.earsersize){
                    tops=that.height-that.earsersize
                }
                xcObj.css({
                    width:that.earsersize+"px",
                    height:that.earsersize+"px",
                    position:"absolute",
                    left:lefts+"px",
                    top:tops+"px",
                    display:"block"
                });
                that.cobj.clearRect(movex,movey,that.earsersize,that.earsersize);
            };
            that.copy.onmouseup=function(e){
                that.history.push(that.cobj.getImageData(0,0,that.canvas.width,that.canvas.height));
                that.earser(xcObj);
                that.copy.onmouseup=null;
                that.copy.onmousemove=null;
                xcObj.css("display","none");
            }
        }
    },
    splitM:function(){
        var that=this;
        that.copy.onmousedown=function(e){
            var ox=e.offsetX;
            var oy=e.offsetY;
            that.copy.onmousemove=function(e){
                var mx=e.offsetX;
                var my=e.offsetY;
                that.cobj.rect(ox,oy,mx-ox,my-oy);
            }
        }
    }
};