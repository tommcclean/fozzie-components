<template>
    <component
        :is="componentType"
        :class="[
            $style['o-btn'],
            (isIcon ? $style['o-btn--icon'] : ''),
            $style[`o-btn--${buttonType}`],
            $style[`o-btn--size${buttonSizeClassname}`],
            (isFullWidth ? $style['o-btn--fullWidth'] : ''),
            (isLoading ? $style['o-btn--loading'] : '')
        ]"
        :action-type="buttonActionType"
        :data-test-id="`${componentType}-component`"
        v-bind="$attrs"
        :aria-live="getAriaLive"
        :aria-busy="isLoading"
        v-on="!isLoading && $listeners"
    >
        <span
            v-if="isLoading"
            :class="$style['c-spinner']"
            :data-test-id="`${componentType}-spinner`" />

        <span
            :class="[
                $style['o-btn-text'],
                (isLoading ? $style['o-btn-text--hidden'] : '')
            ]">
            <slot />
        </span>
    </component>
</template>

<script>
import ActionButton from './Action.vue';
import LinkButton from './Link.vue';

export default {
    name: 'FButton',
    components: {
        ActionButton,
        LinkButton
    },
    props: {
        buttonType: {
            type: String,
            default: 'primary'
        },
        buttonSize: {
            type: String,
            default: 'medium'
        },
        isFullWidth: {
            type: Boolean,
            default: false
        },
        actionType: {
            type: String,
            default: 'button'
        },
        isIcon: {
            type: Boolean,
            default: false
        },
        isLoading: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        /**
         * Converts the buttonSize prop into a normalised classname (that fit with our class naming scheme)
         */
        buttonSizeClassname () {
            if (this.buttonSize === 'xsmall') {
                return this.buttonSize.slice(0, 2).toUpperCase() + this.buttonSize.slice(2); // xsmall -> XSmall
            }
            return this.buttonSize.charAt(0).toUpperCase() + this.buttonSize.slice(1); // capitalize the first letter of the prop
        },
        /**
         * Renders `Link` component if a `href` attribute is applied to the component
         * Renders `RouterLink` component if a `to` attribute is applied to the component, avoids page reload compared to Link with `href`
         * Renders `Action` component if no `href` attrivute is applied to the component
         */
        componentType () {
            if (this.$attrs.href) {
                return 'link-button';
            }

            if (this.$attrs.to) {
                return 'router-link';
            }

            return 'action-button';
        },
        /**
         * Passes `actionType` prop to action button if no `href` or `to` attributes is applied to the component
         */
        buttonActionType () {
            return (!this.$attrs.href && !this.$attrs.to) ? this.actionType : null;
        },
        /**
         * Gets the correct value for the aria-live attribute depending on whether the button is loading or not.
         */
        getAriaLive () {
            return this.isLoading ? 'polite' : 'off';
        }
    }
};
</script>

<style lang="scss" module>
$btn-default-borderRadius           : $border-radius;
$btn-default-font-family            : $font-family-base;
$btn-default-font-size              : 'body-l';
$btn-default-weight                 : $font-weight-bold;
$btn-default-padding                : 11px 1.5em 13px;
$btn-default-outline-color          : $color-focus;
$btn-default-loading-opacity        : 0.35;

$btn-primary-bgColor                : $color-interactive-primary;
$btn-primary-bgColor--hover         : darken($color-interactive-primary, $color-hover-01);
$btn-primary-bgColor--active        : darken($color-interactive-primary, $color-active-01);
$btn-primary-textColor              : $color-content-interactive-primary;
$btn-primary-loading-color          : $color-content-interactive-primary;
$btn-primary-loading-colorOpaque    : rgba($btn-primary-loading-color, $btn-default-loading-opacity);

$btn-secondary-bgColor              : $color-interactive-secondary;
$btn-secondary-bgColor--hover       : darken($color-interactive-secondary, $color-hover-01);
$btn-secondary-bgColor--active      : darken($color-interactive-secondary, $color-active-01);
$btn-secondary-textColor            : $color-content-interactive-secondary;
$btn-secondary-loading-color        : $color-content-interactive-secondary;
$btn-secondary-loading-colorOpaque  : rgba($btn-secondary-loading-color, $btn-default-loading-opacity);

$btn-outline-bgColor                : transparent;
$btn-outline-bgColor--hover         : darken($color-white, $color-hover-01);
$btn-outline-bgColor--active        : darken($color-white, $color-active-01);
$btn-outline-textColor              : $color-content-interactive-tertiary;
$btn-outline-border-color           : $color-border-default;
$btn-outline-loading-color          : $color-content-interactive-tertiary;
$btn-outline-loading-colorOpaque    : rgba($btn-outline-loading-color, $btn-default-loading-opacity);

$btn-ghost-bgColor                  : transparent;
$btn-ghost-bgColor--hover           : darken($color-white, $color-hover-01);
$btn-ghost-bgColor--active          : darken($color-white, $color-active-01);
$btn-ghost-textColor                : $color-content-interactive-secondary;
$btn-ghost-loading-color            : $color-content-interactive-secondary;
$btn-ghost-loading-colorOpaque      : rgba($btn-ghost-loading-color, $btn-default-loading-opacity);

