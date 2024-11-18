const validateArticles = (req, res, next) => {

    // Khalid version
    // const { article } = req.body;
    // const isCreateRequest = req.method === 'POST';
    //
    // if (isCreateRequest || (!isCreateRequest && article.title)) {
    //     if (!article.title || article.title.length < 10) {
    //         res.status(400).json({message: "Title must be at least 10 chars."})
    //     }
    // }
    //
    // if (isCreateRequest || (!isCreateRequest && article.content)) {
    //     if (!article.content || article.content.length < 50) {
    //         res.status(400).json({message: "Content must be at least 50 chars."})
    //     }
    // }
    //
    // if (isCreateRequest || (!isCreateRequest && article.authorId)) {
    //     if (!article.authorId || !Number.isInteger(article.authorId)) {
    //         res.status(400).json({message: "AuthorId must be a interger."})
    //     }
    // }

    // Aurélien version
    const updateFields = req.body;
    let fieldsErrors = [];
    const isUpdateRequest = req.method === "PATCH";

    if (!isUpdateRequest || updateFields.title !== undefined) {
        if (!updateFields.title || updateFields.title.length < 10) {
            fieldsErrors.push("Title must be at least 10 chars.")
        }
    }

    if (!isUpdateRequest || (!isCreateRequest && updateFields.content)) {
        if (!updateFields.content || updateFields.content.length < 50) {
            fieldsErrors.push("Content must be at least 50 chars.")
        }
    }

    if (!isUpdateRequest || (!isCreateRequest && updateFields.authorId)) {
        if (!updateFields.authorId || typeof updateFields.authorId !== 'number') {
            fieldsErrors.push("AuthorId must be a interger.")
        }
    }

    if (fieldsErrors.length > 0) {
        return res.status(400).json({errors: fieldsErrors})
    }

    next();
}

module.exports = validateArticles;
