import { shallowMount } from '@vue/test-utils'
import VueSlider from 'vue-slider-component'
import BasePlayerSlider from '../BasePlayerSlider.vue'

describe('BasePlayerSlider', () => {
  test('create different vueSliderComponentOption object by different "direction" props', () => {
    let wrapper = shallowMount(BasePlayerSlider, {
      propsData: {
        direction: 'horizontal'
      }
    })
    let slider = wrapper.find(VueSlider)

    expect(slider.props().direction).toBe('ltr')
    expect(slider.props().width).toBe('auto')
    expect(slider.props().height).toBe(4)

    wrapper = shallowMount(BasePlayerSlider, {
      propsData: {
        direction: 'vertical'
      }
    })
    slider = wrapper.find(VueSlider)

    expect(slider.props().direction).toBe('btt')
    expect(slider.props().width).toBe(4)
    expect(slider.props().height).toBe(126)
  })

  test('passing value received from "valueCurrent" props to slider', () => {
    const valueCurrent = 0.5
    const wrapper = shallowMount(BasePlayerSlider, {
      propsData: {
        direction: 'horizontal',
        valueCurrent
      }
    })
    const slider = wrapper.find(VueSlider)

    expect(slider.props().value).toBe(valueCurrent)
  })

  test('emit "update:valueCurrent" event while slider value change', () => {
    const valueCurrent = 0.5
    const wrapper = shallowMount(BasePlayerSlider, {
      propsData: {
        direction: 'horizontal',
        valueCurrent
      }
    })
    const slider = wrapper.find(VueSlider)

    const valueChanged = 0.6

    // wrapper.setValue() only works on text-control input
    // use "change" event to trigger v-model instead
    slider.vm.$emit('change', valueChanged)

    expect(wrapper.emitted('update:valueCurrent')[0]).toEqual([valueChanged])
  })

  test('passing proper "rail-style" props computed by "valueBuffered" props to slider', () => {
    const valueBuffered = 0.5
    const wrapper = shallowMount(BasePlayerSlider, {
      propsData: {
        direction: 'horizontal',
        valueBuffered
      }
    })
    const slider = wrapper.find(VueSlider)

    expect(slider.props().railStyle).toEqual({
      background: `linear-gradient(90deg, #7d7d7d ${valueBuffered *
        100}%, black ${valueBuffered * 100}%)`
    })
  })
})

describe('snapshot tests', () => {
  test('renders component correctly if we provide efficient props in horizontal', () => {
    const wrapper = shallowMount(BasePlayerSlider, {
      propsData: {
        direction: 'horizontal',
        valueBuffered: 0.5,
        valueCurrent: 0.3
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  test('renders component correctly if we provide efficient props in vertical', () => {
    const wrapper = shallowMount(BasePlayerSlider, {
      propsData: {
        direction: 'vertical',
        valueBuffered: 0.5,
        valueCurrent: 0.3
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