$btn-link-loading-color             : $color-content-link;
$btn-link-loading-colorOpaque       : rgba($btn-link-loading-color, $btn-default-loading-opacity);

$btn-disabled-bgColor               : $color-disabled-01;
$btn-disabled-textColor             : $color-content-disabled;

$btn-sizeLarge-font-size            : 'heading-s';
$btn-sizeLarge-padding              : 13px 1.2em 15px;
$btn-sizeLarge-loading-color        : $color-content-interactive-primary;
$btn-sizeLarge-loading-colorOpaque  : rgba($btn-sizeLarge-loading-color, $btn-default-loading-opacity);

$btn-sizeSmall-padding              : 7px 1em 9px;

$btn-sizeXSmall-padding             : 5px 0.5em 7px;
$btn-sizeXSmall-lineHeight          : 1;

$btn-icon-sizeLarge-buttonSize      : 56px; // button--icon is a sircle so width and height can use one var
$btn-icon-sizeLarge-iconSize        : 21px;
$btn-icon-sizeMedium-buttonSize     : 48px;
$btn-icon-sizeMedium-iconSize       : 21px;
$btn-icon-sizeSmall-buttonSize      : 40px;
$btn-icon-sizeSmall-iconSize        : 18px;
$btn-icon-sizeXSmall-buttonSize     : 32px;
$btn-icon-sizeXSmall-iconSize       : 18px;

@include loadingIndicator('medium');

.c-spinner {
    margin: 0 auto;
    position: absolute;
    left: calc(50% - 10px); // Substract half of the size of the spinner.
    top: calc(50% - 10px); // Substract half of the size of the spinner.
}

.o-btn {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    font-family: $btn-default-font-family;
    @include font-size($btn-default-font-size);
    cursor: pointer;
    padding: $btn-default-padding;
    overflow: visible;
    text-align: center;
    font-weight: $btn-default-weight;
    border-radius: $btn-default-borderRadius;
    border: 1px solid transparent;
    user-select: none;
    color: $color-grey-50;
    text-decoration: none;

    // Hide focus styles if they're not needed, for example, when an element receives focus via the mouse.
    &:focus:not(:focus-visible) {
        outline: 0;
    }

    // Show focus styles on keyboard focus.
    &:focus-visible {
        outline: 0;
        box-shadow: 0 0 0 2px $btn-default-outline-color;
    }

    &:hover,
    &:active {
        &:not(.o-btnLink) {
            outline: 0; // no need as already has a focus/active state
        }
    }

    &,
    &:hover,
    &:active,
    &:focus,
    &:visited {
        text-decoration: none;
    }
}

    .o-btn-text {
        display: flex;
        justify-content: center;
    }
    // Visually hide button text (used for loading states)
    .o-btn-text--hidden {
        visibility: hidden;
    }



/**
 * Modifier – .o-btn--primary
 *
 * Sets the btn colour to site primary colour
 */

.o-btn--primary,
.o-btn--icon.o-btn--primary.o-btn--sizeLarge {
    background-color: $btn-primary-bgColor;

    &,
    &:link,
    &:visited {
        color: $btn-primary-textColor;
    }

    &:hover,
    &:active,
    &:focus {
        color: $btn-primary-textColor;
    }

    &:hover {
        background-color: $btn-primary-bgColor--hover;
    }

    &:active,
    &.o-btn--loading {
        background-color: $btn-primary-bgColor--active;
    }

    @include spinnerColor($btn-primary-loading-color, $btn-primary-loading-colorOpaque);
}

/**
 * Modifier – .o-btn--secondary
 *
 * Accompanying secondary style button (knocked back slightly from the primary button)
 */

.o-btn--secondary {
    background-color: $btn-secondary-bgColor;
    color: $btn-secondary-textColor;

    &:hover {
        background-color: $btn-secondary-bgColor--hover;
    }

    &:active,
    &.o-btn--loading {
        background-color: $btn-secondary-bgColor--active;
    }

    @include spinnerColor($btn-secondary-loading-color, $btn-secondary-loading-colorOpaque);
}

/**
 * Modifier – .o-btn--outline
 *
 * Accompanying button style
 */

.o-btn--outline {
    background-color: $btn-outline-bgColor;
    color: $btn-outline-textColor;
    border-color: $btn-outline-border-color;

    &:hover,
    &:active,
    &:focus {
        color: $btn-outline-textColor;
    }

    &:hover {
        background-color: $btn-outline-bgColor--hover;
    }

    &:active,
    &.o-btn--loading {
        background-color: $btn-outline-bgColor--active;
    }

    @include spinnerColor($btn-outline-loading-color, $btn-outline-loading-colorOpaque);
}

/**
 * Modifier – .o-btn--ghost
 *
 * Accompanying button that can be used on solid background colours (such as grey)
 */

