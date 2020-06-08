export default () => [
    {
        model: 'Cost',
        documents: [
            {
                cost: 5000,
                seat_cost: 100,
            },
        ],
    },
    {
        model: 'User',
        documents: [
            {
                name: 'Márcio Santos do Carmo',
                email: 'marcio.carmo@acad.pucrs.br',
                registration: '00000000',
            },
            {
                name: 'Márcio S. do Carmo',
                email: 'm.carmo@edu.pucrs.br',
                registration: '11111111',
            },
            {
                name: 'Phillip',
                email: 'phillip@outlook.com',
                registration: '22222222',
            },
            {
                name: 'Otávio Bonder',
                email: 'otavio.bonder@outlook.com',
                registration: '33333333',
            },
            {
                name: 'Otáaefvio Bonaefder',
                email: 'otaeafvio.boaeffender@outaeflook.com',
                registration: '44444444',
            },
        ],
    },
    {
        model: 'Resource',
        documents: [
            {
                name: 'Estante',
                type: 'furniture',
                cost: 500,
            },
            {
                name: 'Lixeira',
                type: 'furniture',
                cost: 50,
            },
            {
                name: 'Mesa',
                type: 'furniture',
                cost: 200,
            },
            {
                name: 'Macbook Pro',
                type: 'mobile_equipments',
                cost: 3500,
            },
            {
                name: 'Notebook Dell',
                type: 'mobile_equipments',
                cost: 2000,
            },
            {
                name: 'Notebook Samsung',
                type: 'mobile_equipments',
                cost: 1500,
            },
            {
                name: 'Projetor móvel',
                type: 'mobile_equipments',
                cost: 1200,
            },
            {
                name: 'Sala 301',
                type: 'physical_spaces',
                size: 50,
                seat_quantity: 25,
            },
            {
                name: 'Sala 201',
                type: 'physical_spaces',
                size: 40,
                seat_quantity: 20,
            },
            {
                name: 'Sala 101',
                type: 'physical_spaces',
                size: 60,
                seat_quantity: 30,
            },
        ],
    },
];
