<template>
  <div>
    <h2>🎯 Purpose</h2>
    <p>
      A lot of the times, we find ourselves wondering about the voice actor or
      actress of particular anime characters because they sound similar.
    </p>
    <p>
      AniSeiyuu was created in order to provide an easy way to do exactly that.
      By entering the title of 2 anime, you can compare the voice
      actors/actresses of these 2 anime and see which characters share the same
      voice.
    </p>
  </div>
  <div>
    <h2>👍 Attributions</h2>
    <p>
      This project would not be possible without the use of
      <a href="https://anilist.co/" target="_blank">AniList's</a> awesome API
      which is used to get the data of anime, characters and voice
      actors/actresses. This project would've taken a long time to complete
      without them providing the data needed. A big thank you to the AniList's
      API 😃.
    </p>
    <img src="@/assets/img/anilist.jpg" alt="Anilist's API" />
  </div>
</template>

<style lang="scss" scoped>
div {
  max-width: 55ch;
  margin: 2em auto;

  p:nth-child(2) {
    margin: 1em 0;
  }

  img {
    display: block;
    width: 100%;
    height: 7em;
    object-fit: cover;
    object-position: center;
    margin-bottom: 5em;
  }
}
</style>
