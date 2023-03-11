# How

Generate CLI commands and code snippets from natural language right in your terminal.

##### Examples

```shell
$ how list all the aks cluster names
$ az aks list --query '[].name'
[
  "cluster1",
  "cluster2",
]
```

```java
$ how print a random string --code java
import java.util.Random;

public class PrintRandomString {
    public static void main(String[] args) {

  String[] strings = {"apples", "oranges", "pears", "bananas", "grapes"};

  Random rand = new Random();

  int randomNum = rand.nextInt(strings.length);

  System.out.println("Random String: " + strings[randomNum]);
    }
}
```

##### Who is this for?

People who want an easy way to get complex CLI commands without Googling for hours or remembering
a million query syntaxes.

##### Who isn't this for?

People who don't feel comfortable using OpenAI Codex or are concerned about
[their data](https://openai.com/policies/api-data-usage-policies).

This tool uses OpenAI GPT-3 as a remote backend and requires users to have an internet connection
and OpenAI API key.

> OpenAI API is free with [limits](#limitations) for personal users as of 03/11/2023.

## Quickstart

1. Sign up for a free OpenAI platform account [here](https://platform.openai.com/overview).
1. Get an OpenAI API key [here](https://platform.openai.com/account/api-keys).
1. Install How

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
    how get current user
    ```

1. Press `return` to accept or `ctrl-c` to cancel.

    ```shell
    $ how get current user
    $ whoami
    alex
    ```

#### Generating Code

1. Invoke How with a description of the desired code and set the `--code` or `-c` flag
to the language you want.

    ```python

    $ how -c python small function to initialize tensorflow
    # import the tensorflow library
    import tensorflow as tf

    # Initialize tensorflow graph
    # Returns an empty graph object
    def init_tf():
        tf.reset_default_graph()
        graph = tf.Graph()
        return graph

    # Create a session
    # A session is required to execute operations in a graph
    def create_session(graph):
    session = tf.Session(graph=graph)
    return session
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
