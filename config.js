benchmarkConfig({
  "name": "VDom Benchmark",
  "description": "Comparing performance of the diff/patch operations in various virtual dom libraries.",
  "data": {
    "type": "script",
    "url": "http://vdom-benchmark.github.io/vdom-benchmark/generator.js"
  },
  "contestants": [
    {
      "name": "kivi",
      "url": "https://github.com/localvoid/kivi",
      "benchmarkUrl": "http://vdom-benchmark.github.io/vdom-benchmark-kivi/"
    },
    {
      "name": "cito.js",
      "url": "https://github.com/joelrich/citojs",
      "benchmarkUrl": "http://vdom-benchmark.github.io/vdom-benchmark-cito/"
    },
    {
      "name": "Bobril",
      "url": "https://github.com/Bobris/Bobril",
      "benchmarkUrl": "http://vdom-benchmark.github.io/vdom-benchmark-bobril/"
    },
    {
      "name": "React",
      "url": "http://facebook.github.io/react/",
      "benchmarkUrl": "http://vdom-benchmark.github.io/vdom-benchmark-react/"
    },
    {
      "name": "virtual-dom",
      "url": "https://github.com/Matt-Esch/virtual-dom",
      "benchmarkUrl": "http://vdom-benchmark.github.io/vdom-benchmark-virtual-dom/"
    },
    {
      "name": "mithril",
      "url": "http://lhorie.github.io/mithril/",
      "benchmarkUrl": "http://vdom-benchmark.github.io/vdom-benchmark-mithril/"
    }
  ]
});
