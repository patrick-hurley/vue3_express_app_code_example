import { mount } from '@vue/test-utils'
import FormRadio from './FormRadio.vue'

const radioValues = [
    {
        label: 'item 1 label',
        value: 'item 1 value',
    },
    {
        label: 'item 2 label',
        value: 'item 2 value',
    },
    {
        label: 'item 3 label',
        value: 'item 3 value',
    },
]

const factory = (props: any = null) => {
    return mount(FormRadio, {
        props: {
            ...props,
            radioValues,
        },
    })
}

describe('FormRadio', () => {
    it('Displays correct radio buttons from props', () => {
        const wrapper = factory()
        const radioItems = wrapper.findAll('[data-testid="radio-item"]')

        const firstLabel = radioItems[0].find('label')
        const firstInput = radioItems[0].find('input[type=radio]')

        expect(radioItems.length).toBe(radioValues.length)
        expect(firstLabel.text()).toBe(radioValues[0].label)
        expect((<HTMLInputElement | null>firstInput.element)?.value).toBe(
            radioValues[0].value
        )
    })

    it('Emits selected radio button', async () => {
        const wrapper = factory()
        const radioButtons = wrapper.findAll(
            '[data-testid="radio-item"] input[type=radio]'
        )

        radioButtons[0].setValue()
        radioButtons[1].setValue()
        radioButtons[2].setValue()

        const radioSelectedCalls = wrapper.emitted()[
            'update:modelValue'
        ] as Array<Array<any>>

        expect(radioSelectedCalls).toHaveLength(3)
        expect(radioSelectedCalls[0][0]).toEqual(radioValues[0].value)
        expect(radioSelectedCalls[1][0]).toEqual(radioValues[1].value)
        expect(radioSelectedCalls[2][0]).toEqual(radioValues[2].value)
    })
})
