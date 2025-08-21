// Define Listing locally to avoid import issues
interface Listing {
    id: string;
    title: string;
    location: string;
    price: number;
    images: string[];
    url: string;
    type: string;
    area: number;
}

const baseListings: Listing[] = [
    {
        id: '1eXx4',
        title: 'Isolated T5 Villa, Santar�m',
        location: 'Uni�o das freguesias da cidade de Santar�m, Santar�m',
        price: 430000,
        area: 350,
        type: 'Villa',
        url: 'https://www.imovirtual.com/pt/anuncio/moradia-isolada-t5-venda-em-santarem-marvila-santa-iria-da-ribeira-ID1eXx4',
        images: [
            'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6ImRuZmRpeGZycGh4YjEtRUNPU1lTVEVNIiwidyI6W3siZm4iOiI2OW5scGE3ZWNxbTcxLUFQVCIsInMiOiIxNCIsInAiOiIxMCwtMTAiLCJhIjoiMCJ9XX0.Jk2NuPVhSLnSMl60AECyPVGDbLm2kiuBl6nVT2-vKmE/image;s=1000x700;q=80',
            'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6IjRrZmsyYnh0NDAwMDEtRUNPU1lTVEVNIiwidyI6W3siZm4iOiI2OW5scGE3ZWNxbTcxLUFQVCIsInMiOiIxNCIsInAiOiIxMCwtMTAiLCJhIjoiMCJ9XX0.CgpYFJtSFeHuV1rX87eZjOEJG-vttKAQ8kA-wsyqaO4/image;s=1000x700;q=80',
            'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6IjJ5NmwyeHR0OWRwZDEtQVBUIn0.Yb0frL-2uH1Y0TW3KO-ygvqnrOpBCm7okHDvopo_K3o/image;s=1000x700;q=90'
        ]
    },
    {
        id: '1dUPu',
        title: 'T1 with Parking & Storage',
        location: 'Mina de �gua, Amadora, Lisboa',
        price: 225000,
        area: 89,
        type: 'Apartment',
        url: 'https://www.imovirtual.com/pt/anuncio/t1-com-estacionamento-arrecadacao-para-venda-na-mina-de-agua-ID1dUPu',
        images: [
            'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6Inczc2wxdmpocXkxcTMtQVBUIn0.hSVx1CwMzkprZ4qN4y40wMEnBZKWM6ReFnCYFXv321o/image;s=1000x700;q=90', 'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6ImtiYjVneXl5eGwzMi1BUElQLVJFQUwiLCJ3IjpbeyJmbiI6IjlmMHIzcWZ2a3p6aDEtQVBUIn0seyJmbiI6ImU0eTg1emp2cWNwLUFQVCIsInMiOiIxNCIsInAiOiIxMCwtMTAiLCJhIjoiMCJ9XX0.Ffrf0N3qL_9xQ5tDk8t-FfD_P5zK1b8KkP_Oa4nNszA/image;s=1000x700;q=80',
            'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6IjQ5YzE1a2k0OTI0My1BUElQLVJFQUwiLCJ3IjpbeyJmbiI6IjlmMHIzcWZ2a3p6aDEtQVBUIn0seyJmbiI6ImU0eTg1emp2cWNwLUFQVCIsInMiOiIxNCIsInAiOiIxMCwtMTAiLCJhIjoiMCJ9XX0.9I1xXmY3iV5zO1uWn0-PjVq7V-M6vY-f6g1M6x-u9W0/image;s=1000x700;q=80'
        ]
    },
    {
        id: '1eRLW',
        title: 'Luxury T4 Apartment, Beachside',
        location: 'S�o F�lix da Marinha, Vila Nova de Gaia, Porto',
        price: 650000,
        area: 193,
        type: 'Apartment',
        url: 'https://www.imovirtual.com/pt/anuncio/para-comprar-apartamento-t4-de-luxo-e-ID1eRLW',
        images: [
            'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6InppaDU2N2M5dHcxNS1BUFQifQ.iQgAIc_eOPoh1SjNBPbsavMKi0hovAgMeJIDoFUML5Y/image;s=1000x700;q=90', 'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6InB0NWQweWVoenR4bjMtQVBUIn0.F6vJgq9z2w1i7D5v7hHq-g_Wn2B7bO6l-O5K7t5k2Zc/image;s=1000x700;q=90',
            'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6IjJpZmY3a2F3MWJqMS1BUElQLVJFQUwiLCJ3IjpbeyJmbiI6IjlmMHIzcWZ2a3p6aDEtQVBUIn0seyJmbiI6ImU0eTg1emp2cWNwLUFQVCIsInMiOiIxNCIsInAiOiIxMCwtMTAiLCJhIjoiMCJ9XX0.k2j4v5d3p2f1h9T-x9d6V_a9aM8a_A-n9L1g5xX-y5E/image;s=1000x700;q=80'
        ]
    },
    {
        id: '1f1Go',
        title: 'Spacious T2 Apartment, Benfica',
        location: 'S�o Domingos de Benfica, Lisboa',
        price: 620000,
        area: 124,
        type: 'Apartment',
        url: 'https://www.imovirtual.com/pt/anuncio/apartamento-t2-em-sao-domingos-de-benfica-perto-do-califa-ID1f1Go',
        images: [
            'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6Imd0cjVqM2N2dzB2My1BUElQLVJFQUwiLCJ3IjpbeyJmbiI6IjlmMHIzcWZ2a3p6aDEtQVBUIn0seyJmbiI6ImU0eTg1emp2cWNwLUFQVCIsInMiOiIxNCIsInAiOiIxMCwtMTAiLCJhIjoiMCJ9XX0.B6l1lU9hJg1h-J7o8P9_S_v5Q9l4H8zE_o9n1g5w7kM/image;s=1000x700;q=80', 'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6IjQ2dGpsOGM3aWlxbjEtQVBUIn0.5Z-lC3t6e8h2o-Z2p4a-Fp9n-I6n6L9x-X2w6G8v2Yg/image;s=1000x700;q=90', 'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6ImFnbXJqNWJ3NTJzMy1BUElQLVJFQUwiLCJ3IjpbeyJmbiI6IjlmMHIzcWZ2a3p6aDEtQVBUIn0seyJmbiI6ImU0eTg1emp2cWNwLUFQVCIsInMiOiIxNCIsInAiOiIxMCwtMTAiLCJhIjoiMCJ9XX0.s8hQ7l9-s9P6T5o8r-w1e_O9p2z-i9T5p9N3G-H7g9Y/image;s=1000x700;q=80'
        ]
    }
];

const additionalListings = Array.from({ length: 16 }, (_, i) => {
    const base = baseListings[i % 4];
    const multiplier = 1 + (i * 0.05);
    return {
        ...base,
        id: `${base.id}-${i + 1}`,
        title: `${base.title} (Variation ${i + 1})`,
        price: Math.round(base.price * multiplier),
        area: Math.round(base.area * multiplier),
        url: base.url,
        images: [...base.images].reverse()
    };
});

export const mockListings: Listing[] = [
    ...baseListings,
    ...additionalListings
];