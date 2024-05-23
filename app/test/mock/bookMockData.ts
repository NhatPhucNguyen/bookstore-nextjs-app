export const mockBook = {
    isbn: "978-3-16-148410-0",
    title: "Mock Book Title",
    description: "This is a mock book used for testing purposes.",
    imageUrl: "http://example.com/mock-book.jpg",
    publishedDate: new Date("2022-01-01T00:00:00.000Z"),
    quantity: 10,
    price: 19.99,
    discount: 0,
    authors: [
        {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            name: "Mock Author",
            bio: "This is a mock author used for testing purposes.",
            imageUrl: "http://example.com/mock-author.jpg",
            dateOfBirth: new Date("1990-01-01T00:00:00.000Z"),
            website: "http://example.com/mock-author",
            createdAt: new Date("2022-01-01T00:00:00.000Z"),
            updatedAt: new Date("2022-01-01T00:00:00.000Z"),
        },
    ],
    subjects: [
        {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            name: "Mock Subject",
            description: "This is a mock subject used for testing purposes.",
            createdAt: new Date("2022-01-01T00:00:00.000Z"),
            updatedAt: new Date("2022-01-01T00:00:00.000Z"),
        },
    ],
    createdAt: new Date("2022-01-01T00:00:00.000Z"),
    updatedAt: new Date("2022-01-01T00:00:00.000Z"),
    reviews: [
        {
            id: 1,
            rating: 5,
            userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            updatedAt: new Date("2022-01-01T00:00:00.000Z"),
            bookIsbn: "978-3-16-148410-0",
        },
        {
            id: 2,
            rating: 4,
            userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            updatedAt: new Date("2022-01-01T00:00:00.000Z"),
            bookIsbn: "978-3-16-148410-0",
        },
    ],
};
