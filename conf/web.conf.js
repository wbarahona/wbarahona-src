//
// All web related configurations will go here
// ---------------------------------------------------------------------------------------------

module.exports = {
    site: {
        seo: {
            author: 'Willmer Barahona',
            base: '/',
            charset: 'UTF-8',
            description: 'This is a webpage for better reading conveniece for the person interested on Willmer professional skills',
            title: 'Willmer Barahona - Web Developer',
            url: 'http://wbarahona.github.io'
        },
        business: {
            companyname: 'Your Company',
            companyalias: 'Lorem Ipsum dolor sit amet',
            catchphrase: ' Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
            contact: [
                {
                    title: 'Web Developer',
                    email: 'wbarahona@live.com',
                    phone: '+50431729599',
                    name: 'Willmer Barahona'
                }
            ],
            logo: {
                svg: 'logo.svg',
                png: 'logo.png'
            }
        },
        authkeys: {
            facebookapps: [
                {appid: '',appsecret: '', clientToken: ''},
                {appid: '',appsecret: '', clientToken: ''}
            ],
            twitterapps: '',
            google: {
                analytics: 'UA-45891459-3',
                public: {
                    apikey: ''
                },
                oauth: [
                    {clientid: '', emailaddress: '', clientsecret: ''},
                    {clientid: '', emailaddress: '', clientsecret: ''}
                ]
            }
        },
        regional: {
            language: 'en',
            location: '',
            address: [
                        'Colonia Montefresco, 31 Calle, 14 Avenida A, 2da casa color azul, San Pedro Sula, Cortes'
                     ],
            coordinates: []
        },
        menu: [
                {title: 'Contact', url: '#contact', icon: 'compass'},
                {title: 'Professional Experience', url: '#professional', icon: 'briefcase'},
                {title: 'Education', url: '#education', icon: 'mortar-board'},
                {title: 'Projects', url: '#projects', icon: 'cubes'},
                {title: 'Languages', url: '#languages', icon: 'language'},
                {title: 'Skills', url: '#skills', icon: 'pie-chart'},
                {title: 'Hobbies', url: '#hobbies', icon: 'soccer-ball-o'}
        ],
        socialurl: {
            facebook: 'https://www.facebook.com/wbarahona',
            twitter: 'https://www.twitter.com/wubarahona',
            codepen: 'http://codepen.io/wbarahona/',
            github: 'https://github.com/wbarahona',
            youtube: ''
        }
    },
    data: {}
};
