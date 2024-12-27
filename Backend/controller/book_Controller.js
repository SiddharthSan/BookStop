// book_Controller.js
import Book from "../model/book_model.js"

export const getBook = async(req,res) => {
    try {
        const { query } = req.query;
        let searchQuery = {};
        
        if (query) {
            searchQuery = {
                $or: [
                    { title: { $regex: query, $options: 'i' } },
                    { author: { $regex: query, $options: 'i' } },
                    { category: { $regex: query, $options: 'i' } }
                ]
            };
        }
        
        const books = await Book.find(searchQuery);
        res.status(200).json(books);
    } catch(error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
}
