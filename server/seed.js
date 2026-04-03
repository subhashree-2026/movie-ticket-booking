import Movie from "./models/Movie.js";

const movies = [
  {
    title: "Interstellar",
    description:
      "A group of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. A visually stunning and emotionally gripping sci-fi masterpiece.",
    genre: ["Sci-Fi", "Drama", "Adventure"],
    duration: 169,
    rating: 8.7,
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    banner: "https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK1DVfjko.jpg",
    releaseDate: "2014-11-07",
    language: "English",
    showtimes: [
      { date: "2026-04-05", time: "10:00 AM", hall: "IMAX 1", price: 350, totalSeats: 60, bookedSeats: [] },
      { date: "2026-04-05", time: "02:00 PM", hall: "Hall 2", price: 250, totalSeats: 60, bookedSeats: [] },
      { date: "2026-04-05", time: "06:30 PM", hall: "IMAX 1", price: 400, totalSeats: 60, bookedSeats: [] },
      { date: "2026-04-06", time: "11:00 AM", hall: "Hall 3", price: 250, totalSeats: 60, bookedSeats: [] },
      { date: "2026-04-06", time: "03:00 PM", hall: "IMAX 1", price: 350, totalSeats: 60, bookedSeats: [] },
    ],
  },
  {
    title: "The Batman",
    description:
      "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
    genre: ["Action", "Crime", "Drama"],
    duration: 176,
    rating: 7.8,
    poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    banner: "https://image.tmdb.org/t/p/original/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
    releaseDate: "2022-03-04",
    language: "English",
    showtimes: [
      { date: "2026-04-05", time: "09:30 AM", hall: "Hall 1", price: 200, totalSeats: 60, bookedSeats: [] },
      { date: "2026-04-05", time: "01:00 PM", hall: "Hall 2", price: 250, totalSeats: 60, bookedSeats: [] },
      { date: "2026-04-05", time: "05:00 PM", hall: "IMAX 1", price: 380, totalSeats: 60, bookedSeats: [] },
      { date: "2026-04-06", time: "10:00 AM", hall: "Hall 1", price: 200, totalSeats: 60, bookedSeats: [] },
    ],
  },
  {
    title: "Dune: Part Two",
    description:
      "Paul Atreides unites with the Fremen while on a warpath of revenge against the conspirators who destroyed his family. He faces a choice between the love of his life and the fate of the universe.",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    duration: 166,
    rating: 8.5,
    poster: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nez7H.jpg",
    banner: "https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    releaseDate: "2024-03-01",
    language: "English",
    showtimes: [
      { date: "2026-04-05", time: "11:00 AM", hall: "IMAX 1", price: 400, totalSeats: 60, bookedSeats: [] },
      { date: "2026-04-05", time: "03:30 PM", hall: "Hall 3", price: 280, totalSeats: 60, bookedSeats: [] },
      { date: "2026-04-05", time: "07:00 PM", hall: "IMAX 1", price: 450, totalSeats: 60, bookedSeats: [] },
      { date: "2026-04-06", time: "12:00 PM", hall: "Hall 2", price: 280, totalSeats: 60, bookedSeats: [] },
      { date: "2026-04-06", time: "04:00 PM", hall: "IMAX 1", price: 400, totalSeats: 60, bookedSeats: [] },
    ],
  },
  {
    title: "Spider-Man: Across the Spider-Verse",
    description:
      "Miles Morales catapults across the multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero.",
    genre: ["Animation", "Action", "Adventure"],
    duration: 140,
    rating: 8.6,
    poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    banner: "https://image.tmdb.org/t/p/original/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
    releaseDate: "2023-06-02",
    language: "English",
    showtimes: [
      { date: "2026-04-05", time: "10:30 AM", hall: "Hall 1", price: 220, totalSeats: 60, bookedSeats: [] },
      { date: "2026-04-05", time: "02:30 PM", hall: "Hall 3", price: 220, totalSeats: 60, bookedSeats: [] },
      { date: "2026-04-05", time: "06:00 PM", hall: "Hall 2", price: 280, totalSeats: 60, bookedSeats: [] },
      { date: "2026-04-06", time: "11:30 AM", hall: "Hall 1", price: 220, totalSeats: 60, bookedSeats: [] },
    ],
  },
  {
    title: "Oppenheimer",
    description:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
    genre: ["Biography", "Drama", "History"],
    duration: 180,
    rating: 8.4,
    poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    banner: "https://image.tmdb.org/t/p/original/nb3xI8XI3w4pMVZ38VijbsyBqP4.jpg",
    releaseDate: "2023-07-21",
    language: "English",
    showtimes: [
      { date: "2026-04-05", time: "09:00 AM", hall: "IMAX 1", price: 380, totalSeats: 60, bookedSeats: [] },
      { date: "2026-04-05", time: "01:30 PM", hall: "Hall 1", price: 250, totalSeats: 60, bookedSeats: [] },
      { date: "2026-04-05", time: "06:00 PM", hall: "IMAX 1", price: 420, totalSeats: 60, bookedSeats: [] },
      { date: "2026-04-06", time: "10:30 AM", hall: "Hall 2", price: 250, totalSeats: 60, bookedSeats: [] },
      { date: "2026-04-06", time: "03:30 PM", hall: "IMAX 1", price: 380, totalSeats: 60, bookedSeats: [] },
    ],
  },
  {
    title: "John Wick: Chapter 4",
    description:
      "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe.",
    genre: ["Action", "Thriller", "Crime"],
    duration: 169,
    rating: 7.7,
    poster: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7LsyZiDREGMS.jpg",
    banner: "https://image.tmdb.org/t/p/original/7I6VUdPj6tQECNHdviJkUHD2u89.jpg",
    releaseDate: "2023-03-24",
    language: "English",
    showtimes: [
      { date: "2026-04-05", time: "10:00 AM", hall: "Hall 3", price: 200, totalSeats: 60, bookedSeats: [] },
      { date: "2026-04-05", time: "04:00 PM", hall: "Hall 1", price: 250, totalSeats: 60, bookedSeats: [] },
      { date: "2026-04-05", time: "08:00 PM", hall: "IMAX 1", price: 380, totalSeats: 60, bookedSeats: [] },
      { date: "2026-04-06", time: "01:00 PM", hall: "Hall 3", price: 200, totalSeats: 60, bookedSeats: [] },
    ],
  },
];

export async function seedMovies() {
  const count = await Movie.countDocuments();
  if (count === 0) {
    await Movie.insertMany(movies);
    console.log("Database seeded with sample movies");
  }
}
