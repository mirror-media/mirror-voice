import _ from 'lodash'
import { shallowMount } from '@vue/test-utils'
import BasePlayer from '../BasePlayer.vue'
import BasePlayerNavs from '../BasePlayerNavs.vue'
import BasePlayerCover from '../BasePlayerCover.vue'
import BasePlayerInfo from '../BasePlayerInfo.vue'
import BasePlayerVolume from '../BasePlayerVolume.vue'
import BasePlayerRate from '../BasePlayerRate.vue'
import BasePlayerSlider from '../BasePlayerSlider.vue'

const audioList = [
  {
    title: 'first single',
    slug: 'first-single',
    audioSrc: 'http://first-single.wav',
    coverImgSrc: 'http://first-single.jpg'
  },
  {
    title: 'second single',
    slug: 'second-single',
    audioSrc: 'http://second-single.wav',
    coverImgSrc: 'http://second-single.jpg'
  }
]

// customizer to overwrite properties if the source object properties are an empty object or an array, like overwrite store object/array by empty object/array.
const customizer = (objValue, srcValue) => {
  if (Array.isArray(srcValue)) {
    return srcValue
  }
  if (srcValue instanceof Object && Object.keys(srcValue).length === 0) {
    return srcValue
  }
}

// createWrapper factory
// if you want to overwrite default mounting options,
// or want to keep reference to a mock in test.
const createWrapper = overrides => {
  const defaultMountingOptions = {
    propsData: {
      audioList,
      audioCurrentIndex: 0,
      volume: 1,
      playbackRate: 1,
      currentTime: 0
    }
  }
  return shallowMount(
    BasePlayer,
    _.mergeWith(defaultMountingOptions, overrides, customizer)
  )
}

describe('component props', () => {
  test('"showTracksNav" is false if "audioList" is empty, otherwise will be true', () => {
    let wrapper = createWrapper()
    let navs = wrapper.find(BasePlayerNavs)

    expect(navs.props().showTracksNav).toBe(true)

    wrapper = createWrapper({
      propsData: {
        audioList: []
      }
    })
    navs = wrapper.find(BasePlayerNavs)

    expect(navs.props().showTracksNav).toBe(false)
  })

  test('"audioCurrentIndex props"', () => {
    let wrapper = createWrapper()
    let audio = wrapper.find('audio')
    let cover = wrapper.find(BasePlayerCover)
    let info = wrapper.find(BasePlayerInfo)

    expect(audio.attributes().src).toBe(audioList[0].audioSrc)
    expect(cover.props().to).toBe(`/single/${audioList[0].slug}`)
    expect(cover.props().imgSrc).toBe(audioList[0].coverImgSrc)
    expect(info.props().to).toBe(`/single/${audioList[0].slug}`)
    expect(info.props().text).toBe(audioList[0].title)

    wrapper = createWrapper({
      propsData: {
        audioCurrentIndex: 1
      }
    })
    audio = wrapper.find('audio')
    cover = wrapper.find(BasePlayerCover)
    info = wrapper.find(BasePlayerInfo)

    expect(audio.attributes().src).toBe(audioList[1].audioSrc)
    expect(cover.props().to).toBe(`/single/${audioList[1].slug}`)
    expect(cover.props().imgSrc).toBe(audioList[1].coverImgSrc)
    expect(info.props().to).toBe(`/single/${audioList[1].slug}`)
    expect(info.props().text).toBe(audioList[1].title)
  })

  test('"volume" props', () => {
    const volume = 0.66
    const wrapper = createWrapper({
      propsData: {
        volume
      }
    })
    const volumeComponent = wrapper.find(BasePlayerVolume)
    const audio = wrapper.find('audio')

    expect(volumeComponent.props().volumeCurrent).toBe(volume)
    expect(audio.element.volume).toBe(volume)

    const volumeUpdate = 0.88
    volumeComponent.vm.$emit('update:volumeCurrent', volumeUpdate)

    expect(wrapper.emitted('update:volume')[0]).toEqual([volumeUpdate])
    expect(audio.element.volume).toBe(volumeUpdate)
  })

  test('"playbackRate" props', () => {
    const playbackRate = 0.5
    const wrapper = createWrapper({
      propsData: {
        playbackRate
      }
    })
    const rateComponent = wrapper.find(BasePlayerRate)
    const audio = wrapper.find('audio')

    expect(rateComponent.props().playbackRateCurrent).toBe(playbackRate)
    expect(audio.element.playbackRate).toBe(playbackRate)

    const playbackRateUpdate = 2.0
    rateComponent.vm.$emit('update:playbackRateCurrent', playbackRateUpdate)

    expect(wrapper.emitted('update:playbackRate')[0]).toEqual([
      playbackRateUpdate
    ])
    expect(audio.element.playbackRate).toBe(playbackRateUpdate)
  })

  test('"currentTime" props', () => {
    const currentTime = 1234
    const durationMock = 12345
    const wrapper = createWrapper({
      propsData: {
        currentTime
      },
      data() {
        return {
          audioElementDuration: durationMock,
          audioElementBuffered: 0
        }
      }
    })
    const info = wrapper.find(BasePlayerInfo)
    const slider = wrapper.find(BasePlayerSlider)

    expect(info.props().timeCurrent).toBe(currentTime)
    expect(slider.props().valueCurrent).toBe(currentTime / durationMock)

    const progress = 0.2
    const currentTimeUpdate = durationMock * progress
    slider.vm.$emit('update:valueCurrent', progress)

    const audio = wrapper.find('audio')

    expect(audio.element.currentTime).toBe(currentTimeUpdate)

    audio.trigger('timeupdate')

    expect(wrapper.emitted('update:currentTime')[0]).toEqual([
      currentTimeUpdate
    ])
  })

  // test('"updateTime" props', () => {
  //   const currentTime = 1234
  //   const updateTime = 100
  //   const wrapper = createWrapper({
  //     propsData: {
  //       currentTime
  //     }
  //   })
  //   wrapper.setProps({
  //     updateTime
  //   })

  //   const audio = wrapper.find('audio')

  //   expect(audio.element.currentTime).toBe(updateTime)

  //   audio.trigger('timeupdate')

  //   expect(wrapper.emitted('update:currentTime')[0]).toEqual([updateTime])
  // })
})

