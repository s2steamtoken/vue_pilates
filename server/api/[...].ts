export default defineEventHandler(async (event) => {
	let segments = [...event.node.req.url.split("/")];

	segments.shift();
	segments.shift();

	const sessions = event.context.session;

	const body = await readBody(event);
	const config = useRuntimeConfig();
    const headers = getRequestHeaders(event);
	let sendHeaders = {}

	let siteLang = "";
	let APIToken = (sessions.token != undefined && sessions.token != "") ? sessions.token : ""
	let sendBody;

	const formData = await readMultipartFormData(event);

	if(formData != undefined){

		let newFormData = new FormData();

		for(let i in formData){

			let file = formData[i];

			if(file.filename != undefined){
				newFormData.append("" + file.name + "[]", new Blob([file.data], { type: file.type }));
			}
			else {
				let value = file.data.toString()
				newFormData.append("" + file.name, value);
			}
		}

		siteLang = newFormData.get('siteLang') != undefined ? newFormData.get('siteLang') : ""
		newFormData.append('token', APIToken);

		// sendHeaders = {
		// 	"Content-type": "multipart/form-data"
		// }

		// console.log(formData)

		sendBody = newFormData

	}
	else {

		siteLang = body.siteLang != undefined ? body.siteLang : ""
	
		if(body.token == undefined){
			body.token = APIToken;
		}

		if(body.currency == undefined){
			body.currency = (sessions.currency != undefined && sessions.currency != "") ? sessions.currency : ""
		}

		sendBody = body
	}

	let fetchData = $fetch(`${config.apiBaseUrl}${siteLang}/api/${segments.join("/")}`, {
		method: 'POST',
		headers: sendHeaders,
		body: sendBody
	})

	return fetchData;

});