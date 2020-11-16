const express = require('express')
const { request } = require('http')
const path = require('path')
const {v4} = require('uuid')
const app = express()

let CONTACTS = [
    {id: v4(), name: 'Vlad', value: 'yyy', marked: false}
]

app.use(express.json())

app.get('/api/contacts', (req, res) => {
    res.json(CONTACTS)
})

app.post('/api/contacts', (req, res) => {
    const contact = {...req.body, id: v4(), marked: false}
    CONTACTS.push(contact)
    res.status(201).json(contact)
    
})

app.delete('/api/contacts/:id', (req, res) => {
    CONTACTS = CONTACTS.filter(c => c.id !== req.params.id)
    res.json({message: 'Contact was successfully deleted'})
})

app.put('/api/contacts/:id', (req, res) => {
   const idx = CONTACTS.findIndex(c => c.id === req.params.id)
   CONTACTS[idx] = req.body
   res.json(CONTACTS[idx])
})



app.use(express.static(path.resolve(__dirname, 'client')))

app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(3000, () => console.log('start'))