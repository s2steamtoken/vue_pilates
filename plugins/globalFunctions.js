export default defineNuxtPlugin(() => {
    return {
        provide: {
            generateRandomString: (length) => {
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let result = '';
                const charactersLength = characters.length;
                for (let i = 0; i < length; i++) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
            },
            getImage: (image, size = 0) => {

                let image_str = image;

                if (size > 0) {
                    let image_arr = image.split("/");

                    image_arr[image_arr.length - 1] = "size_" + size + "/" + image_arr[image_arr.length - 1];
                    image_str = image_arr.join("/");
                }

                return image_str;
            },
            clearFilter: (data) => {

                let queryData = Object.assign({}, data);
                for (let key in queryData) {
                    if (queryData[key] == "") delete queryData[key];
                    if (typeof queryData[key] === 'object' && !Array.isArray(queryData[key]) && queryData[key] !== null) {
                        queryData[key] = JSON.stringify(queryData[key])
                    }
                }

                return queryData;

            },
            sendApi: async(url, body, method = 'POST', enctype = '') => {

                const $store = useNuxtApp()

                let headers = ['cookie'];

                let sendBody = Object.assign({}, body);
                sendBody.siteLang = $store.siteLang
                sendBody.segments = $store.segments

                if (enctype == "multipart/form-data") {

                    sendBody = body;
                    sendBody.append('siteLang', $store.siteLang);
                    sendBody.append('segments', $store.segments);

                } else {

                }

                let data = await $fetch(url, {
                    method: method,
                    body: sendBody,
                    headers: useRequestHeaders(headers)
                });

                if (data.token != undefined && data.token != "") {
                    // const tokenCookie = useCookie('APIToken', {
                    // 	maxAge: (30 * 24 * 60 * 60 * 1000)
                    // });
                    // tokenCookie.value = data.token
                    await $store.sessionUpdate({ token: data.token })

                }

                if (data.status == 501) {

                    console.log(data);

                    // const tokenCookie = useCookie('APIToken', {
                    // 	maxAge: (30 * 24 * 60 * 60 * 1000)
                    // });

                    const tokenData = await $store.$sendApi(`/api/login/getToken`, {
                        guest: true
                    });

                    if (tokenData.status == 200) {
                        // tokenCookie.value = tokenData.token
                        await $store.sessionUpdate({ token: tokenData.token })
                    }

                    sendBody.token = tokenData.token

                    data = await $fetch(url, {
                        method: method,
                        body: sendBody,
                        headers: useRequestHeaders(headers)
                    });

                    return data;

                } else {
                    return data;
                }

            }
        }
    }
})