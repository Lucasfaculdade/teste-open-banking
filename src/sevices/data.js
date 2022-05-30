const DATA = [
    {
        email: "admin@admin.com",
        password: "abc123",
        fullname: "Adm Account",
        type: "Adm Teste",
        number: "47290539480",
        balance: 1000,
        isAdmin: true, 
        transactions: []
    },
    {
        email: "jeff2@gmail.com",
        password: "abc123",
        fullname: "Juan dela Cruz",
        type: "Cliente Teste",
        number: "47290539482",
        balance: 392830.22,
        isAdmin: false, 
        budget: [
            {
                title: "Tuition fee",
                amount: 12000
            },
            {
                title: "Food take out during the pandemic",
                amount: 4000
            }
        ], 
        transactions: [
            {
                title: "Fund transfer", 
                amount: 2000,
                type: "debit", 
                date: "October 1, 2021"
            }, 
            {
                title: "Withdraw", 
                amount: 10000, 
                type: "debit",
                date: "October 1, 2021"
            }
        ]
    },
    {
        email: "client@client.com",
        password: "abc123",
        fullname: "Cliente Teste",
        type: "Salvando dividas",
        number: "47290539486",
        balance: 1000,
        isAdmin: false, 
        transactions: []
    }
];

export default DATA;