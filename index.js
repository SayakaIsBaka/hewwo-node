'use strict';

const express = require('express')
const app = express()

app.use(express.urlencoded({
    extended: true
}))

const replacements = [{
        old: /r/g,
        new: "w",
    },
    {
        old: /l/g,
        new: "w",
    },
    {
        old: /R/g,
        new: "W",
    },
    {
        old: /L/g,
        new: "W",
    },
    {
        old: /([nN])([aeiou])/g,
        new: "$1y$2",
    },
    {
        old: /(N)([AEIOU])/g,
        new: "$1Y$2",
    },
    {
        old: /ove/g,
        new: "uv",
    }
]

const hewwoify = (string) => {
    for (const pair of replacements) {
        string = string.replace(pair.old, pair.new)
    }

    const kaomojis = ["(・`ω´・)", ";;w;;", "owo", "UwU", ">w<", "^w^"]
    string = string.replace(/\!+/g, " " + kaomojis[Math.floor(Math.random() * kaomojis.length)] + " ")

    return string
}

app.post('/', (req, res) => {
    const data = Object.keys(req.body)
    if (data.length > 0) {
        res.send(hewwoify(data[0]) + '\n')
    } else {
        res.send('You must send data!\n')
    }
})

app.get('/', (req, res) => {
    res.send('Use a POST request instead\n')
})

app.listen(3000, () => {
    console.log('wistenying on powt 3000 UwU')
})