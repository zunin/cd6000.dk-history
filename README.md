# cd6000.dk history

Runs daily and saves data to json file

## Observability

### Check model for errors

> `weaver registry check -r o11y`

### Get a resolved schema

> `weaver registry resolve -r o11y`

### Generate docs

> `weaver registry generate -r o11y --templates "https://github.com/open-telemetry/semantic-conventions/archive/refs/tags/v1.34.0.zip[templates]" markdown docs/o11y`

### Generate code

> `weaver registry generate -r o11y --templates templates typescript model/o11y`
