import { createRouter, createWebHistory, Router } from 'vue-router'
import { routes } from '@/router' // This import should point to your routes file declared above

import { flushPromises, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import AnswerList from '@/views/AnswerList.vue'
import AnswerService from '@/services/AnswerService'
import answers from '@/testing/data/answers'

let router: Router
let push: any

// mock axios
jest.mock('../services/AnswerService')
const getUserAnswers: any = AnswerService.getUserAnswers

const factory = async (activeUserId: string | null = 'user-id') => {
    return mount(AnswerList, {
        global: {
            plugins: [
                createTestingPinia({
                    initialState: {
                        user: {
                            activeUser: { id: activeUserId },
                        },
                    },
                }),
                router,
            ],
        },
    })
}

describe('Answer List', () => {
    beforeEach(async () => {
        router = createRouter({
            history: createWebHistory(),
            routes: routes,
        })

        push = jest.spyOn(router, 'push')
    })
    afterEach(() => {
        jest.resetAllMocks()
    })

    it('Redirects when there is no active user', async () => {
        await factory(null)
        await flushPromises()
        expect(push).toHaveBeenCalledTimes(1)
        expect(push).toHaveBeenCalledWith({ name: 'SelectUser' })
    })

    it('Shows an error when no user found', async () => {
        getUserAnswers.mockRejectedValueOnce(new Error('Not Found'))
        const wrapper = await factory()
        await flushPromises()

        expect(getUserAnswers).toHaveBeenCalledTimes(1)
        const errorMessage = wrapper.find('[data-testid="error-message"]')
        expect(errorMessage.exists()).toBeTruthy()
    })

    it('Shows an error when there is a server error', async () => {
        getUserAnswers.mockRejectedValueOnce(new Error('Network Error'))
        const wrapper = await factory()
        await flushPromises()

        expect(getUserAnswers).toHaveBeenCalledTimes(1)
        const errorMessage = wrapper.find('[data-testid="error-message"]')
        expect(errorMessage.exists()).toBeTruthy()
    })

    it('Shows the correct message when no results are found', async () => {
        getUserAnswers.mockResolvedValueOnce({ data: [] })
        const wrapper = await factory()
        await flushPromises()

        const noResults = wrapper.find('[data-testid="no-results"]')
        expect(noResults.exists()).toBeTruthy()
    })

    it('Shows a link list when results are returned', async () => {
        getUserAnswers.mockResolvedValueOnce({ data: answers })
        const wrapper = await factory()
        await flushPromises()

        const answerItem = wrapper.findAll('[data-testid="answer-item"]')
        expect(answerItem.length).toBe(answers.length)
    })

    it('Directs to the correct answer', async () => {
        getUserAnswers.mockResolvedValueOnce({ data: answers })
        const wrapper = await factory()
        await flushPromises()

        await wrapper.find('[data-testid="answer-item"] a').trigger('click')

        const expectedPayload = {
            name: 'AnswerSingle',
            params: {
                answerSet: answers[0].id,
            },
        }

        expect(push).toHaveBeenCalledTimes(1)
        expect(push).toHaveBeenCalledWith(expectedPayload)
    })
})
