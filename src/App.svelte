<script>
  import cloud from "d3-cloud" ;

  let userInput = "";
  let wordData = [];
  const cat10colors = [
      "#1f77b4",
      "#ff7f0e",
      "#2ca02c",
      "#d62728",
      "#9467bd",
      "#8c564b",
      "#e377c2",
      "#7f7f7f",
      "#bcbd22",
      "#17becf",
  ];
  let width = 800;
  let height = 600;
  let layout;

  const generateWordCloud = () => {
      const words = userInput
          .split(/\s+/)
          .map((word) => ({ text: word, size: Math.random() * 100 + 20 }));
      layout = cloud()
          .size([width, height])
          .words(words)
          .padding(5)
          .rotate(() => ~~(Math.random() * 2) * 90)
          .font("Nunito")
          .fontSize((d) => d.size)
          .on("end", draw);

      layout.start();
  };

  const draw = (words) => {
      wordData = words.map((word) => ({
          ...word,
          x: word.x,
          y: word.y,
      }));
  };
</script>

<svelte:head>
  <title>Clouder</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
      href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap"
      rel="stylesheet"
  />
</svelte:head>

<main class="bg-black-500">
  <section>
      <label for="words">
          <h2 class="text-white m-5">Enter Words: (seperate by spaces)</h2>
          <textarea id="words" bind:value={userInput} rows="4" cols="50"
          ></textarea>
      </label>
      <button on:click={generateWordCloud}>Generate Word Cloud</button>

      <svg
          id="wordCloud"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
      >
          {#if wordData.length > 0}
              <g transform={`translate(${width / 2}, ${height / 2})`}>
                  {#each wordData as word}
                      <text
                          x={word.x}
                          y={word.y}
                          style="font-size: {word.size}px; fill: {cat10colors[
                              Math.floor(Math.random() * 10)
                          ]}; transform: translate(${word.x}px, ${word.y}px) rotate({word.rotate}deg);"
                      >
                          {word.text}
                      </text>
                  {/each}
              </g>
          {/if}
      </svg>
  </section>
</main>

<style>
  section {
      font-family: "Nunito", sans-serif;
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
  }

  label {
      display: block;
      margin-bottom: 10px;
      font-size: 1.2em;
  }

  textarea {
      width: 100%;
      font-size: 1em;
      padding: 10px;
      border: 2px solid #ccc;
      border-radius: 5px;
      margin-bottom: 10px;
      resize: vertical;
  }

  button {
      font-size: 1em;
      padding: 10px 20px;
      background-color: #1f77b4;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
  }

  button:hover {
      background-color: #155a8a;
  }

  #wordCloud {
      border: 2px solid #ccc;
      border-radius: 10px;
      margin-top: 20px;
      background-color: #f9f9f9;
  }

  text {
      font-family: "Nunito", sans-serif;
      text-anchor: middle;
      alignment-baseline: middle;
  }
</style>
