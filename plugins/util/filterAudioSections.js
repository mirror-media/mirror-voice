import { AUDIO_SECTION_NAMES } from '~/server/config'

export default (sections = []) =>
  sections.filter(section => AUDIO_SECTION_NAMES.includes(section.name))
