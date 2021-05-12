export const navigation = [
    {
        text: 'Inicio',
        path: '/',
        icon: 'home'
    },
    {
        text: 'Menu',
        icon: 'folder',
        items:[
            {
                text: 'Pessoa',
                icon: 'folder',
                items:[
                    {
                        text: 'Cadastrar',
                        icon: 'add',
                        path: '/formulario_pessoa'
                    },
                    {
                        text: 'Listar',
                        icon: 'detailslayout',
                        path: '/lista_pessoa'
                    }
                ]
            },
            {
                text: 'Cartão',
                icon: 'folder',
                items:[
                    {
                        text: 'Cadastrar',
                        icon: 'add',
                        path: '/formulario_cartao'
                    },
                    {
                        text: 'Listar',
                        icon: 'detailslayout',
                        path: '/lista_cartao'
                    }
                ]
            },
            {
                text: 'Pessoa Cartão',
                icon: 'folder',
                items:[
                    {
                        text: 'Cadastrar',
                        icon: 'add',
                        path: '/formulario_pessoa_cartao'
                    },
                    {
                        text: 'Listar',
                        icon: 'detailslayout',
                        path: '/lista_pessoa_cartao'
                    }
                ]
            },
            {
                text: 'LOGS',
                icon: 'folder',
                items:[
                    {
                        text: 'Logs',
                        icon: 'detailslayout',
                        path: '/logs'
                    }
                ]
            }
        ],
        
    }
];
