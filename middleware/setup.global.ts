export default defineNuxtRouteMiddleware(async (to, from) => {
    
    const { session, refresh, update, reset } = await useSession()

    console.log('aaaa');
    const $store = useNuxtApp()
    $store.sessionUpdate = update;

    let reloadToken = false
    let langs = ["en", "am", "ru"];
    let siteLang = langs[0];
    let langUrl = "";

    let segments = to.path.split("/");
    for(let i in segments){
        if(segments[i] == ""){
            segments.splice(i, 1);
        }
    }

    if(segments[0] !== "admin" && segments[0] != "_nuxt" && segments[0] != "lib"){
        console.log("SEGMENTS " + segments[0]);

        if(segments[0] != "" && langs.includes(segments[0])){
            siteLang = segments[0];
            langUrl = segments[0] + "/";
            segments.shift();
        }

        $store.siteLang = siteLang
        $store.segments = segments;

        let sendSegments = segments.length ? segments.join("/") : ""

        let content = await $store.$sendApi('/api/content', {
            url: sendSegments,
            get: to.query,
        })
        
        if (content.status != undefined && content.status == 404) {
            throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
        }

        $store.globalContent = content

        let globalData = {
            menus: content.menu_list,
            contacts: content.contacts,
            translations: content.translations,
            lang_urls: content.lang_urls,
            site_lang: content.site_lang,
            langUrl: langUrl,
            website_url: content.website_url,
            currency: content.currency,
            currency_title: content.currency_title,
            fixed_menu: content.fixed_menu,
            map_url: content.map_url,
        };

        $store.globalData = globalData
    }

})