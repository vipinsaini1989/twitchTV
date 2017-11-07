let pagesName = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
var result = [];

function getURL(){
	let fetchIt=(type,channelName) => {
		let apiLink = `https://wind-bow.glitch.me/twitch-api/${type}/${channelName}`;
		return fetch(apiLink)
		.then(resp => resp.json())
		.then(function(data){
			return data;
		});
	};

pagesName.forEach(function(channelName){
	let channelData = fetchIt("channels",channelName);
	channelData.then(function(apiData){
		let channelInfo = {"name":apiData.display_name, "logo": apiData.logo, "url": apiData.url, "description": apiData.status};
		
		let channelStatus = fetchIt("streams",channelName);
		channelStatus.then(function(streamStatus){
			if (streamStatus.stream === null) {
				channelInfo.description = "Offline";
			}
		});
		result.push(channelInfo);
	});

});
}
getURL();

setTimeout(renderHTML,2000);

function renderHTML(){
	for(var i=0; i< pagesName.length ;i++){
		
		let displayicon = result[i].logo ? result[i].logo : "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F";

		let tr = document.createElement('tr');
		let td1 = document.createElement('td');
		let td2 = document.createElement('td');
		let td3 = document.createElement('td');
		let img = document.createElement('img');
		let link = document.createElement('a');
		link.setAttribute('href', result[i].url);
		link.setAttribute('target','_blank');
		let text = document.createTextNode(result[i].name);
		img.setAttribute('src', displayicon);
		let displayStaus = document.createTextNode(result[i].description)

		td1.appendChild(img);
		link.appendChild(text);
		td2.appendChild(link);
		td3.appendChild(displayStaus);

		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);

		document.querySelector('#tableData').append(tr);
		
	}
}

