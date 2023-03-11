# How

Get CLI commands and coding tips from OpenAI Codex right in your console.

This tool uses OpenAI Codex as a remote backend and requires users to have an internet connection
and OpenAI API key.

##### Who is this for?

People who want an easy way to get complex CLI commands without Googling for hours or remembering
a million query syntaxes.

##### Who isn't this for?

People who don't feel comfortable using OpenAI Codex or are concerned about
[their data](https://openai.com/policies/api-data-usage-policies).

> OpenAI API is free with limits for personal users as of 03/11/2023.

## Quickstart

1. Sign up for a free OpenAI platform account [here](https://platform.openai.com/overview).
1. Get an OpenAI API key [here](https://platform.openai.com/account/api-keys).
1. Install `how-ai`

    ```shell
    npm install -g how-ai
    ```

1. Configure How with your API key.

    ```shell
    how -a <OpenAI API key>
    ```

## Usage

```shell
Usage: how [options]

Options:
  -a, --api-key <OpenAI API key>  configure how to use your API key
  -c, --code <language>           generate code snippet instead of a command prompt
  -v, --version                   print version information about how
  -h, --help                      display help for command
```

#### Running commands

1. Invoke How with the command description.

    ```shell
    how print current user
    ```

1. Press `return` to accept or `ctrl-c` to cancel.

    ```shell
    $ how print current user
    $ whoami
    user1
    ```

### Limitations

##### API Limits

OpenAI strictly limits API requests on a per-model basis.
[API limits for OpenAI](https://platform.openai.com/docs/guides/rate-limits).

To see which model How uses, run

```shell
how -v
```

##### Envronment variables

Executing the command directly from How doesn't enumerate environment variables. Instead,
copy the command.

```shell
$ how print current user
$ echo $USER
$USER
```

How is designed to generate commands avoiding environment variables where possible, but doesn't
always.

##### Correctness

How is backed by OpenAI GPT-3, a generative LLM. Generative language models are unreliable by nature,
and may produce incorrect or invalid responses.

This tool can help with complex queries or act as a library
of difficult to memorize commands, but is not a drop-in replacement for Google, documentation, and common sense.
