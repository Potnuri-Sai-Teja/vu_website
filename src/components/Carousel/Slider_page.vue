<template>
<div class="slider_page">
    <transition name="slide">
        <slot/>
        </transition>

    </div>    
</template>>
<script>


export default {
    setup() {
        
    },
}
</script>
<style lang="scss">

        .slide-enter-active,
        .slide-leave-active{
            transition: opacity 0.7s ease-in-out;
        }

        .slide-enter-from,
        .slide-leave-to{
                 opacity: 0.7s;
            
        }

        .slide-enter-to,
        .slide-leave-from{
            opacity: 1;
        }
</style>
