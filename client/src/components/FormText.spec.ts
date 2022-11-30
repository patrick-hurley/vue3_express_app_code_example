import { mount } from '@vue/test-utils'
import FormText from './FormText.vue'

const modelValue = 'some value'

describe('FormText', () => {
    it('Sets prop data as input', async () => {
        const wrapper = mount(FormText, {
            props: {
                modelValue,
            },
        })
        const input = wrapper.find('input[type="text"]')
        expect((<HTMLInputElement | null>input.element)?.value).toBe(modelValue)
    })

    it('Emits entered text', async () => {
        const wrapper = mount(FormText)
        const textInput = wrapper.find('input[type="text"]')
        await textInput.setValue(modelValue)
        expect(wrapper.emitted()['update:modelValue'][0]).toEqual([modelValue])
    })
})
