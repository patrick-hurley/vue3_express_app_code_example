import { flushPromises, mount } from '@vue/test-utils'
import { useRoute, useRouter } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import AnswerSingle from '@/views/AnswerSingle.vue'
import AnswerService from '@/services/AnswerService'
import answers from '@/testing/data/answers'

jest.mock('vue-router', () => ({
    useRoute: jest.fn(),
    useRouter: jest.fn(() => ({
        push: () => {},
    })),
}))

const push = jest.fn()

// mock axios
jest.mock('../services/AnswerService')
const getUserSingleAnswer: any = AnswerService.getUserSingleAnswer

const factory = async (activeUserId: string | null = 'user-id') => {
    return mount(AnswerSingle, {
        global: {
            plugins: [
                createTestingPinia({
                    initialState: {
                        user: {
                            activeUser: { id: activeUserId },
                        },
                    },
                }),
            ],
        },
    })
}

describe('Answer Single', () => {
    beforeEach(() => {
        ;(useRoute as jest.Mock).mockImplementation(() => ({
            params: {
                answerSet: answers[0].id,
            },
        }))
    })
    afterEach(() => {
        jest.resetAllMocks()
    })

    it('Shows an error when answer id is not provided', async () => {
        ;(useRoute as jest.Mock).mockImplementation(() => ({
            params: {
                answerSet: null,
            },
        }))

        const wrapper = await factory()
        const errorMessage = wrapper.find('[data-testid="error-message"')
        expect(errorMessage.exists()).toBeTruthy()
    })

    it('Calls axios with correct payload', async () => {
        getUserSingleAnswer.mockResolvedValueOnce()
        await factory()
        await flushPromises()
        expect(getUserSingleAnswer).toHaveBeenCalledTimes(1)
        expect(getUserSingleAnswer).toHaveBeenCalledWith(
            'user-id',
            answers[0].id
        )
    })

    it('Shows an error message when an answer is not found', async () => {
        getUserSingleAnswer.mockRejectedValueOnce(new Error('Not Found'))
        const wrapper = await factory()
        await flushPromises()

        expect(getUserSingleAnswer).toHaveBeenCalledTimes(1)
        const errorMessage = wrapper.find('[data-testid="error-message"')
        expect(errorMessage.exists()).toBeTruthy()
    })

    it('Shows an error message if the server network error', async () => {
        getUserSingleAnswer.mockRejectedValueOnce(new Error('Network Error'))
        const wrapper = await factory()
        await flushPromises()

        expect(getUserSingleAnswer).toHaveBeenCalledTimes(1)
        const errorMessage = wrapper.find('[data-testid="error-message"')
        expect(errorMessage.exists()).toBeTruthy()
    })

    it('Shows the correct answer title', async () => {
        getUserSingleAnswer.mockResolvedValueOnce({ data: answers[0] })
        const wrapper = await factory()
        await flushPromises()
        const answerTitle = wrapper.find('[data-testid="answer-title"]')

        expect(getUserSingleAnswer).toHaveBeenCalledTimes(1)
        expect(answerTitle.exists()).toBeTruthy()
        expect(answerTitle.text()).toEqual(
            new Date(answers[0].date).toLocaleString()
        )
    })

    it('Shows the correct number of answer items', async () => {
        getUserSingleAnswer.mockResolvedValueOnce({ data: answers[0] })
        const wrapper = await factory()
        await flushPromises()

        const answerItems = wrapper.findAll('[data-testid="answer-item"]')
        expect(getUserSingleAnswer).toHaveBeenCalledTimes(1)
        expect(answerItems.length).toEqual(2)
    })

    it('Shows the correct number of answer items', async () => {
        getUserSingleAnswer.mockResolvedValueOnce({ data: answers[1] })
        const wrapper = await factory()
        await flushPromises()

        const answerItems = wrapper.findAll('[data-testid="answer-item"]')
        expect(getUserSingleAnswer).toHaveBeenCalledTimes(1)
        expect(answerItems.length).toEqual(3)
    })
    it('Redirects when no user is active', async () => {
        ;(useRouter as jest.Mock).mockImplementationOnce(() => ({
            push,
        }))
        await factory(null)
        await flushPromises()

        expect(push).toHaveBeenCalledTimes(1)
        expect(push).toHaveBeenCalledWith({ name: 'SelectUser' })
    })
})
