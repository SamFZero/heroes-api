const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: 'Error de validación',
            details: err.message
        });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            message: 'ID inválido'
        });
    }

    res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
    });
};

module.exports = errorHandler;