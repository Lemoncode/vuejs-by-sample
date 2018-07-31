## Scaffold de Vue con Typescript (apicando guía de estilo AirBnb)

En VSC

```json
{
  "Scaffold with TS": {
    // Poner en prefix el snippet que quiere invocarse
    "prefix": "sts",
    "body": [
      "<template>",
      "",
      "</template>",
      "",
      "<script lang=\"ts\">",
        "import Vue from 'vue';",
        "",
        "export default Vue.extend({",
        "\tname: '$0',",
        "});",
      "</script>",
      "",
      "<style>",
      "</style>"
    ]
  }
}
```