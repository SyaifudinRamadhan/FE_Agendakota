const config = {
    baseUrl: 'http://192.168.1.97:8000',
    blogUrl: 'https://dailyhotels.id/wp-json/wp/v2',
    primaryColor: '#CA0C64',
    colors: {
        primary: '#CA0C64',
        green: '#2ecc71',
        grey: '#ddd',
        red: '#e74c3c',
        redDark: '#c0392b',
        yellow: '#fcd840',
        text: '#193C58',
        purple: '#8e24aa',
        cyan: '#00bcd4',
        orange: '#f57c00'
    },
    orgTypeOptions: [
        {value: "pariwisata", label: "pariwisata"},
        {value: "daily activities",label: "daily activities"},
        {value: "tour", label: "tour"}
    ],
    interestEventOptions: [
        {value: "pariwisata", label: "pariwisata"},
        {value: "daily activities",label: "daily activities"},
        {value: "tour", label: "tour"}
    ]
}

module.exports = config;
