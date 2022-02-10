const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
const { v4: uuid } = require('uuid');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, '/views'))


let todo = [
    {
        id: uuid(),
        task: 'clean room',
        time: '10:30',
    },
    {
        id: uuid(),
        task: 'poopie',
        time: '11:00',
    },
    {
        id: uuid(),
        task: 'breakfast',
        time: '11:30',
    },
    {
        id: uuid(),
        task: 'study',
        time: '14:00',
    },
]

app.get('/todo', (req, res) => {
    res.render('tasks/home', { todo })
})


app.get('/todo/new', (req, res) => {
    res.render('tasks/new')
})

app.post('/todo', (req, res) => {
    const { task, time } = req.body;
    todo.push({ task, time, id: uuid() })
    res.redirect('/todo');
})

app.get('/todo/:id', (req, res) => {
    const { id } = req.params;
    const task = todo.find(c => c.id === id);
    res.render('tasks/show', { task })
})

app.get('/todo/:id/edit', (req, res) => {
    const { id } = req.params;
    const task = todo.find(c => c.id === id);
    res.render('tasks/edit', { task })
})

app.patch('/todo/:id', (req, res) => {
    const { id } = req.params;
    const newTask = req.body.task;
    const newTime = req.body.time;
    const foundTask = todo.find(c => c.id === id);
    foundTask.task = newTask;
    foundTask.time = newTime;
    res.redirect('/todo');
})

app.delete('/todo/:id', (req, res) => {
    const { id } = req.params;
    todo = todo.filter(c => c.id !== id);
    res.redirect('/todo');
})

app.listen(3000, () => {
    console.log("On Port 3000!")
})