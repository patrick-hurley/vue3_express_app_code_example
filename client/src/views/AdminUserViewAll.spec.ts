import { flushPromises, mount } from '@vue/test-utils'
import AdminUserViewAll from '@/views/AdminUserViewAll.vue'
import UserService from '@/services/UserService'
import users from '@/testing/data/users'

// mock axios
jest.mock('../services/UserService')
const getAllUsers: any = UserService.getAllUsers

const factory = () => {
    return mount(AdminUserViewAll)
}

describe('AdminUserViewAll', () => {
    afterEach(() => {
        jest.resetAllMocks()
    })

    it('Shows an error message on server error', async () => {
        getAllUsers.mockRejectedValueOnce(new Error('Network Error'))

        const wrapper = factory()
        await flushPromises()

        const errorMessage = wrapper.find('[data-testid="error-message"')
        expect(errorMessage.exists()).toBeTruthy()
    })

    it('Shows no results message when the are no users', async () => {
        getAllUsers.mockResolvedValueOnce({ data: [] })

        const wrapper = factory()
        await flushPromises()

        const noResults = wrapper.find('[data-testid="no-results"]')
        expect(noResults.exists()).toBeTruthy()
    })

    it('Shows returned users', async () => {
        getAllUsers.mockResolvedValueOnce({ data: users })

        const wrapper = factory()
        await flushPromises()

        const userItem = wrapper.findAll('[data-testid="user-item"]')
        expect(userItem.length).toEqual(users.length)
    })
})
