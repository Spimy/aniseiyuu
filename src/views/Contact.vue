<template>
  <main>
    <div>
      <h2>👨‍💻 Maintainer</h2>
      <p>If you have:</p>
      <ul>
        <li>A question about something</li>
        <li>Found a bug somewhere</li>
        <li>Something else on your mind</li>
      </ul>
      <p>
        You can email us at one of the addresses down here:
        <a href="mailto:williamlaw.3001@gmail.com">williamlaw.3001@gmail.com</a>
      </p>
    </div>
    <div>
      <h2>⌨️ repository</h2>
      <p>
        We are open source btw! You can visit our repo on
        <a href="https://github.com/Spimy/aniseiyuu" target="_blank">GitHub</a>
        if you want to look around or even contribute 😃.
      </p>
    </div>
  </main>
</template>

<style lang="scss" scoped>
div {
  max-width: 50ch;
  margin: 2em auto;

  @media (max-width: 540px) {
    margin: 0 2em;
  }

  h2 {
    line-height: 1em;
  }

  ul {
    list-style-type: square;
  }

  p {
    margin: 1em 0;
    line-height: 1.5em;
  }
}
</style>
