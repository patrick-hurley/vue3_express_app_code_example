import Api from './Api'

interface Question {
    type: string
    label: string
    order: number
}

export default {
    createQuestion(payload: Question) {
        return Api().post('questions', payload)
    },
    getAllQuestions() {
        return Api().get('questions')
    },
}
