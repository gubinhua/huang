var fs = require('fs');
var path = require('path');
var str = '';
var r1 = /^(.+)$/mg; //匹配换行
var writepath = __dirname+'\\all\\all.txt';//合并后文件所在的路径
(function run(dirpath){	
	var files = fs.readdirSync(dirpath);
	
	//依次读取文件
	for(var i=0,len=files.length; i<len; i++) {	
		console.log('正在读取文件...: '+files[i]);	
		var filecontent = fs.readFileSync(dirpath+'/'+files[i],'utf-8');
		//对内容进行格式化，确保保持文件原样输出
		var lines = filecontent.match(r1);
		console.log('已完成: ' +(i+1)+'/'+len+'\n');
		for(var j=0; j<lines.length; j++){
			str += lines[j]+'\r\n';
		} 		
	}
	console.log('全部读取完毕,共成功读取文件数: '+len+'\r\n');
	//先判断写入路径的文件是否存在，存在先删除，不存在则创建并写入内容
	//可以防止多次运行后，出现数据叠加
	if(fs.existsSync(writepath)){
		fs.unlink(writepath);
	}	
	//文件存入磁盘
	fs.appendFileSync(writepath, str, {encoding:'utf-8'});
	console.log('正在写入文件...: '+writepath+'\n');
	console.log('操作完毕！');
		
})(path.join(__dirname,'files'))
	
//run();

//将文件内容转化为二位数组
//@return 二维数组
function convertToArray(){
	var cc = fs.readFileSync(writepath,'utf-8');
	var rows = cc.split('\r\n');
	var arr = [];
	for(var k=0,len=rows.length-1; k<len; k++){
		var col = rows[k];
		var ll = col.length;
		col = col.split('  ').slice(1,ll);
		//字符型转化为浮点型，便于直接运算
		for(var n=0; n<col.length; n++){
			col[n] = parseFloat(col[n]);
		}
		arr[k] = col;
	}
	return arr;
}

console.log(convertToArray()[0][0]);







