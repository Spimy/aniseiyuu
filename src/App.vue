<template>
  <Header />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";

export default defineComponent({
  components: { Header }
});
</script>

<style lang="scss">
@font-face {
  font-family: "Insaniburger with Cheese";
  font-style: normal;
  font-weight: normal;
  font-display: swap;
  src: local("Insaniburger with Cheese"),
    url("assets/fonts/Insanibc.woff2") format("woff2");
}

@font-face {
  font-family: "Berlin Sans FB Regular";
  font-style: normal;
  font-weight: normal;
  font-display: swap;
  src: local("Berlin Sans FB"),
    url("assets/fonts/Berlin Sans FB Regular.woff2") format("woff2");
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
}

html,
body {
  height: 100%;
  width: 100%;

  --fade-transition: cubic-bezier(0.3, 0.42, 0.73, 0.82);
  --btn-color: #3d2c7a;
  --faded-purple: #3a3255;
}

html {
  font-family: "Berlin Sans FB Regular", sans-serif;
  font-size: 16px;
  font-size: clamp(1.2rem, 1.3vw, 5rem);
  line-height: 1.2rem;
}

body {
  color: #ffffff;
  background-color: #1e1b29;
  scroll-behavior: smooth;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Insaniburger with Cheese", sans-serif;
  color: #ffffff;
  letter-spacing: 0.1rem;
}

main {
  margin: 0 7em;
  position: relative;

  @media (max-width: 680px) {
    margin: 0 2em;
  }
}

// Transitions
.fade {
  &-enter-active,
  &-leave-active {
    transition: 0.1s var(--fade-transition);
    transition-property: opacity;
  }
  &-enter-to,
  &-leave-from {
    opacity: 1;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
.bounceIn {
  &-enter-active,
  &-leave-active {
    transition: 0.4s cubic-bezier(0.2, 0.8, 0.3, 1.3);
    transition-property: opacity, transform;
  }
  &-enter-to,
  &-leave-from {
    transform: scale(1);
  }
  &-enter-from,
  &-leave-to {
    transform: scale(0.9);
    opacity: 0;
  }
}
.fall {
  &-enter-active,
  &-leave-active {
    transition: 0.4s cubic-bezier(0.2, 0.8, 0.3, 1.3);
    transition-property: opacity, transform;
  }
  &-enter-to,
  &-leave-from {
    transform: scale(1) translateY(0);
  }
  &-enter-from,
  &-leave-to {
    transform: scale(0.9) translateY(-100%);
    opacity: 0;
  }
}
</style>
