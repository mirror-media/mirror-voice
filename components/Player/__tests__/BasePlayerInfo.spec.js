import _ from 'lodash'
import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import BasePlayerInfo from '../BasePlayerInfo.vue'
import secondsToHms from '~/plugins/util/secondsToHms'

// customizer to overwrite properties if the source object properties are an empty object or an array, like overwrite store object/array by empty object/array.
const customizer = (objValue, srcValue) => {
  if (Array.isArray(srcValue)) {
    return srcValue
  }
  if (srcValue instanceof Object && Object.keys(srcValue).length === 0) {
    return srcValue
  }
}
const createWrapper = overrides => {
  const defaultMountingOptions = {
    stubs: {
      NuxtLink: RouterLinkStub
    },
    mocks: {
      $secondsToHms: secondsToHms
    }
  }
  return shallowMount(
    BasePlayerInfo,
    _.mergeWith(defaultMountingOptions, overrides, customizer)
  )
}

describe('BasePlayerInfo title', () => {
  test('render NuxtLink with "to" received from "to" props', () => {
    const to = '/test/path'
    const wrapper = createWrapper({
      propsData: {
        to
      }
    })
    const link = wrapper.find(RouterLinkStub)

    expect(link.props().to).toBe(to)
  })

  test('render text received from "text" props', () => {
    const text = 'test title'
    const wrapper = createWrapper({
      propsData: {
        text
      }
    })
    const link = wrapper.find(RouterLinkStub)

    expect(link.text()).toBe(text)
  })
})

describe('BasePlayerInfo time', () => {
  test('render formatted "timeTotal" received from props', () => {
    const timeInSecond = 1200
    const wrapper = createWrapper({
      propsData: {
        timeTotal: timeInSecond
      }
    })
    const timeTotal = wrapper.find('.time-total')

    expect(timeTotal.text()).toBe('00:20:00')
  })

  test('render formatted "timeCurrent" received from props', () => {
    const timeInSecond = 1200
    const wrapper = createWrapper({
      propsData: {
        timeCurrent: timeInSecond
      }
    })
    const timeCurrent = wrapper.find('.time-current')

    expect(timeCurrent.text()).toBe('00:20:00')
  })
})

describe('snapshot tests', () => {
  test('renders component correctly if we provide efficient props', () => {
    const wrapper = createWrapper({
      propsData: {
        to: '/test',
        text: 'test text',
        timeCurrent: 123,
        timeTotal: 12345
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
