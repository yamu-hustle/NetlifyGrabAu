; (function () {
    const FORM_SELECTOR = 'form._form._form_1._inline-form._dark.kk-validation'
    const FUNCTION_URL = '/.netlify/functions/form-handler'


    function getLeadSource() {
        const hostname = window.location.hostname.toLowerCase()
        const path = window.location.pathname.toLowerCase()

        // Determine region based on domain
        let region = 'USA'
        if (hostname.includes('.com.au')) {
            region = 'AU'
        } else if (hostname.includes('.com')) {
            region = 'USA'
        }

        // Determine source based on path
        return `Assure${region}Campaign59`;
    }

    function getGclid() {
        const input = document.querySelector('input[name="gclid"]')
        return input && input.value ? input.value : ''
    }

    function validateEmail(value) {
        const regex = /^\w+([\.-]?[\w\+]+)*@\w+([\.-]?\w+)*(\.\w{2,24})+$/
        return regex.test(String(value || '').trim())
    }

    function validatePhone(value) {
        const v = String(value || '').trim()
        if (typeof window._kkValidatePhone === 'function') return window._kkValidatePhone(v)
        return /^[0-9\(\)+-\s]{6,}$/.test(v)
    }

    function validateZipCode(value) {
        const v = String(value || '').trim()
        // ZIP code validation: must match pattern ^9[0-6]\d{3}$
        return /^9[0-6]\d{3}$/.test(v)
    }

    function clearErrors(form) {
        form.querySelectorAll('.field-error').forEach((el) => el.remove())
        form.querySelectorAll('.errored-field').forEach((el) => el.classList.remove('errored-field'))
        const msg = form.querySelector('.form-messages')
        if (msg) {
            msg.classList.remove('error', 'success')
            msg.innerHTML = ''
        }
    }

    function showFieldError(field, message) {
        const err = document.createElement('div')
        err.className = 'field-error'
        err.innerHTML = message
        if (field.parentNode && field.parentNode.classList && field.parentNode.classList.contains('iti')) {
            field.parentNode.insertAdjacentElement('afterend', err)
        } else {
            field.insertAdjacentElement('afterend', err)
        }
        field.classList.add('errored-field')
    }

    function getValue(form, selector) {
        const el = form.querySelector(selector)
        return el ? el.value.trim() : ''
    }

    function validateForm(form) {
        clearErrors(form)
        const messages = {
            required: 'This field is required!',
            invalidEmail: 'Please enter a valid email address!',
            invalidPhone: 'Please enter a valid phone number!',
            invalidZipCode: 'Unfortunately we don\'t service this zip code yet.',
        }

        let valid = true

        const firstNameEl = form.querySelector('#firstname')
        const lastNameEl = form.querySelector('#lastname')
        const emailEl = form.querySelector('#email')
        const phoneEl = form.querySelector('#phone')
        const timeEl = form.querySelector('#time')
        const stateEl = form.querySelector('#state')
        const zipCodeEl = form.querySelector('#zipcode')

        if (firstNameEl && firstNameEl.required && !firstNameEl.value.trim()) {
            showFieldError(firstNameEl, messages.required)
            valid = false
        }
        if (lastNameEl && lastNameEl.required && !lastNameEl.value.trim()) {
            showFieldError(lastNameEl, messages.required)
            valid = false
        }
        if (emailEl) {
            if (emailEl.required && !emailEl.value.trim()) {
                showFieldError(emailEl, messages.required)
                valid = false
            } else if (!validateEmail(emailEl.value)) {
                showFieldError(emailEl, messages.invalidEmail)
                valid = false
            }
        }
        if (phoneEl) {
            if (phoneEl.required && !phoneEl.value.trim()) {
                showFieldError(phoneEl, messages.required)
                valid = false
            } else if (!validatePhone(phoneEl.value)) {
                showFieldError(phoneEl, messages.invalidPhone)
                valid = false
            }
        }
        if (timeEl) {
            const val = timeEl.value
            if (timeEl.required && (!val || val === '')) {
                showFieldError(timeEl, messages.required)
                valid = false
            }
        }
        if (zipCodeEl) {
            const val = zipCodeEl.value
            if (zipCodeEl.required && (!val || val === '')) {
                showFieldError(zipCodeEl, messages.required)
                valid = false
            } else if (val && !validateZipCode(val)) {
                showFieldError(zipCodeEl, messages.invalidZipCode)
                valid = false
            }
        }

        if (stateEl) {
            const val = stateEl.value
            if (stateEl.required && (!val || val === '')) {
                showFieldError(stateEl, messages.required)
                valid = false
            }
        }

        const msg = form.querySelector('.form-messages')
        if (!valid && msg) {
            msg.classList.remove('success')
            msg.classList.add('error')
            msg.innerHTML = 'Please ensure all required fields have been completed!'
        }
        return valid
    }

    const OVERLAY_ID = 'kk-form-submit-overlay'

    function showFormOverlay() {
        if (document.getElementById(OVERLAY_ID)) return
        const overlay = document.createElement('div')
        overlay.id = OVERLAY_ID
        overlay.setAttribute('aria-live', 'polite')
        overlay.setAttribute('aria-busy', 'true')
        overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;'
        overlay.innerHTML = '<div style="width:48px;height:48px;border:4px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:kk-spin 0.8s linear infinite"></div><span style="color:#fff;font-size:16px;font-weight:500">Submitting…</span>'
        if (!document.getElementById('kk-form-overlay-styles')) {
            const style = document.createElement('style')
            style.id = 'kk-form-overlay-styles'
            style.textContent = '@keyframes kk-spin{to{transform:rotate(360deg)}}'
            document.head.appendChild(style)
        }
        document.body.appendChild(overlay)
    }

    function hideFormOverlay() {
        const el = document.getElementById(OVERLAY_ID)
        if (el) el.remove()
    }

    async function submitForm(form) {
        console.log('Submitting data');

        const data = {
            firstname: getValue(form, '#firstname'),
            lastname: getValue(form, '#lastname'),
            email: getValue(form, '#email'),
            phone: getValue(form, '#phone'),
            state: getValue(form, '#state'),
            comment_or_question: getValue(form, '#comment_or_question'),
            time: getValue(form, '#time'),
            gclid: getGclid(),
            // optional debug passthrough if your function supports it
            leadSource: getLeadSource(),
            debug: 1,
            debugEmail: 'yamu+debugassureoffer@hustle.agency',
            zipcode: getValue(form, '#zipcode')
        }



        const body = { payload: { data } }

        const submitBtn = form.querySelector('[type="submit"]')
        if (submitBtn) submitBtn.setAttribute('disabled', 'true')
        showFormOverlay()

        try {
            const xhr = new XMLHttpRequest()
            xhr.open('POST', FUNCTION_URL, true)
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return

                const status = xhr.status || 0
                const responseText = xhr.responseText || 'No response'

                console.log(' XHR Response:', {
                    status: status,
                    responseText: responseText
                });

                const msg = form.querySelector('.form-messages')
                if (status >= 200 && status < 300) {
                    if (msg) {
                        msg.classList.remove('error')
                        msg.classList.add('success')
                        msg.innerHTML = 'Form Submitted Successfully!'
                    }

                    // Push to Google dataLayer
                    if (window.dataLayer && Array.isArray(window.dataLayer)) {
                        window.dataLayer.push({
                            'event': 'form_submit',
                            'form_type': 'lead_form',
                            'lead_source': getLeadSource(),
                            'gclid': getGclid(),
                            'form_data': {
                                'firstname': getValue(form, '#firstname'),
                                'lastname': getValue(form, '#lastname'),
                                'email': getValue(form, '#email'),
                                'phone': getValue(form, '#phone')
                            }
                        })
                    }

                    hideFormOverlay()
                    window.location.href = '/thank-you/'
                } else {
                    hideFormOverlay()
                    if (msg) {
                        msg.classList.remove('success')
                        msg.classList.add('error')
                        // Show the actual error message from the function
                        try {
                            const errorData = JSON.parse(responseText);
                            msg.innerHTML = `Error: ${errorData.error || 'Unknown error occurred'}`;
                        } catch {
                            msg.innerHTML = `Error (Status: ${status}): ${responseText}`;
                        }
                    }
                    if (submitBtn) submitBtn.removeAttribute('disabled')
                }
            }
            xhr.onerror = function () {
                hideFormOverlay()
                console.error('❌ XHR Error:', {
                    status: xhr.status,
                    statusText: xhr.statusText,
                    responseText: xhr.responseText
                })
                const msg = form.querySelector('.form-messages')
                if (msg) {
                    msg.classList.remove('success')
                    msg.classList.add('error')
                    msg.innerHTML = 'Network error occurred. Please check your connection and try again.'
                }
                if (submitBtn) submitBtn.removeAttribute('disabled')
            }
            xhr.send(JSON.stringify(body))
        } catch (err) {
            hideFormOverlay()
            console.error('❌ Exception during form submission:', err)
            const msg = form.querySelector('.form-messages')
            if (msg) {
                msg.classList.remove('success')
                msg.classList.add('error')
                msg.innerHTML = 'An unexpected error occurred. Please try again.'
            }
            if (submitBtn) submitBtn.removeAttribute('disabled')
        }
    }

    function bindForm(form) {
        if (!form) return
        // Disable native and Netlify handling so we fully control submission
        form.setAttribute('novalidate', 'true')
        if (form.hasAttribute('data-netlify')) form.removeAttribute('data-netlify')
        form.setAttribute('action', '')
        form.setAttribute('method', 'post')
        form.addEventListener('submit', function (e) {
            e.preventDefault()
            e.stopPropagation()
            if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation()
            if (validateForm(form)) submitForm(form)
        })
    }

    function wireUp() {
        const forms = Array.from(document.querySelectorAll(FORM_SELECTOR))
        if (forms.length === 0) return
        forms.forEach(bindForm)
        // Capture-phase safety net: catch submits even if other listeners exist
        document.addEventListener(
            'submit',
            function (e) {
                const form = e.target && e.target.matches(FORM_SELECTOR) ? e.target : null
                if (!form) return
                e.preventDefault()
                e.stopPropagation()
                if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation()
                if (validateForm(form)) submitForm(form)
            },
            true
        )
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', wireUp)
    } else {
        wireUp()
    }
})()


