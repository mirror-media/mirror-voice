import flushPromises from 'flush-promises'
import { mutations, actions, getters } from '../appPlayer'
import toPayloadObject from '~/plugins/util/toPayloadObject'
import normalizeSingle from '~/plugins/util/normalizeSingle'

const createState = () => ({
  audioIsPlaying: false,
  audioVolume: 1,
  audioPlaybackRate: 1,
  audioCurrentTime: 0,
  audioDuration: 0,
  updateTime: 0,
  audioList: [],
  payloadPrevAudioList: null,
  payloadNextAudioList: null,
  audioCurrentIndex: -1,

  audioCurrentAlbumId: null
})

const testPayloadNextHrefString =
  'posts?where={"albums":{"$in":["5dc916577f57db12002423e1"]},"sections":{"$in":["5c8f68d36e99d110002a8863","5d5bc9dcfe1da51100f9e530","5c8f68d36e99d110002a8863","5d5bc9dcfe1da51100f9e530"]}}&sort=publishedDate&page=4'
const testPayloadNext = {
  max_results: 10,
  page: '4',
  sort: 'publishedDate',
  where: {
    albums: { $in: ['5dc916577f57db12002423e1'] },
    sections: {
      $in: [
        '5c8f68d36e99d110002a8863',
        '5d5bc9dcfe1da51100f9e530',
        '5c8f68d36e99d110002a8863',
        '5d5bc9dcfe1da51100f9e530'
      ]
    }
  }
}
const testPayloadPrevHrefString =
  'posts?where={"albums":{"$in":["5dc916577f57db12002423e1"]},"sections":{"$in":["5c8f68d36e99d110002a8863","5d5bc9dcfe1da51100f9e530","5c8f68d36e99d110002a8863","5d5bc9dcfe1da51100f9e530"]}}&sort=publishedDate&page=2'
const testPayloadPrev = {
  max_results: 10,
  page: '2',
  sort: 'publishedDate',
  where: {
    albums: { $in: ['5dc916577f57db12002423e1'] },
    sections: {
      $in: [
        '5c8f68d36e99d110002a8863',
        '5d5bc9dcfe1da51100f9e530',
        '5c8f68d36e99d110002a8863',
        '5d5bc9dcfe1da51100f9e530'
      ]
    }
  }
}

describe('mutations', () => {
  test('PUSH_AUDIO_LIST', () => {
    const state = createState()

    const testListItem1 = { testKey: 'testValue1' }
    const testListItem2 = { testKey: 'testValue2' }
    mutations.PUSH_AUDIO_LIST(state, [testListItem1])
    mutations.PUSH_AUDIO_LIST(state, [testListItem2])

    expect(state.audioList).toEqual([testListItem1, testListItem2])
  })

  test('UNSHIFT_AUDIO_LIST', () => {
    const state = createState()

    const testListItem1 = { testKey: 'testValue1' }
    const testListItem2 = { testKey: 'testValue2' }
    mutations.UNSHIFT_AUDIO_LIST(state, [testListItem1])
    mutations.UNSHIFT_AUDIO_LIST(state, [testListItem2])

    expect(state.audioList).toEqual([testListItem2, testListItem1])
  })

  test('SET_FETCH_PAYLOAD', () => {
    const state = createState()

    mutations.SET_FETCH_PAYLOAD(state, {
      where: 'prev',
      payload: testPayloadPrev
    })
    mutations.SET_FETCH_PAYLOAD(state, {
      where: 'next',
      payload: testPayloadNext
    })

    expect(state.payloadPrevAudioList).toEqual(testPayloadPrev)
    expect(state.payloadNextAudioList).toEqual(testPayloadNext)
  })
})

