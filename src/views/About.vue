<template>
  <main>
    <div>
      <h2>🎯 Purpose</h2>
      <p>
        A lot of the times, we find ourselves wondering about the voice actor or actress of particular anime characters
        because they sound similar.
      </p>
      <p>
        AniSeiyuu was created in order to provide an easy way to do exactly that. By entering the title of 2 anime, you
        can compare the voice actors/actresses of these 2 anime and see which characters share the same voice.
      </p>
    </div>
    <div>
      <h2>👍 Attributions</h2>
      <p>
        This project would not be possible without the use of
        <a href="https://anilist.co/" target="_blank">AniList's</a> awesome API which is used to get the data of anime,
        characters and voice actors/actresses. This project would've taken a long time to complete without them
        providing the data needed. A big thank you to the AniList's API 😃.
      </p>
      <img src="@/assets/img/anilist.jpg" alt="Anilist's API" loading="lazy" />
    </div>
    <div>
      <h2>🔒 Privacy</h2>
      <p>
        AniSeiyuu has no accounts and doesn't collect any personal data. The titles you search for are sent directly
        from your browser to AniList, which has its own
        <a href="https://anilist.co/terms" target="_blank">terms and privacy policy</a>. Your last comparison is saved
        in your browser's local storage on your own device and is never sent to me. The site is hosted on
        <a href="https://www.netlify.com/" target="_blank">Netlify</a>, which may keep standard server logs such as IP
        addresses (see their <a href="https://www.netlify.com/privacy/" target="_blank">privacy policy</a>).
      </p>
    </div>
  </main>
</template>

<style lang="scss" scoped>
div {
  max-width: 55ch;
  margin: 2em auto;

  @media (max-width: 540px) {
    margin: 0 2em;
  }

  h2 {
    line-height: 1em;
  }

  p {
    margin: 1em 0;
  }

  img {
    display: block;
    width: 100%;
    height: 7em;
    object-fit: cover;
    object-position: center;
    margin-bottom: 2em;
  }
}
</style>
