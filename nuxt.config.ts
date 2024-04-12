export default defineNuxtConfig({
    alias: {
        public: '/<rootDir>/public',
    },
    components: [
        '~/components',
    ],
    vite: {
        define: {
            "process.env.DEBUG": true,
        },
    },
    runtimeConfig: {
        apiBaseUrl: "",
    },
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            link: [
                // { rel: 'icon', type: 'image/x-icon', href: '/logoIcon.svg' },
                { rel: 'stylesheet', type: 'text/css', href: '/lib/bootstrap/css/bootstrap.css?5' },
                { rel: 'stylesheet', type: 'text/css', href: '/css/font.css?2' },
                { rel: 'stylesheet', type: 'text/css', href: '/css/main.css?13' },
                { rel: 'stylesheet', type: 'text/css', href: '/css/main1440.css?13' },
                { rel: 'stylesheet', type: 'text/css', href: '/css/main1024.css?13' },
                { rel: 'stylesheet', type: 'text/css', href: '/css/main768.css?13' },
                { rel: 'stylesheet', type: 'text/css', href: '/css/main500.css?14', },
                { rel: 'stylesheet', type: 'text/css', href: '/fontawesome/css/all.min.css', loading: "lazy" },
            ],
            meta: [
            ],
            script: [
                {
                    src: '/lib/bootstrap/bootstrap.bundle.js'
                },
            ],
        },
    },
    postcss: {
    },
    plugins: [
        '~/plugins/globalFunctions.js',
    ],
    modules: [
        'nuxt-swiper',
        // 'nuxt-primevue',
        '@nuxtjs/device',
        '@sidebase/nuxt-session',
        "@nuxt/image"
    ],
    swiper: {
    },
    session: {
        // Module is enabled
        isEnabled: true,
        session: {
          expiryInSeconds: 60 * 60 * 24 * 30,
          idLength: 64,
          // All session data is stored in a "sub-storage" that uses the `sessions` prefix
          storePrefix: 'sessions',
          // The session cookie same site policy is `lax`
          cookieSameSite: 'lax',
          // `Secure` attribute of session cookie is set to `true`
          cookieSecure: true,
          cookieHttpOnly: true,
          // In-memory storage is used (these are `unjs/unstorage` options)
          storageOptions: {
              driver: 'memory',
              options: {}
          },
          // The request-domain is strictly used for the cookie, no sub-domains allowed
          domain: false,
          // Sessions aren't pinned to the user's IP address
          ipPinning: false,
          // Expiration of the sessions are not reset to the original expiryInSeconds on every request
          rolling: false
        },
    }
})