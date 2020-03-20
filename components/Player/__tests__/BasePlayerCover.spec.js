import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import BasePlayerCover from '../BasePlayerCover.vue'

describe('BasePlayerCover', () => {
  test('render NuxtLink with "to" received from "to" props', () => {
    const to = '/test/path'
    const wrapper = shallowMount(BasePlayerCover, {
      propsData: {
        to
      },
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
    const link = wrapper.find(RouterLinkStub)

    expect(link.props().to).toBe(to)
  })

  test('render img with "src" receive from "imgSrc" props', () => {
    const imgSrc = 'https://test/img/url.png'
    const wrapper = shallowMount(BasePlayerCover, {
      propsData: {
        imgSrc
      },
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
    const img = wrapper.find('img')

    expect(img.attributes().src).toBe(imgSrc)
  })

  test('hide img if imgSrc is missing', () => {
    const wrapper = shallowMount(BasePlayerCover, {
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
    const img = wrapper.find('img')

    expect(img.element.style.display).toBe('none')
  })
})

describe('snapshot tests', () => {
  test('renders component correctly if we provide efficient props', () => {
    const wrapper = shallowMount(BasePlayerCover, {
      propsData: {
        to: '/test/path',
        imgSrc: 'https://test/img/url.png'
      },
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
