// src/data/cars.js

export const carsData = {
    mc20: {
        name: "MC20",
        tagline: "The First of its Kind",
        // El boceto del MC20 es JPG, pero lo arreglaremos con CSS
        sketchImage: "/assets/images/coches/bocetosCoches/MC20_Boceto.png",
        colors: [
            { id: 'blu', name: 'Blu Infinito', hex: '#2563eb', image: '/assets/images/coches/cochesColoreados/MC20/MC20_Blue.png' },
            { id: 'nero', name: 'Nero Essenza', hex: '#000000', image: '/assets/images/coches/cochesColoreados/MC20/MC20_Black.png' },
            { id: 'rosso', name: 'Rosso Vincente', hex: '#b91c1c', image: '/assets/images/coches/cochesColoreados/MC20/MC20_Red.png' },
            { id: 'giallo', name: 'Giallo Genio', hex: '#facc15', image: '/assets/images/coches/cochesColoreados/MC20/MC20_Yellow.png' },
        ]
    },
    grecale: {
        name: "Grecale",
        tagline: "The Everyday Exceptional",
        sketchImage: "/assets/images/coches/bocetosCoches/Grecale_Boceto.png",
        colors: [
            // Solo pasaste el azul, así que solo ponemos este disponible
            { id: 'blu', name: 'Blu Intenso', hex: '#1e40af', image: '/assets/images/coches/cochesColoreados/Grecale/maseratiGrecale.png' },
        ]
    },
    ghibli: {
        name: "Ghibli",
        tagline: "You're not like everyone else",
        sketchImage: "/assets/images/coches/bocetosCoches/Ghibli_Boceto.png",
        colors: [
            { id: 'nero', name: 'Nero Ribelle', hex: '#000000', image: '/assets/images/coches/cochesColoreados/Ghibli/maseratiGhibli.png' },
        ]
    },
    grancabrio: {
        name: "GranCabrio",
        tagline: "The Spyder to the Grand Tourer",
        sketchImage: "/assets/images/coches/bocetosCoches/GranCabrio_Boceto.png",
        colors: [
            { id: 'grigio', name: 'Grigio', hex: '#6b7280', image: '/assets/images/coches/cochesColoreados/GranCabrio/maseratiGranCabrio.png' },
        ]
    },
};