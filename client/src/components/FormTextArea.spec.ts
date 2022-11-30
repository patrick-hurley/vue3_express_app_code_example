import { mount } from '@vue/test-utils'
import FormTextArea from './FormTextArea.vue'

const modelValue = 'some value'

describe('FormTextArea', () => {
    it('Sets prop data as input', () => {
        const wrapper = mount(FormTextArea, {
            props: {
                modelValue,
            },
        })
        expect(wrapper.find('textarea').element.value).toBe(modelValue)
    })

    it('Emits entered text', () => {
        const wrapper = mount(FormTextArea)
        wrapper.find('textarea').setValue(modelValue)
        expect(wrapper.emitted()['update:modelValue'][0]).toEqual([modelValue])
    })
})