describe('actions', () => {
  let commit
  let dispatch
  let _actions
  beforeEach(() => {
    commit = jest.fn()
    dispatch = jest.fn()
    _actions = Object.assign(
      {
        $toPayloadObject: toPayloadObject,
        $normalizeSingle: normalizeSingle,
        $fetchSingle: jest.fn(() => Promise.resolve())
      },
      actions
    )
  })

  test('RESET_AUDIO_LIST with empty payload parameter', () => {
    _actions.RESET_AUDIO_LIST({ commit })

    expect(commit).toHaveBeenCalledWith('SET_AUDIO_LIST', [])
    expect(commit).toHaveBeenCalledWith('SET_FETCH_PAYLOAD', {
      where: 'prev',
      payload: null
    })
    expect(commit).toHaveBeenCalledWith('SET_FETCH_PAYLOAD', {
      where: 'next',
      payload: null
    })
    expect(commit).toHaveBeenCalledWith('SET_UPDATE_TIME', 0)
    expect(commit).toHaveBeenCalledWith('SET_AUDIO_IS_PLAYING', false)
    expect(commit).toHaveBeenCalledWith('SET_ALBUM_ID', null)
    expect(commit).toHaveBeenCalledWith('SET_AUDIO_CURRENT_INDEX', 0)
  })

  test('RESET_AUDIO_LIST with non-empty payload parameter and append mode is "push"', () => {
    const testListItem = { testKey: 'testValue' }
    const albumId = 'test albumId'
    const playAt = 12
    const autoPlay = true
    const append = 'push'

    _actions.RESET_AUDIO_LIST(
      { commit },
      {
        list: [testListItem],
        links: {
          prev: {
            href: testPayloadPrevHrefString
          },
          next: {
            href: testPayloadNextHrefString
          }
        },
        albumId,
        playAt,
        autoPlay,
        append
      }
    )

    expect(commit).toHaveBeenCalledWith('PUSH_AUDIO_LIST', [testListItem])
    expect(commit).toHaveBeenCalledWith('SET_FETCH_PAYLOAD', {
      where: 'prev',
      payload: testPayloadPrev
    })
    expect(commit).toHaveBeenCalledWith('SET_FETCH_PAYLOAD', {
      where: 'next',
      payload: testPayloadNext
    })
    expect(commit).toHaveBeenCalledWith('SET_UPDATE_TIME', 0)
    expect(commit).toHaveBeenCalledWith('SET_AUDIO_IS_PLAYING', autoPlay)
    expect(commit).toHaveBeenCalledWith('SET_ALBUM_ID', albumId)
    expect(commit).toHaveBeenCalledWith('SET_AUDIO_CURRENT_INDEX', playAt)
  })

  test('RESET_AUDIO_LIST with non-empty payload parameter and append mode is "unshift"', () => {
    const testListItem = { testKey: 'testValue' }
    const albumId = 'test albumId'
    const playAt = 12
    const autoPlay = true
    const append = 'unshift'

    _actions.RESET_AUDIO_LIST(
      { commit },
      {
        list: [testListItem],
        links: {
          prev: {
            href: testPayloadPrevHrefString
          },
          next: {
            href: testPayloadNextHrefString
          }
        },
        albumId,
        playAt,
        autoPlay,
        append
      }
    )

    expect(commit).toHaveBeenCalledWith('UNSHIFT_AUDIO_LIST', [testListItem])
    expect(commit).toHaveBeenCalledWith('SET_FETCH_PAYLOAD', {
      where: 'prev',
      payload: testPayloadPrev
    })
    expect(commit).toHaveBeenCalledWith('SET_FETCH_PAYLOAD', {
      where: 'next',
      payload: testPayloadNext
    })
    expect(commit).toHaveBeenCalledWith('SET_UPDATE_TIME', 0)
    expect(commit).toHaveBeenCalledWith('SET_AUDIO_IS_PLAYING', autoPlay)
    expect(commit).toHaveBeenCalledWith('SET_ALBUM_ID', albumId)
    expect(commit).toHaveBeenCalledWith('SET_AUDIO_CURRENT_INDEX', playAt)
  })

  test('FETCH_SINGLES', async () => {
    expect.assertions(2)

    const albumId = 'testAlbumId'
    const playAt = 12
    const autoPlay = true
    const append = 'push'
    const mockReturnValue = {
      items: [
        {
          title: 'test title',
          slug: 'testslug',
          audio: {
            audio: {
              url: 'https://test-audio-url'
            }
          },
          heroImage: {
            image: {
              resizedTargets: {
                mobile: {
                  url: 'https://test-image-url'
                }
              }
            }
          }
        }
      ],
      links: {
        prev: {
          href: testPayloadPrevHrefString
        },
        next: {
          href: testPayloadNextHrefString
        }
      }
    }
    _actions.$fetchSingle.mockReturnValue(mockReturnValue)

    _actions.FETCH_SINGLES(
      { dispatch },
      {
        payload: {},
        albumId,
        playAt,
        autoPlay,
        append
      }
    )
    await flushPromises()

    expect(_actions.$fetchSingle).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith('RESET_AUDIO_LIST', {
      list: [
        {
          title: 'test title',
          slug: 'testslug',
          audioSrc: 'https://test-audio-url',
          coverImgSrc: 'https://test-image-url'
        }
      ],
      links: mockReturnValue.links,
      albumId,
      playAt,
      autoPlay,
      append
    })
  })
})

describe('getters', () => {
  test('currentSlug', () => {
    expect(
      getters.currentSlug({
        audioList: [
          {
            slug: 'testslug'
          }
        ],
        audioCurrentIndex: 0
      })
    ).toBe('testslug')
  })
})
