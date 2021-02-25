<template>
    <form ref="contact">
        <!-- <sup class="input-error-message" v-if="errors.length > 0" v-html="errors[0]"></sup> -->
        <div>
            <label for="fname">Name:</label>
            <input id="fname" name="Enter your name" />
        </div>
        <div>
            <label for="email">Email:</label>
            <input id="email" name="Enter your email address" />
        </div>
        <div>
            <label for="phone">Phone:</label>
            <input id="phone" name="Enter your phone number" />
        </div>
        <div>
            <label for="message">Message:</label>
            <textarea id="message" class="message" name="Leave a message"></textarea>
        </div>
        <div>
           <button type="submit">Submit</button>
           <button type="reset">Reset</button>
        </div>
    </form>
</template>

<script>
export default {
    name: "Form",
    data() {
        return {
        data: null,
        };
    }
}
</script>

<style lang="scss">
form {

    & > div {
        display:flex;
        flex-direction:row;

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
        }

        & > input,
        & > textarea,
        & > button {  
            flex-grow: 1;
            border: 0;
            border-bottom: $border-faint;
            background-color: transparent;
            padding: 0.4rem 1rem;

            &.message {
                height: 3rem;
            }
        }

        & > button {
            border: $border-faint;
            color: $colour-primary;
            max-width: 10rem;
            margin-right: 1rem;
            cursor:pointer;
            height: 2.4rem;

            &:hover {
                background-color: $colour-faint;
                transition: 0.3s;
            }

            /* first desktop button lhs gap to align with inputs */
            &:first-child {
                // margin-left: 5rem;
            }

            /* full width buttons on mobile */
            @media only screen and (max-width: $break-mobile) {
                max-width: 100%;
                margin-right: 0;

                /* clear lhs padding on mobile too */
                &:first-child {
                    margin-left: 0;
                }
            }
        }

        /* buttons container only */
        &:last-child {
            justify-content: center;
        }
    }
}
</style>
