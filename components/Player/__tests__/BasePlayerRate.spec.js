import { shallowMount } from '@vue/test-utils'
import BasePlayerRate from '../BasePlayerRate.vue'
import { ratesAvailable } from '../comm/rate'

describe('BasePlayerRate', () => {
  test('render "X 0.75" text in toggler while playbackRateCurrent props is 0.75', () => {
    const playbackRateCurrent = 0.75
    const wrapper = shallowMount(BasePlayerRate, {
      propsData: {
        playbackRateCurrent
      }
    })
    const button = wrapper.find('.button-toggler')

    expect(button.text()).toBe(`X ${playbackRateCurrent.toString()}`)
  })

  test('has "active" class on list item of current playbackrate', () => {
    const playbackRateCurrentIndex = 1
    const playbackRateCurrent = ratesAvailable[playbackRateCurrentIndex]
    const wrapper = shallowMount(BasePlayerRate, {
      propsData: {
        playbackRateCurrent
      }
    })

    const listItems = wrapper.findAll('li')
    const listItemAcitve = listItems.at(playbackRateCurrentIndex)

    expect(listItemAcitve.classes()).toContain('active')

    const listItemsNotActive = listItems.filter(
      w => !w.classes().includes('active')
    )

    expect(listItemsNotActive.length).toBe(ratesAvailable.length - 1)
  })

  test('emit "update:playbackRateCurrent" with different rate value while rate list item clicked', () => {
    const playbackRateChangedIndex = 1
    const playbackRateChanged = ratesAvailable[playbackRateChangedIndex]
    const wrapper = shallowMount(BasePlayerRate)

    const listItem = wrapper.findAll('li').at(playbackRateChangedIndex)
    listItem.trigger('click')

    expect(wrapper.emitted('update:playbackRateCurrent')[0]).toEqual([
      playbackRateChanged
    ])
  })
})

describe('snapshot tests', () => {
  test('renders component correctly', () => {
    const wrapper = shallowMount(BasePlayerRate)

    expect(wrapper.element).toMatchSnapshot()
  })
})
