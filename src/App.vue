<template>
  <div id="nav">
    <h1>AniSeiyuu</h1>
  </div>
  <router-view />
</template>

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
}

html {
  font-family: "Berlin Sans FB Regular", sans-serif;
  font-size: 16px;
  font-size: clamp(1.2rem, 1.3vw, 5rem);
  line-height: 1.2rem;
}

body {
  color: #f1f1f1;
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

#app {
  margin: 2rem 7rem;
}

main {
  padding: 7rem 0;
  margin: 0 auto;
  position: relative;
}
</style>
