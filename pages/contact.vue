<template>
  <section class="section">
    <AppDiv class="contact">
      <AppH1 :size="'large'">
        聯絡我們
      </AppH1>
      <p class="contact__hint lighter">
        *為必填
      </p>
      <form
        class="contact__form form"
        novalidate
        @submit.prevent="handleSubmit"
      >
        <div class="form__form-element form-element">
          <label
            class="lighter form-element__label"
            for="contact-name"
          >
            姓名*
          </label>
          <ContactInput
            id="contact-name"
            :class="[
              'form-element__input',
              { 'form-element__input--had-submit-clicked': hadSubmitClicked }
            ]"
            type="text"
            required
            @input.native="handleInput"
          />
        </div>
        <div class="form__form-element form-element">
          <label
            class="lighter form-element__label"
            for="contact-tel"
          >
            電話
          </label>
          <ContactInput
            id="contact-tel"
            :class="[
              'form-element__input',
              { 'form-element__input--had-submit-clicked': hadSubmitClicked }
            ]"
            type="tel"
          />
        </div>
        <div class="form__form-element form-element">
          <label
            class="lighter form-element__label"
            for="contact-email"
          >
            電子信箱*
          </label>
          <ContactInput
            id="contact-email"
            :class="[
              'form-element__input',
              { 'form-element__input--had-submit-clicked': hadSubmitClicked }
            ]"
            type="email"
            required
            @input.native="handleInput"
          />
        </div>
        <div class="form__form-element form-element">
          <label
            class="lighter form-element__label"
            for="contact-category"
          >
            需求*
          </label>
          <ContactSelect
            id="contact-category"
            :class="[
              'form-element__input',
              { 'form-element__input--had-submit-clicked': hadSubmitClicked }
            ]"
            required
          >
            <option value="">
              請選擇分類
            </option>
            <option value="category1">
              分類一
            </option>
            <option value="category2">
              分類二
            </option>
            <option value="category3">
              分類三
            </option>
          </ContactSelect>
        </div>
        <div class="form__form-element form-element">
          <label
            class="lighter form-element__label"
            for="contact-title"
          >
            主旨*
          </label>
          <ContactInput
            id="contact-title"
            :class="[
              'form-element__input',
              'form-element__input--stretch',
              { 'form-element__input--had-submit-clicked': hadSubmitClicked }
            ]"
            type="text"
            required
            @input.native="handleInput"
          />
        </div>
        <div class="form__form-element form-element">
          <label
            class="lighter form-element__label"
            for="contact-content"
          >
            內容*
          </label>
          <ContactTextarea
            id="contact-content"
            :class="[
              'form-element__input',
              'form-element__input--stretch',
              { 'form-element__input--had-submit-clicked': hadSubmitClicked }
            ]"
            required
            @input.native="handleInput"
          />
        </div>
        <div class="form__form-element">
          <ContactSubmitButton />
        </div>
      </form>
    </AppDiv>
  </section>
</template>

<script>
import AppDiv from '~/components/AppDiv.vue'
import AppH1 from '~/components/AppH1.vue'
import ContactInput from '~/components/Contact/ContactInput.vue'
import ContactSelect from '~/components/Contact/ContactSelect.vue'
import ContactTextarea from '~/components/Contact/ContactTextarea.vue'
import ContactSubmitButton from '~/components/Contact/ContactSubmitButton.vue'

export default {
  components: {
    AppDiv,
    AppH1,
    ContactInput,
    ContactSelect,
    ContactTextarea,
    ContactSubmitButton
  },
  data() {
    return {
      hadSubmitClicked: false
    }
  },
  methods: {
    handleInput(e) {},
    handleSubmit(e) {
      this.hadSubmitClicked = true

      // Prevent the form from being sent by canceling the event
      e.preventDefault()
    }
  }
}
</script>

<style lang="stylus" scoped>
.lighter
  color #7d7d7d
  font-size 16px
  font-weight 400

.section
  max-width 724px
  margin 0 auto

.contact
  &__hint
    margin 24px 0 0 0
  &__form
    margin 34px 0 0 0

.form
  &__form-element
    & + &
      margin 17px 0 0 0

.form-element
  &__label
    display block
  &__input
    margin 10px 0 0 0
    &--had-submit-clicked
      &:invalid
        border 2px solid #d84939
    &--stretch
      width 100%

@media (max-width 768px)
  .lighter
    font-size 13px

  label.lighter
    color black

  .section
    max-width 100%
    margin 0

  .form-element
    &__input
      width 100%
</style>
