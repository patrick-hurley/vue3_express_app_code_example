import Api from './Api'

export default {
    // TODO - correct TS any reference
    // eslint-disable-next-line
    createAnswerSet(payload: any) {
        return Api().post(`users/${payload.userId}/answers`, payload)
    },
    getUserAnswers(userId: string) {
        return Api().get(`users/${userId}/answers`)
    },
    getUserSingleAnswer(userId: string, answerSet: string) {
        return Api().get(`users/${userId}/answers/${answerSet}`)
    },
}
