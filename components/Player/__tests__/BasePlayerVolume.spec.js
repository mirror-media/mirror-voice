import { shallowMount } from '@vue/test-utils'
import BasePlayerVolume from '../BasePlayerVolume.vue'
import BasePlayerSlider from '../BasePlayerSlider.vue'

describe('BasePlayerVolume', () => {
  test('have "mute" class on .button-toggler if volumeCurrent props is 0, otherwise not', () => {
    let wrapper = shallowMount(BasePlayerVolume, {
      propsData: {
        volumeCurrent: 0
      }
    })
    let img = wrapper.find('.button-toggler')

    expect(img.classes()).toContain('mute')

    wrapper = shallowMount(BasePlayerVolume, {
      propsData: {
        volumeCurrent: 0.66
      }
    })
    img = wrapper.find('.button-toggler')

    expect(img.classes()).not.toContain('mute')
  })

  test('emit "update:volumeCurrent" event while slider emit "update:valueCurrent" with value', () => {
    const valueChanged = 0.88
    const wrapper = shallowMount(BasePlayerVolume)
    const slider = wrapper.find(BasePlayerSlider)
    slider.vm.$emit('update:valueCurrent', valueChanged)

    expect(wrapper.emitted('update:volumeCurrent')[0]).toEqual([valueChanged])
  })
})

describe('snapshot tests', () => {
  test('renders component correctly if we provide efficient props', () => {
    const wrapper = shallowMount(BasePlayerVolume, {
      propsData: {
        volumeCurrent: 0.66
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  test('renders component correctly if we provide efficient props and is zero', () => {
    const wrapper = shallowMount(BasePlayerVolume, {
      propsData: {
        volumeCurrent: 0
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
