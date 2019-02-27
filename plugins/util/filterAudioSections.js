const audioSectionNames = ['audioSection1', 'audioSection2']

export default sections =>
  sections.filter(section => audioSectionNames.includes(section.name))
