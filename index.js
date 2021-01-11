'use strict';

const express = require('express')
const app = express()

app.use(express.urlencoded({
    extended: true
}))

app.use(express.text())

app.use(express.json())


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

const wecursiveHewwoify = (elts, keys) => {
    for (var key of keys) {
        try {
            elts[key] = hewwoify(elts[key])
        }
        catch {
            wecursiveHewwoify(elts[key], Object.keys(elts[key]))
        }
    }
}




app.post('/', (req, res) => {
    var result = ""
    for (const headerValue of req.headers["content-type"].split(";")) {
        switch(headerValue.trim()) {
        case "text/plain": //intuitive
            result = hewwoify(req.body) + '\n'
            break;
        case "application/x-www-form-urlencoded": //commandline friendly
            result = hewwoify((Object.keys(req.body)[0])) + '\n'
            break;
        case "application/json": //real
            wecursiveHewwoify(req.body, Object.keys(req.body))
            result = req.body
            break;
        default:
            break;
        }
    }
    if (result === "")
        result = "Request contained an empty payload or used an unsupported content-type header"
    res.send(result)     
})

app.get('/', (req, res) => {
    res.send('Use a POST request instead\n')
})

app.listen(3000, () => {
    console.log('wistenying on powt 3000 UwU')
})