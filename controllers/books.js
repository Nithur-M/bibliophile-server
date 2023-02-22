export const search = async (req, res) => {
    const q = req.query.key
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=6`);
        const results = await response.json();
        res.status(201).json(results.items);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}