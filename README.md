# how-cli

Get CLI commands and coding tips from OpenAI Codex right in your console.

This tool uses OpenAI Codex as a remote backend and requires users to have an internet connection
and OpenAI API key.

> :bulb: **OpenAI codex is free as of 03/10/2023 .**

##### Who is this for?

People who want an easy way to get complex CLI commands without Googling for hours or remembering
a million query syntaxes.

##### Who isn't this for?

People who don't feel comfortable using OpenAI Codex or are concerned about
[their data](https://openai.com/policies/api-data-usage-policies).

## Quickstart

1. Install `how-cli`

    ```shell
    npm install how-cli
    ```

1. Sign up for a free OpenAI platform account [here](https://platform.openai.com/overview).
1. Get an OpenAI API key [here](https://platform.openai.com/account/api-keys).
1. Configure `how` with your API key.

    ```shell
    how -a <OpenAI API key>
    ```

## Usage

```shell
Usage: how [options]

Options:
  -a, --api-key <OpenAI API key>  configure how to use your API key
  -c, --code <brief description>  generate code snippet instead of a command prompt
  -h, --help                      display help for command
```
