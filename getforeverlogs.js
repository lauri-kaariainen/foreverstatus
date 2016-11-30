"use strict";
const execSync = require('child_process').execSync; 


function getForeverStatuses(){
	return getLogNames()
				.map((log)=>({
					"name":log.name,
					"status":mapLogStatus(log.path)}));
	
	function mapLogStatus(path){
		try{
			return isEverythingOk( 
							execSync(
								'grep -i "error\\|except" '+
								path)
									.toString())
		}
		catch(e){
			//this means grep didn't find anything
			if(e.status === 1){
				return true;
			}
			else throw e;
		}
			
	
		function isEverythingOk(stdout){
			if(!stdout)
				return true;
			let lastErrorLine = stdout
									.trim()
									.split("\n")
									.pop();
			//console.log(lastErrorLine);
			if(lastErrorLine.match("error: Script restart attempt"))
				return true;
			else
				return false;
			
		}
	}
	
	function getLogNames(){
		//works with forever --version v0.11.1 
		let stdout = execSync('forever logs').toString();
		let arrOfLogs = stdout
						.trim() 
						//remove colors
						.replace(/\u001b/ig,"")
						.replace(/\[\d+m/gi,"")
						.split('\n')
						//remove unneeded titles
						.slice(2)
						//get only name and path from line
						.map((line)=>(
							{"name":line.split(/\s+/)[2],
							"path":line.split(/\s+/)[3]}))
						//remove possible foldername from logs
						.map((obj)=>(
							{"name":obj.name.replace(/.+\//g,""),
							"path":obj.path}))
		return arrOfLogs
	}
	
			
}  
module.exports = getForeverStatuses;