<template>
    
    <form name="cv-contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" @submit.prevent="handleSubmit">
        <span>*required</span>
        <!-- <sup class="input-error-message" v-if="errors.length > 0" v-html="errors[0]"></sup> -->
        <input type="hidden" name="form-name" value="cv-contact" />
        <div>
            <label for="fname">Name:<span>*</span></label>
            <input id="fname" type="text" name="name" v-model="data.name" @blur="handleBlur" required/>
            <span>what should i call you?</span>
        </div>
        <div>
            <label for="email">Email:<span>*</span></label>
            <input id="email" type="email" name="email" v-model="data.email" @blur="handleBlur" required/>
            <span>e.g. 2kool@vanillaicemail.com</span>
        </div>
        <div>
            <label for="phone">Phone:</label>
            <input id="phone" type="tel" name="phone" pattern="^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{1}( |-){0,1}[0-9]{3}$" v-model="data.phone" @blur="handleBlur"/>
            <span>eg 0408008135</span>
        </div>
        <div>
            <label for="message">Message:<span>*</span></label>
            <textarea id="message" type="text" name="message" v-model="data.message" @blur="handleBlur" required></textarea>
            <span>hmm watcha saaay</span>
        </div>
        <div>
           <button type="submit">Submit</button>
        </div>
    </form>
</template>

<script>
// import axios from "axios";
export default {
    name: "Form",
    data() {
        return {
            data: {
                name: "",
                email: "",
                phone: "",
                message: "",
            },
        };
    },
    methods: {
        handleBlur(e) {
            e.target.classList.add("used")
        },

        createFormDataObj(data) {
            const formData = new FormData();
            for (const key of Object.keys(data)) {
                formData.append(key, data[key]);
            }
            return formData;
        },

        // This is our custom onSubmit function; don't forget to add `@submit.prevent="handleSubmit"` inside your <form> tag
        handleSubmit () {
            // This `data` object is what's passed to the createFormDataObj function. It needs all of your form fields, where the key is the name= attribute and the value is the computed value.
            const data = {
                "form-name": "cv-contact",
                "name": this.data.name,
                "email": this.data.email,
                "phone": this.data.phone,
                "message": this.data.message
            }

            console.log(new URLSearchParams(this.createFormDataObj(data)).toString());
            // This POSTs your encoded form to Netlify with the required headers (for text; headers will be different for POSTing a file) and, on success, redirects to the custom success page located at pages/thanks.vue
            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(this.createFormDataObj(data)).toString()
            })
            // This is how we route to /thanks on successful form submission
            // More on $router.push function: https://router.vuejs.org/guide/essentials/navigation.html
            .then(() => this.$router.push('cheers'))
            .catch(() => this.$router.push('uh-oh'))
        }
    }
}
</script>

<style lang="scss">
form {

    /* all error messages */
    span {
        font-size: 0.8rem;
        color: $colour-highlight;
    }

    /* required legend */
    & > span {
        position:relative;
        top:-0.8rem;
    }

    & > div {
        display:flex;
        flex-direction:row;
        position:relative;

        @media only screen and (max-width: $break-mobile) {
            flex-direction:column;
        }

        & > * {
            margin-bottom: 1rem;
            font-family: $font-plain;
        }

        & > label {
            flex-shrink: 0;
            width: 6rem;

            /* required asterisk */
            & > span {
                font-size: 0.6rem;
                position:relative;
                top: -0.5rem;
                color: $colour-highlight;
            }
        }

        & > input,
        & > textarea,
        & > button {  
            flex-grow: 1;
            border: 0;
            border: $border-primary;
            background-color: $colour-white;
            padding: 0.4rem 1rem;

            &.used:invalid {
                border: $border-highlight;
                color: $colour-highlight;

                & + span {
                    display:inline-block;
                }
            }
        }

        & > textarea {
            min-height: 3rem;
            box-sizing:border-box;
            resize:vertical;
        }

        & > button {
            height: 2.4rem;
            max-width: 12rem;
            color: $colour-bg;
            background-color: $colour-primary;
            cursor:pointer;

            &:hover {
                background-color: $colour-highlight;
                border: $border-faint   ;
                transition: 0.3s;
            }

            /* full width buttons on mobile */
            @media only screen and (max-width: $break-mobile) {
                max-width: 100%;
            }
        }

        /* errors */
        & > span {
            position: absolute;
            right: 0;
            padding: 0.15rem 0.6rem;
            font-size: 12px;
            display:none;
        }

        /* buttons container only */
        &:last-child {
            justify-content: flex-end;
        }
    }
}
</style>
