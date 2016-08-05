var Lgl=function(){
	

	//常用判断函数
	this.isArray=function(arr){
		return Object.prototype.toString.call(arr)==='[object Array]';
	}
	this.isFunction=function(fn){
		return Object.prototype.toString.call(fn)==='[object Function]';
	}
	this.isObject=function (x) { return x === Object(x);
	}

	//深拷贝
	this.clone=function(src){
		var clone=src;
		 // 对于Date等引用类型的数据，需要考虑调用构造函数重新构造，直接赋值依然会有引用问题
		if(src instanceof Date){
			clone=new Date(src.parse());
			return clone;
		}
		if(this.isArray(src)){
			clone=[];
			for(var key in src){
				clone[key]=this.clone(src[key]);
			}
			return clone;

		}
		if(this.isObject(src)){
			clone={};
			for(var key in src){
				if(src.hasOwnProperty(key)){
					clone[key]=this.clone(src[key]);
				}
			}
			return clone;
		}
		//对于number,string,boolean,null,undefined
		return src;
	}

	//对数组去重
	this.uniqArray=function(arr){
		var obj={};
		for(var i=0,len=arr.length;i<len;i++){
			obj[arr[i]=true];
		}
		return Object.keys(obj);
	}

	//去除空白字符
	this.trim=function(str){
		return str.replace(/^\s+|\s+$/g,'');
	}

	//遍历数组
	this.each=function(arr,fn){
		for(var i=0,len=arr.length;i<len;i++){
			fn(arr[i],i);
		}
	}

	//判断是否为邮箱地址
	this.isEmail=function(str){
		 return emailStr.search(/^[a-z0-9]([-_\.]?[a-z0-9]+)*@([-_]?[a-z0-9]+)+[\.][a-z]{2,7}([\.][a-z]{2})?$/i) !== -1;
	}

	//判断是否为手机号
	this.isMobilePhone=function(phone){
		if(typeof(phone)=='number'){
			phone=String(phone);
		}
		  return phone.search(/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/) !== -1;
	}

	this.bubbleSort=function(arr){
		var i=0,j,d;
		len=arr.length;
		for(;i++;i<len){
			for(j=i+1;j<len;j++){
				if(arr[i]>arr[j]){
					d=arr[j];
					arr[j]=arr[i];
					arr[i]=d;
				}
			}
		}
		return arr;
	}

	//快排
	this.quickSort=function(arr){
		if(arr.length<=1){
			return arr;
		}
		var halfindex=Math.floor(arr.length/2);
		var halfvalue=arr[halfindex];
		var left=[],right=[];
		for(var i=0;i<arr.length;i++){
			if(arr[i]<arr[halfindex]){
				left.push(arr[i]);
			}
			else if(i==halfindex){
				continue;
			}
			else{
				right.push(arr[i]);
			}
		}
		return this.quickSort(left).concat([halfvalue],this.quickSort(right));
	},
	//css类操作
	//判断是否有某一类
	this.hasClass=function(element,classname){
		var name=element.className.match(/\S+/g)||[];
		if(name.indexOf(classname)!==-1){
			return true;
		}
		return false;
	}

	this.addClass=function(element,classname){
		if(!this.hasClass(element,classname)){
			element.className=this.trim(element.className+' '+classname);
		}
	}

	this.removeClass=function(element,classname){
		if(this.hasClass(element,classname)){
			element.className=this.trim(element.className.replace(classname,''));
		}
	}

	//获取相对浏览器的位置
	this.getPosition=function(element){
		var x=0;
		var y=0;
		var current=element;
		while(current!==null){
			x+=current.offsetLeft;
			y+=current.offsetTop;
			current=current.offsetParent;
		}
		var scrollLeft=document.body.scrollLeft+document.documentElement.scrollLeft;
		var scrollTop=document.body.scrollTop+document.documentElement.scrollTop;
		x-=scrollLeft;
		y-=scrollTop;
		return{
			x:x,
			y:y
		}
	}

	//通用事件监听
	this.addEvent=function(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}
		else {
			element.attachEvent('on'+type,function(){handler.call(element);});
		}
	}

	this.removeEvent=function(element,type,handler){
		if(element.removeEventListener){
			elment.removeEventListener(type,handler,false);
		}
		else{
			element.detachEvent('on'+type,handler);
		}
	}


	//cookie相关操作
	this.isValidCookie=function(){
		return (new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+\x24'))
        .test(cookieName);
	}

	this.setCookie=function(name,value,expiredays){
		if(!this.isValidCookie(name)){
			return;
		}
		var exdate={};
    	if (expiredays) {
        exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        var expires = ';expires=' + exdate.toUTCString();     // toGMTString is deprecated and should no longer be used, it's only there for backwards compatibility, use toUTCString() instead
    		}
    	document.cookie = name + '=' + encodeURIComponent(value) + expires;  
	}

	this.getCookie=function(name){
		if (!this.isValidCookieName(cookieName)) {
        return null;
    	}

	    var re = new RegExp(name + '=(.*?)($|;)');
	    return re.exec(document.cookie)[1] || null;
	}

	//ajax封装
	this.ajax=function(url,options){
		var xmlhttp;
		  if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {        //兼容 IE5 IE6
        xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }


    if (options.data) {
        var dataarr = [];
        for (var item in options.data) {
            dataarr.push(item + '=' + encodeURI(options.data[item]));
        }
        var data = dataarr.join('&');
    }

 
    if (!options.type) {
        options.type = 'GET';
    }
    options.type = options.type.toUpperCase();


    if (options.type === 'GET') {
        var myURL = '';
        if (options.data) {
            myURL = url + '?' + data;
        }
        else {
            myURL = url;
        }
        xmlhttp.open('GET', myURL, true);
        xmlhttp.send();
    }
    else if (options.type === 'POST') {
        xmlhttp.open('POST', url, true);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlhttp.send(data);
    }

  
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200) {
                if (options.onsuccess) {
                    options.onsuccess(xmlhttp.responseText, xmlhttp.responseXML);
                }
            }
            else {
                if (options.onfail) {
                    options.onfail();
                }
            }
        }
    }
	}

};
window.Lgl=new Lgl();