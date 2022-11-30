import { flushPromises, mount } from '@vue/test-utils'
import AdminUserNew from '@/views/AdminUserNew.vue'
import UserService from '@/services/UserService'

// mock axios
jest.mock('../services/UserService')
const createUser: any = UserService.createUser

const factory = () => {
    return mount(AdminUserNew, {
        global: {
            stubs: {
                teleport: true,
            },
        },
    })
}

const userName = 'some user name'

describe('AdminUserViewAll', () => {
    afterEach(() => {
        jest.resetAllMocks()
    })

    it('Shows an error message on server error', async () => {
        createUser.mockRejectedValueOnce(new Error('Network Error'))

        const wrapper = factory()

        await wrapper.find('[data-testid="user-form"] input').setValue(userName)
        await wrapper.find('[data-testid="submit-user"]').trigger('click')

        await flushPromises()
        const errorMessage = wrapper.find('[data-testid="error-message"]')

        expect(createUser).toHaveBeenCalledTimes(1)
        expect(errorMessage.exists()).toBeTruthy()
    })

    it('Shows a validation if no name is entered', async () => {
        const wrapper = factory()

        await flushPromises()
        await wrapper.find('[data-testid="submit-user"]').trigger('click')

        const validationMessage = wrapper.find(
            '[data-testid="validation-message"]'
        )
        expect(validationMessage.exists()).toBeTruthy()
    })

    it('Calls axios with the correct data', async () => {
        createUser.mockResolvedValueOnce()

        const wrapper = factory()

        await wrapper.find('[data-testid="user-form"] input').setValue(userName)
        await wrapper.find('[data-testid="submit-user"]').trigger('click')

        expect(createUser).toHaveBeenCalledTimes(1)
        expect(createUser).toHaveBeenCalledWith({ name: userName })
    })

    it('Displays a confirmation that the user has been created', async () => {
        createUser.mockResolvedValueOnce()

        const wrapper = factory()

        await wrapper.find('[data-testid="user-form"] input').setValue(userName)
        await wrapper.find('[data-testid="submit-user"]').trigger('click')

        await flushPromises()
        const confirmation = wrapper.find(
            '[data-testid="created-confirmation"]'
        )
        expect(confirmation.exists()).toBeTruthy()
    })

    it('Allows the form to reset when requested', async () => {
        createUser.mockResolvedValueOnce()

        const wrapper = factory()

        await wrapper.find('[data-testid="user-form"] input').setValue(userName)
        await wrapper.find('[data-testid="submit-user"]').trigger('click')

        await flushPromises()
        await wrapper.find('[data-testid="reset-form"]').trigger('click')

        const userForm = wrapper.find('[data-testid="user-form"]')
        expect(userForm.exists()).toBeTruthy()
    })
})
