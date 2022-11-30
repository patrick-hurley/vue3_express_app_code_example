import { mount } from '@vue/test-utils'
import Question from '@/views/QuestionSet.vue'
import { createTestingPinia } from '@pinia/testing'
import AnswerService from '@/services/AnswerService'
import QuestionService from '@/services/QuestionService'
import { flushPromises } from '@vue/test-utils'
import questionData from '@/testing/data/questions'

import { useRouter } from 'vue-router'
jest.mock('vue-router', () => ({
    useRoute: jest.fn(),
    useRouter: jest.fn(() => ({
        push: () => {},
    })),
}))

const push = jest.fn()
// mock axios
jest.mock('../services/QuestionService')
jest.mock('../services/AnswerService')
const getAllQuestions: any = QuestionService.getAllQuestions
const createAnswerSet: any = AnswerService.createAnswerSet

const activeUser = {
    name: 'Foo',
    id: 1,
}

const resp = {
    data: questionData,
}

const factory = (user: typeof activeUser | null = activeUser) => {
    return mount(Question, {
        global: {
            plugins: [
                createTestingPinia({
                    initialState: {
                        user: {
                            activeUser: user,
                        },
                    },
                    stubActions: false,
                }),
            ],
        },
    })
}

describe('Question', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('Redirects if not active user is set', () => {
        ;(useRouter as jest.Mock).mockImplementationOnce(() => ({
            push,
        }))
        factory(null)
        expect(push).toHaveBeenCalledTimes(1)
        expect(push).toHaveBeenCalledWith({ name: 'SelectUser' })
    })

    it('Calls axios if active user is set', () => {
        factory()

        expect(getAllQuestions).toHaveBeenCalledTimes(1)
    })

    it('Displays first question correctly on mount', async () => {
        getAllQuestions.mockResolvedValueOnce(resp)
        const wrapper = factory()
        await flushPromises()

        expect(wrapper.find('[data-testid="question-header"]').text()).toEqual(
            'Question 1'
        )
        expect(wrapper.find('[data-testid="question-label"]').text()).toEqual(
            resp.data[0].label
        )
    })

    it('Shows a message when no questions are found', async () => {
        getAllQuestions.mockResolvedValueOnce({ data: [] })
        const wrapper = factory()
        await flushPromises()

        expect(wrapper.find('[data-testid="no-results"]').exists()).toBeTruthy()
    })

    it('Shows an error message if the API call fails', async () => {
        getAllQuestions.mockRejectedValueOnce(new Error('Network Error'))
        const wrapper = factory()
        await flushPromises()

        expect(wrapper.find('[data-testid="show-error"]').exists()).toBeTruthy()
    })

    it('Shows a validation error shows when no answer is provided', async () => {
        getAllQuestions.mockResolvedValueOnce(resp)
        const wrapper = factory()
        await flushPromises()
        await wrapper.find('[data-testid="submit-button"]').trigger('click')

        expect(
            wrapper.find('[data-testid="validation-message"]').exists()
        ).toBeTruthy()
    })

    it('Shows the next question after one is answered', async () => {
        getAllQuestions.mockResolvedValueOnce(resp)
        const wrapper = factory()
        await flushPromises()
        await wrapper
            .find('[data-testid="form-text"] input')
            .setValue('Some value')
        await wrapper.find('[data-testid="submit-button"]').trigger('click')

        expect(wrapper.find('[data-testid="question-header"]').text()).toEqual(
            'Question 2'
        )
    })

    it('Shows the previous answer when navigating back', async () => {
        getAllQuestions.mockResolvedValueOnce(resp)
        const wrapper = factory()
        await flushPromises()

        await wrapper
            .find('[data-testid="form-text"] input')
            .setValue('Some value')
        await wrapper.find('[data-testid="submit-button"]').trigger('click')
        await wrapper.find('[data-testid="back-button"]').trigger('click')

        expect(wrapper.find('[data-testid="question-header"]').text()).toEqual(
            'Question 1'
        )
    })

    it('Ends the questionnaire when second question is no', async () => {
        getAllQuestions.mockResolvedValueOnce(resp)
        const wrapper = factory()
        await flushPromises()

        await wrapper
            .find('[data-testid="form-text"] input')
            .setValue('Some value')

        await wrapper.find('[data-testid="submit-button"]').trigger('click')
        await wrapper
            .findAll('[data-testid="radio-item"] input[type=radio]')[1]
            .setValue()
        await wrapper.find('[data-testid="submit-button"]').trigger('click')

        expect(
            wrapper.find('[data-testid="questionnaire-complete"]').exists()
        ).toBeTruthy()
    })

    it('Ends the questionnaire when there are no more questions', async () => {
        getAllQuestions.mockResolvedValueOnce(resp)
        const wrapper = factory()
        await flushPromises()
        await wrapper
            .find('[data-testid="form-text"] input')
            .setValue('Some value')
        await wrapper.find('[data-testid="submit-button"]').trigger('click')
        await wrapper
            .findAll('[data-testid="radio-item"] input[type=radio]')[0]
            .setValue()
        await wrapper.find('[data-testid="submit-button"]').trigger('click')
        await wrapper
            .find('[data-testid="form-text-area"]')
            .setValue('Some value')
        await wrapper.find('[data-testid="submit-button"]').trigger('click')

        expect(
            wrapper.find('[data-testid="questionnaire-complete"]').exists()
        ).toBeTruthy()
    })

    it('Triggers an axios call with the correct payload when the questionnaire completes', async () => {
        getAllQuestions.mockResolvedValueOnce(resp)
        const wrapper = factory()
        await flushPromises()

        await wrapper
            .find('[data-testid="form-text"] input')
            .setValue('Some value')
        await wrapper.find('[data-testid="submit-button"]').trigger('click')
        await wrapper
            .findAll('[data-testid="radio-item"] input[type=radio]')[1]
            .setValue()
        await wrapper.find('[data-testid="submit-button"]').trigger('click')

        expect(createAnswerSet).toHaveBeenCalledTimes(1)
        expect(createAnswerSet).toHaveBeenCalledWith({
            userId: activeUser.id,
            answers: [
                { answer: 'Some value', questionId: resp.data[0].id },
                { answer: 'No', questionId: resp.data[1].id },
            ],
        })
    })

    it('Shows an error server rejects the answers', async () => {
        getAllQuestions.mockResolvedValueOnce(resp)
        createAnswerSet.mockRejectedValueOnce(new Error('Bad Request'))
        const wrapper = factory()
        await flushPromises()
        await wrapper
            .find('[data-testid="form-text"] input')
            .setValue('Some value')
        await wrapper.find('[data-testid="submit-button"]').trigger('click')
        await wrapper
            .findAll('[data-testid="radio-item"] input[type=radio]')[1]
            .setValue()
        await wrapper.find('[data-testid="submit-button"]').trigger('click')
        await flushPromises()

        expect(createAnswerSet).toHaveBeenCalledTimes(1)
        expect(wrapper.find('[data-testid="show-error"]').exists()).toBeTruthy()
    })
})
