# Introduction

## Preparing a image

### Building

```sh
make
```

### CLI parameters

Call via docker shell:

```sh
docker run -it --rm nsfilho/rocketchat-client:latest -- rc-send --help
```

## Using image

### Environment variables

You need to add some environment variables in CI/CD configuration in your project or group:

1. `ROCKETCHAT_URL` as webhook uri from your rocket.chat;
2. `RC_ALIAS` as the name (alias) you want to name this message post;

### Append to `.gitlab-ci.yml`

```yaml
.notify: &template
    stage: notify
    image: nsfilho/rocketchat-client:latest
    script:
        - rc-send

notify:successful:
    <<: *template
    variables:
        RC_ALIAS: 'Gitlab CI'
        RC_RESULT: 'Sucesso'
        RC_TEXT: 'O deploy do projeto foi realizado com sucesso.'
    when: on_success

notify:failed:
    <<: *template
    variables:
        RC_ALIAS: 'Gitlab CI'
        RC_RESULT: 'Falhou'
        RC_TEXT: 'Falhou o processo de deploy do projeto'
    when: on_failure
```
