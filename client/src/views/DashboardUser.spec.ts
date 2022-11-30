import { mount } from '@vue/test-utils'
import DashboardUser from '@/views/DashboardUser.vue'
import { createTestingPinia } from '@pinia/testing'

import { useRouter } from 'vue-router'
jest.mock('vue-router', () => ({
    useRoute: jest.fn(),
    useRouter: jest.fn(() => ({
        push: () => {},
    })),
}))
const push = jest.fn()

const activeUser = {
    name: 'Foo',
    id: 1,
}

const factory = (user: typeof activeUser | null = activeUser) => {
    return mount(DashboardUser, {
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

describe('Dashboard User', () => {
    afterEach(() => {
        jest.resetAllMocks()
    })

    it('Displays welcome message to user', () => {
        const wrapper = factory()
        expect(wrapper.find('[data-testid="user-name"]').text()).toEqual(
            `Hi, ${activeUser.name}`
        )
    })
    it('Redirects if no user is active', async () => {
        ;(useRouter as jest.Mock).mockImplementationOnce(() => ({
            push,
        }))
        factory(null)
        expect(push).toHaveBeenCalledTimes(1)
        expect(push).toHaveBeenCalledWith({ name: 'SelectUser' })
    })
})
