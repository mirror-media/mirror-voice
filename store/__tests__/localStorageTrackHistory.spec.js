import dayjs from 'dayjs'
import { mutations } from '../localStorageTrackHistory'
import localStorageConfig from '~/plugins/constants/localStorage'

test('should drop oldest item due to limit', () => {
  const {
    LOCAL_STORAGE_HISTORY_LIMIT: $LOCAL_STORAGE_HISTORY_LIMIT
  } = localStorageConfig

  const slugs = Array.from(
    { length: $LOCAL_STORAGE_HISTORY_LIMIT + 1 },
    (v, i) => `slug${i}`
  )
  const dict = {}
  const date = dayjs()
  slugs.forEach((slug, i) => {
    dict[slug] = {
      slug,
      memorizeDate: date.add(i, 'second')
    }
  })
  const state = { dict }
  const _mutations = {
    ...mutations,
    $LOCAL_STORAGE_HISTORY_LIMIT
  }

  _mutations.MEMORIZE_TRACK(state, {
    track: {
      slug: 'slug-new'
    },
    memorizedDate: date.add($LOCAL_STORAGE_HISTORY_LIMIT, 'second')
  })

  expect(Object.keys(state.dict)).toHaveLength($LOCAL_STORAGE_HISTORY_LIMIT + 1)
  expect(state.dict).not.toHaveProperty('slug0')
  expect(state.dict).toHaveProperty('slug-new')
  for (let index = 1; index < $LOCAL_STORAGE_HISTORY_LIMIT; index += 1) {
    expect(state.dict).toHaveProperty(`slug${index}`)
  }
})
