const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Ustawienia CORS
const corsOptions = {
    origin: '*', // Pozwala na dostęp z dowolnej domeny
    methods: 'GET,POST,PUT,DELETE', // Określa, które metody są dozwolone
  };

app.use(cors(corsOptions));
app.use(express.json());

// Tymczasowe dane w pamięci
let events = [
    { id: 1, title: "Spotkanie biznesowe", description: "Omówienie strategii", date: "2024-12-15" },
    { id: 2, title: "Warsztaty React", description: "Tworzenie aplikacji front-endowych", date: "2024-12-20" }
];

// Trasa GET: Pobieranie wydarzeń
app.get('/api/events', (req, res) => {
    res.json(events);
});

app.get('/', (req, res) => {
    res.send('Backend działa poprawnie!');
});


// Trasa POST: Dodawanie nowego wydarzenia
app.post('/api/events', (req, res) => {
    const { title, description, date } = req.body;
    console.log("Otrzymane dane:", req.body); // Dodaj logowanie

    if (!title || !date) {
        return res.status(400).json({ error: "Tytuł i data są wymagane" });
    }

    const newEvent = { id: events.length + 1, title, description, date };
    events.push(newEvent);
    res.status(201).json(newEvent);
});

// Edycja wydarzenia
app.put('/api/events/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, date } = req.body;

    const eventIndex = events.findIndex(event => event.id === parseInt(id));
    if (eventIndex === -1) {
        return res.status(404).json({ error: "Wydarzenie nie znalezione" });
    }

    // Edytowanie wydarzenia
    events[eventIndex] = { id: parseInt(id), title, description, date };

    res.status(200).json(events[eventIndex]);
});


app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});
