
const validation = (schema) => {
    return (req, res, next) => {
        const inputData = { ...req.body, ...req.params, ...req.query, ...req.headers };
        const validateResult = schema.validate(inputData, { abortEarly: false });

        if (validateResult?.error) {
            return res.status(400).json({
                message: validateResult.error.details.map(err => err.message).join(", "),
                status: 400
            });
        }

        next();
    };
};

export default validation;
