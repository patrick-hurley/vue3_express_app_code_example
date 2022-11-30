import { mount } from '@vue/test-utils'
import QuestionItem from './QuestionItem.vue'

const question = {
    label: 'question label',
    type: 'text',
    current: true,
}
const number = 1

const factory = (props: any = null) => {
    return mount(QuestionItem, {
        props: {
            question,
            number,
            ...props,
        },
    })
}

describe('QuestionItem', () => {
    it('Displays question prop', () => {
        const wrapper = factory()
        expect(wrapper.text()).toContain(question.label)
    })

    it('Does NOT display when current is false', () => {
        const wrapper = factory({ question: { current: false } })
        expect(wrapper.text()).toContain('')
    })

    it('Displays text field', () => {
        const wrapper = factory({
            question: { label: 'text', type: 'text', current: true },
        })

        expect(wrapper.find('input[type=text]').exists()).toBe(true)
    })

    it('Displays textarea', () => {
        const wrapper = factory({
            question: {
                label: 'textarea',
                type: 'textarea',
                current: true,
            },
        })
        expect(wrapper.find('textarea').exists()).toBe(true)
    })

    it('Display 2 radio fields', () => {
        const wrapper = factory({
            question: {
                label: 'radio',
                type: 'radio',
                current: true,
            },
        })
        expect(wrapper.findAll('input[type=radio]').length).toBe(2)
    })

    it('Emits when button is clicked and answer is NOT empty', async () => {
        const wrapper = factory()
        await wrapper.find('input').setValue('some answer')
        await wrapper.find('[data-testid="submit-button"]').trigger('click')
        expect(wrapper.emitted().answered).toBeTruthy()
        expect(wrapper.emitted().answered[0]).toEqual([
            { answer: 'some answer', index: 0 },
        ])
    })

    it('Does NOT emit when button is clicked and answer is empty', async () => {
        const wrapper = factory()
        await wrapper.find('input').setValue('')
        await wrapper.find('[data-testid="submit-button"]').trigger('click')
        expect(wrapper.emitted().answered).toBeFalsy()
    })

    it('Shows validation message when answer is empty', async () => {
        const wrapper = factory()
        await wrapper.find('input').setValue('')
        await wrapper.find('[data-testid="submit-button"]').trigger('click')
        expect(wrapper.find('#validation').exists()).toBe(true)
    })

    it('Displays the correct back button text for first question', () => {
        const wrapper = factory({ number: 1 })
        const backButton = wrapper.find('[data-testid="back-button"]')
        expect(backButton.text()).toEqual('Cancel')
    })

    it('Displays the correct back button text when there is a previous question', () => {
        const wrapper = factory({ number: 2 })
        const backButton = wrapper.find('[data-testid="back-button"]')
        expect(backButton.text()).toEqual('Back')
    })

    it('Emits the correct question number when going back', async () => {
        const wrapper = factory({ number: 1 })
        wrapper.find('[data-testid="back-button"]').trigger('click')
        expect(wrapper.emitted().goToQuestion[0]).toEqual([0])
    })
})
