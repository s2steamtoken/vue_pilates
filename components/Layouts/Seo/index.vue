<template>
</template>

<script lang="ts">
export default {
    props: ["content"],
    setup(props) {

        const title = props.content.title;
        const description = props.content.description;
        const keywords = props.content.keywords;
        const index_page = props.content.index_page;
        const follow = props.content.follow;
        const canonical = props.content.canonical;
        const og = props.content.og;
        let googlebot = "";
        let robots = "";

        if (index_page === 0 && follow === 0) {
            robots = "noindex, nofollow";
            googlebot = "noindex, nofollow";
        } else if (index_page === 1 && follow === 1) {
            robots = "index, follow";
            googlebot = "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";
        } else if (index_page === 0 && follow === 1) {
            robots = "noindex";
            googlebot = "noindex";
        } else if (index_page === 1 && follow === 0) {
            robots = "nofollow";
            googlebot = "nofollow";
        }

        let robots3 = robots;
        useSeoMeta({
            title,
            keywords: () => `${keywords}`,
            robots: () => `${robots}`,
            googlebot: () => `${googlebot}`,
            bingbot: () => `${googlebot}`,
            description: () => `${description}`,
            ogTitle: () => `${og.title}`,
            ogLocale: () => `${og.locale}`,
            ogType: () => `${og.type}`,
            ogSiteName: () => `${og.site_name}`,
            ogDescription: () => `${og.description}`,
            ogImage: () => `${og.image.src}`,
            ogImageWidth: () => `${og.image.width}`,
            ogImageHeight: () => `${og.image.height}`,
        });

        useHead({
            link: [
                {
                    rel: "canonical",
                    href: canonical,
                },
            ],
        });

        return { robots3 };
    },
};
</script>