.o-btn--ghost {
    background-color: $btn-ghost-bgColor;
    color: $btn-ghost-textColor;

    &:hover,
    &:active,
    &:focus {
        color: $btn-ghost-textColor;
    }

    &:hover {
        background-color: $btn-ghost-bgColor--hover;
    }

    &:active,
    &.o-btn--loading {
        background-color: $btn-ghost-bgColor--active;
    }

    @include spinnerColor($btn-ghost-loading-color, $btn-ghost-loading-colorOpaque);
}

/**
 * Modifier – .o-btn--link
 *
 * Make a button visually look like a default link
 * Useful when we semantically want a button but don’t want all the default styling
 *
 * Should only be applied to buttons
 */

.o-btn--link {
    border: 0;
    background-color: transparent;
    padding: 0;
    color: $color-content-link;
    font-weight: $font-weight-bold;

    &:hover {
        cursor: pointer;
        color: darken($color-content-link, $color-hover-01);
        background-color: transparent;
        text-decoration: underline;
    }
    &:active,
    &:focus {
        color: darken($color-content-link, $color-active-01);
        background-color: transparent;
    }

    @include spinnerColor($btn-link-loading-color, $btn-link-loading-colorOpaque);
}

/**
 * ==========================================================================
 * Modifier – .o-btn--icon
 *
 * Handles styling when only an icon is displayed within the button component
 * ==========================================================================
 */

.o-btn--icon {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    &.o-btn--primary {
        path {
            fill: $btn-primary-textColor;
        }
    }

    &.o-btn--secondary {
        path {
            fill: $btn-secondary-textColor;
        }
    }

    &.o-btn--outline {
        path {
            fill: $btn-outline-textColor;
        }
    }

    &.o-btn--ghost {
        path {
            fill: $btn-ghost-textColor;
        }
    }

    &.o-btn--link {
        path {
            fill: $color-content-link;
        }

        &:hover {
            path {
                fill: darken($color-content-link, $color-hover-01);
            }
        }

        &:active,
        &:focus {
            path {
                fill: darken($color-content-link, $color-active-01);
            }
        }
    }
}

.o-btn--icon.o-btn--sizeLarge {
    width: $btn-icon-sizeLarge-buttonSize;
    height: $btn-icon-sizeLarge-buttonSize;
    padding: 0;

    svg {
        width: $btn-icon-sizeLarge-iconSize;
        height: $btn-icon-sizeLarge-iconSize;
    }
}
.o-btn--icon.o-btn--sizeMedium {
    width: $btn-icon-sizeMedium-buttonSize;
    height: $btn-icon-sizeMedium-buttonSize;
    padding: 0;

    svg {
        width: $btn-icon-sizeMedium-iconSize;
        height: $btn-icon-sizeMedium-iconSize;
    }
}
.o-btn--icon.o-btn--sizeSmall {
    width: $btn-icon-sizeSmall-buttonSize;
    height: $btn-icon-sizeSmall-buttonSize;
    padding: 0;

    svg {
        width: $btn-icon-sizeSmall-iconSize;
        height: $btn-icon-sizeSmall-iconSize;
    }
}
.o-btn--icon.o-btn--sizeXSmall {
    width: $btn-icon-sizeXSmall-buttonSize;
    height: $btn-icon-sizeXSmall-buttonSize;
    padding: 0;

    svg {
        width: $btn-icon-sizeXSmall-iconSize;
        height: $btn-icon-sizeXSmall-iconSize;
    }
}

/**
 * ==========================================================================
 * Btn Size Modifiers
 * ==========================================================================
 */

.o-btn--sizeLarge {
    @include font-size($btn-sizeLarge-font-size);
    padding: $btn-sizeLarge-padding;

    &.o-btn--primary {
        background-color: $color-interactive-brand;

        &:hover {
            background-color: darken($color-interactive-brand, $color-hover-01);
        }
        &:active, &.o-btn--loading {
            background-color: darken($color-interactive-brand, $color-active-01);
        }

        @include spinnerColor($btn-sizeLarge-loading-color, $btn-sizeLarge-loading-colorOpaque);
    }
}

.o-btn--sizeSmall {
    padding: $btn-sizeSmall-padding;
}

.o-btn--sizeXSmall {
    padding: $btn-sizeXSmall-padding;
    line-height: $btn-sizeXSmall-lineHeight;
}

/**
 * ==========================================================================
 * Btn Layout Modifiers
 * ==========================================================================
 */

/**
 * Modifier – o-btn--fullWidth
 *
 * Makes the btn full width
 */

.o-btn--fullWidth {
    display: block;
    width: 100%;

    // Vertically space out multiple fullWidth buttons
    // same as .o-btn--fullWidth + .o-btn--fullWidth
    & + & {
        margin-top: spacing();
    }
}

/**
 * ==========================================================================
 * Disabled state styling
 * ==========================================================================
 */

.o-btn {
    &.is-disabled,
    &[disabled] {
        cursor: not-allowed;

        &,
        &:hover {
            background-color: $btn-disabled-bgColor;
            color: $btn-disabled-textColor;
        }
    }
}
</style>