describe('component events', () => {
  beforeEach(() => {
    window.HTMLMediaElement.prototype.load = () => {
      /* do nothing */
    }
    window.HTMLMediaElement.prototype.play = () => {
      /* do nothing */
    }
    window.HTMLMediaElement.prototype.pause = () => {
      /* do nothing */
    }
    window.HTMLMediaElement.prototype.addTextTrack = () => {
      /* do nothing */
    }
  })

  test('BasePlayerNavs emit "forward" event', () => {
    const wrapper = createWrapper()
    const navs = wrapper.find(BasePlayerNavs)

    navs.vm.$emit('forward')

    expect(wrapper.emitted('update:audioCurrentIndex')[0]).toEqual([1])
  })

  test('do not emit "update:audioCurrentIndex" if BasePlayerNavs emit "forward" event, but "audioCurrentIndex" props is audioList.length - 1', () => {
    const wrapper = createWrapper({
      propsData: {
        audioCurrentIndex: 1
      }
    })
    const navs = wrapper.find(BasePlayerNavs)

    navs.vm.$emit('forward')

    expect(wrapper.emitted('update:audioCurrentIndex')).toBe(undefined)
  })

  test('BasePlayerNavs emit "backward" event', () => {
    const wrapper = createWrapper({
      propsData: {
        audioCurrentIndex: 1
      }
    })
    const navs = wrapper.find(BasePlayerNavs)

    navs.vm.$emit('backward')

    expect(wrapper.emitted('update:audioCurrentIndex')[0]).toEqual([0])
  })

  test('do not emit "update:audioCurrentIndex" if BasePlayerNavs emit "backward" event, but "audioCurrentIndex" props is 0', () => {
    const wrapper = createWrapper()
    const navs = wrapper.find(BasePlayerNavs)

    navs.vm.$emit('backward')

    expect(wrapper.emitted('update:audioCurrentIndex')).toBe(undefined)
  })

  test('BasePlayerNavs emit "rewind" event', () => {
    const currentTime = 1234
    const wrapper = createWrapper({
      propsData: {
        currentTime
      }
    })
    const navs = wrapper.find(BasePlayerNavs)
    const audio = wrapper.find('audio')

    navs.vm.$emit('rewind')
    audio.trigger('timeupdate')

    expect(wrapper.emitted('update:currentTime')[0]).toEqual([currentTime - 15])
  })

  test('BasePlayerNavs emit "fastforward" event', () => {
    const currentTime = 1234
    const wrapper = createWrapper({
      propsData: {
        currentTime
      }
    })
    const navs = wrapper.find(BasePlayerNavs)
    const audio = wrapper.find('audio')

    navs.vm.$emit('fastforward')
    audio.trigger('timeupdate')

    expect(wrapper.emitted('update:currentTime')[0]).toEqual([currentTime + 15])
  })

  test('BasePlayerNavs emit "update:isPlaying" event', () => {
    const wrapper = createWrapper()
    const navs = wrapper.find(BasePlayerNavs)

    navs.vm.$emit('update:isPlaying', true)

    expect(wrapper.emitted('update:isPlaying')[0]).toEqual([true])

    navs.vm.$emit('update:isPlaying', false)

    expect(wrapper.emitted('update:isPlaying')[1]).toEqual([false])
  })

  test('trigger mobile rewind button', () => {
    const currentTime = 1234
    const wrapper = createWrapper({
      propsData: {
        currentTime
      }
    })
    const button = wrapper.find('.rewind-button')
    const audio = wrapper.find('audio')

    button.trigger('click')
    audio.trigger('timeupdate')

    expect(wrapper.emitted('update:currentTime')[0]).toEqual([currentTime - 15])
  })

  test('trigger mobile fastforward button', () => {
    const currentTime = 1234
    const wrapper = createWrapper({
      propsData: {
        currentTime
      }
    })
    const button = wrapper.find('.fastforward-button')
    const audio = wrapper.find('audio')

    button.trigger('click')
    audio.trigger('timeupdate')

    expect(wrapper.emitted('update:currentTime')[0]).toEqual([currentTime + 15])
  })
})

describe('snapshot tests', () => {
  test('renders component correctly if we provide efficient props', () => {
    const wrapper = createWrapper()

    expect(wrapper.element).toMatchSnapshot()
  })

  test('renders component correctly if we provide inefficient props', () => {
    const wrapper = createWrapper({
      propsData: {
        audioList: []
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
