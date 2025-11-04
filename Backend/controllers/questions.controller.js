
//Funcion para conseguir una llave randomizada

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const questions = require("../data/questions.js");
    
    
      // --- 1) Enviar preguntas al frontend ---  


    const startQuiz = (req, res) => {
        shuffle(questions);
    
        const questionsCpy = [];

        for (let index = 0; index < questions.length/2; index++) {
            questionsCpy[index] = questions[index];
        }

        // Crea una copia de todas las preguntas
        const publicQuestions = questionsCpy.map(({ id, text, options, correct}) => ({
            id, text, options
        }));

        res.status(200).json({
            message: "Preguntas listas. ¡Éxito!",
            questions: publicQuestions
        });
    };

    // --- 2) Recibir y evaluar respuestas ---
    const submitAnswers = (req, res) => {
    // 1 Toma las respuestas enviadas por el usuario
    // Si req.body.answers es un arreglo → devuelve true
    // El servidor no truena, simplemente no califica nada y responde con score 0.
    const userAnswers = Array.isArray(req.body.answers) ? req.body.answers : [];

    // 2 Inicializa puntaje y arreglo de detalles
    let score = 0;
    const details = [];

    // 3 Recorre todas las preguntas del servidor
    for (const q of questions) {
        // 3.1) Busca la respuesta enviada para esta pregunta
        const user = userAnswers.find(a => a.id === q.id);

        // 3.2) Determina si es correcta
        //isCorrect será verdadero solo si existe user y además la respuesta del usuario es igual a la correcta
        const isCorrect = !!user && user.answer === q.correct;

        // 3.3) Suma al puntaje si acierta
        if (isCorrect) score++;

            // 3.4) Agrega la información detallada de la pregunta
        details.push({
            id: q.id,
            text: q.text,
            yourAnswer: user ? user.answer : null,
            correctAnswer: q.correct,
            correct: isCorrect
        });
    }

    // 4 Envía el resultado al cliente
    return res.status(200).json({
        message: "Respuestas evaluadas.",
        score,
        total: questions.length,
        details
    });
};


module.exports = { startQuiz, submitAnswers };