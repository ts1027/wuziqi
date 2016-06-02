window.onload=function(){
	var white={};
	var black={};
	var flag=true;  //白子 先落
	var box=document.getElementById('box');
	var bq=document.querySelector('.white');
	var hq=document.querySelector('.black');
	var news=document.querySelector('#new');
	var now=document.querySelector('.nows');
	news.onclick=function(){
		location.reload();
	};
	bq.onclick=function(){
			bq.id='hot';
			hq.id='';
			flag=true;
			now.innerHTML="<span class='white'></span>";
			bq.onclick=hq.onclick=null;
	};
	hq.onclick=function(){
			hq.id='hot';
			bq.id='';
			flag=false;
			now.innerHTML="<span class='black'></span>";
			bq.onclick=hq.onclick=null;
	};
	(function(){
		for(var i=0;i<15;i++){
			for(var j=0;j<15;j++){
				var b=document.createElement('div');
				b.className='b';
				b.id=i+'_'+j;
				box.appendChild(b);
			}
		}
		for(var i=0;i<15;i++){
			var line1=document.createElement('div');
			line1.className='hh';
			line1.style.top=15+i*30+'px'
			box.appendChild(line1);
			var line2=document.createElement('div');
			line2.className='ss';
			line2.style.left=15+i*30+'px'
			box.appendChild(line2);
		}
	})();

	box.onclick=function(e){
		bq.onclick=hq.onclick=null;
		var b=e.target;
		if(b==this||white[b.id]||black[b.id]){return;};
		if(flag){
			b.className='b w';
			white[b.id]=true;
			if(check(white,b.id)){
				win.innerHTML="<span class='white'></span>";
				box.onclick=null;
			}
			now.innerHTML="<span class='black'></span>";
			flag=false;
		}else{
			b.className='b bl';
			black[b.id]=true;
			if(check(black,b.id)){
				win.innerHTML="<span class='black'></span>";
				box.onclick=null;
			}
			now.innerHTML="<span class='white'></span>";
			flag=true;
		}
	}
	function check(data,id){
		var posi=id.split('_');
		var x=parseInt(posi[0]);
		var y=parseInt(posi[1]);
		var a,b;
		var h=1,s=1,l=1,r=1;
		//横向判断
		a=x;b=y;while(data[a+'_'+(b+1)]){h++;b++;}
		a=x;b=y;while(data[a+'_'+(b-1)]){h++;b--;}
		if(h>=5){return true;};
		//纵向判断
		a=x;b=y;while(data[(a+1)+'_'+b]){s++;a++;}
		a=x;b=y;while(data[(a-1)+'_'+b]){s++;a--;}
		if(s>=5){return true;};
		//左上 右下判断
		a=x;b=y;while(data[(a-1)+'_'+(b-1)]){l++;a--;b--;}
		a=x;b=y;while(data[(a+1)+'_'+(b+1)]){l++;a++;b++;}
		if(l>=5){return true;};
		//右上 左下判断
		a=x;b=y;while(data[(a-1)+'_'+(b+1)]){r++;a--;b++;}
		a=x;b=y;while(data[(a+1)+'_'+(b-1)]){r++;a++;b--;}
		if(r>=5){return true;};

		return false;
	}
}