import { mount, flushPromises } from '@vue/test-utils'
import SelectUser from './SelectUser.vue'
import UserService from '../services/UserService'
import { createTestingPinia } from '@pinia/testing'
import { useUserStore } from '@/stores/user'
import userData from '@/testing/data/users'

import { useRouter } from 'vue-router'
jest.mock('vue-router', () => ({
    useRoute: jest.fn(),
    useRouter: jest.fn(() => ({
        push: () => {},
    })),
}))

const push = jest.fn()

const resp = {
    data: userData,
}

// mock axios
jest.mock('../services/UserService')
const getAllUsers: any = UserService.getAllUsers

const factory = async () => {
    return mount(SelectUser, {
        global: {
            plugins: [createTestingPinia({ stubActions: false })],
        },
    })
}
describe('SelectUser', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('Calls getUsers and displays a dropdown when array is NOT empty', async () => {
        getAllUsers.mockResolvedValueOnce(resp)
        const wrapper = await factory()
        await flushPromises()

        expect(getAllUsers).toHaveBeenCalledTimes(1)
        expect(wrapper.find('[data-testid="show-dropdown"]').exists()).toBe(
            true
        )
    })

    it('Calls getUsers and displays a message when array IS empty', async () => {
        getAllUsers.mockResolvedValueOnce({ data: [] })
        const wrapper = await factory()
        await flushPromises()

        expect(getAllUsers).toHaveBeenCalledTimes(1)
        expect(wrapper.find('[data-testid="show-dropdown"]').exists()).toBe(
            false
        )
        expect(wrapper.find('[data-testid="show-no-results"] p').text()).toBe(
            'No users exist.'
        )
    })

    it('Displays an error message when getUsers call fails', async () => {
        getAllUsers.mockRejectedValueOnce()
        const wrapper = await factory()
        await flushPromises()

        expect(getAllUsers).toHaveBeenCalledTimes(1)
        expect(wrapper.find('[data-testid="error-message"] p').text()).toBe(
            'Something went wrong.'
        )
    })

    it('Changes navigation when the button is clicked', async () => {
        ;(useRouter as jest.Mock).mockImplementationOnce(() => ({
            push,
        }))
        getAllUsers.mockResolvedValueOnce(resp)
        const wrapper = await factory()
        await flushPromises()
        await wrapper
            .find('[data-testid="user-dropdown"]')
            .setValue(resp.data[0])
        await wrapper.find('[data-testid="submit-button"]').trigger('click')

        expect(push).toHaveBeenCalledTimes(1)
        expect(push).toHaveBeenCalledWith({ name: 'DashboardUser' })
    })

    it('Updates Pinia state for activeUser when user is selected', async () => {
        getAllUsers.mockResolvedValueOnce(resp)
        const wrapper = await factory()
        const userStore = useUserStore()
        await flushPromises()
        await wrapper
            .find('[data-testid="user-dropdown"]')
            .setValue(resp.data[0])
        await wrapper.find('[data-testid="submit-button"]').trigger('click')

        expect(userStore.setActiveUser).toHaveBeenCalled()
        expect(userStore.getActiveUser).toEqual(resp.data[0])
    })

    it('Shows a validation message if no user is selected', async () => {
        getAllUsers.mockResolvedValueOnce(resp)
        const wrapper = await factory()
        await flushPromises()
        await wrapper.find('[data-testid="submit-button"]').trigger('click')

        expect(
            wrapper.find('[data-testid="validation-message"]').exists()
        ).toBeTruthy()
    })
})
