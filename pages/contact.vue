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
            :value="formName"
            @input.native="handleInput('formName', $event)"
          />
          <p class="form-element__hint">
            請輸入姓名
          </p>
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
            :value="formTel"
            @input.native="handleInput('formTel', $event)"
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
            :value="formEmail"
            @input.native="handleInput('formEmail', $event)"
          />
          <p class="form-element__hint">
            請檢查電子信箱格式
          </p>
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
            :value="formCategory"
            @input.native="handleInput('formCategory', $event)"
          >
            <option value="">
              請選擇分類
            </option>
            <option
              v-for="category in formCategories"
              :key="category"
              :value="category"
              v-text="category"
            />
          </ContactSelect>
          <p class="form-element__hint">
            請選擇需求分類
          </p>
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
            :value="formContent"
            @input.native="handleInput('formContent', $event)"
          />
          <p class="form-element__hint form-element__hint--stretch">
            請輸入內容
          </p>
        </div>
        <div class="form__form-element">
          <recaptcha
            :class="[
              'contact-recaptcha',
              { 'contact-recaptcha--invalid': recaptchaValidationFail }
            ]"
            @error="handleRecaptchaError"
            @success="handleRecaptchaSuccess"
            @expired="handleRecaptchaExpired"
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
import _ from 'lodash'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-tw'

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
      hadSubmitClicked: false,
      isRecaptchaValid: false,

      formName: '',
      formTel: '',
      formEmail: '',
      formCategory: '',
      formCategories: ['音檔播放', '節目專輯詢問', '網頁操作', '其他回饋'],
      formContent: ''
    }
  },
  computed: {
    recaptchaValidationFail() {
      return this.hadSubmitClicked && !this.isRecaptchaValid
    },
    formData() {
      return {
        formName: this.formName,
        formTel: this.formTel,
        formEmail: this.formEmail,
        formCategory: this.formCategory,
        formContent: this.formContent
      }
    }
  },
  methods: {
    handleInput(key, e) {
      this[key] = e.target.value
    },
    validateForm() {
      const elements = document.querySelectorAll('.form-element__input')
      const isElementsValid = _.reduce(
        elements,
        (acc, curr) => acc && _.get(curr, ['validity', 'valid'], false),
        true
      )
      return isElementsValid && this.isRecaptchaValid
    },
    handleSubmit(e) {
      this.hadSubmitClicked = true
      if (this.validateForm()) {
        const currentTime = dayjs()
          .locale('zh-tw')
          .format()
        const form = {
          formTime: currentTime,
          ...this.formData
        }
        this.$postContact(form)
      }
    },

    handleRecaptchaError(error) {
      console.error('Recaptcha error: ', error)
      this.isRecaptchaValid = false
    },
    handleRecaptchaExpired() {
      console.log('Recaptcha expired')
      this.isRecaptchaValid = false
    },
    handleRecaptchaSuccess(token) {
      console.log('Recaptcha succeeded: ', token)
      this.isRecaptchaValid = true
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
    border 1px solid transparent
    &--had-submit-clicked
      &:invalid
        border 1px solid #d84939
        & + .form-element__hint
          display block
    &--stretch
      width 100%
  &__hint
    width 270px
    text-align right
    margin 10px 0 0 0
    color #d84939
    font-size 14px
    font-weight 600
    display none
    &--stretch
      width 100%

.contact-recaptcha
  & >>> iframe
    border 1px solid transparent
  &--invalid
    & >>> iframe
      border 1px solid #d84939

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
    &__hint
      width 100%
</style>
