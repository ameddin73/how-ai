<div align="center">

# How

Generate CLI commands and code snippets from natural language right in your terminal.

[![NPM Version](http://img.shields.io/npm/v/how-ai.svg?style=flat)](https://www.npmjs.org/package/how-ai)
[![NPM Downloads](https://img.shields.io/npm/dm/how-ai.svg?style=flat)](https://npmcharts.com/compare/how-ai?minimal=true)
[![Install Size](https://packagephobia.now.sh/badge?p=how-ai)](https://packagephobia.now.sh/result?p=how-ai)
![License](https://img.shields.io/github/license/ameddin73/how-ai)
<!-- </br> -->
<!-- ![Build Status](https://github.com/ameddin73/how-ai/actions/workflows/release.yaml/badge.svg) -->
<!-- [![Known Vulnerabilities](https://snyk.io/test/npm/how-ai/badge.svg)](https://snyk.io/test/npm/how-ai) -->
<!-- [![Dependencies Status](https://img.shields.io/librariesio/github/ameddin73/how-ai)](https://libraries.io/npm/how-ai) -->

</div>

## Examples

```shell
> how get current user
$ whoami copied to clipboard!
```

```shell
> how get the cluster name of every aks cluster that has a nodepool size of 3
$ az aks list --query "[?agentPoolProfiles[?count==\`3\`]].name" copied to clipboard!
```

```java
> how full program to print todays date --code java
//importing the Date class from java.util package which is used to get the current date
import java.util.Date;

public class CurrentDate {
    //Main method
    public static void main(String[] args) {
        //create a Date object
        Date date = new Date();

        //print out current date
        System.out.println(date);
    }
}
```

## Quickstart

### Install

```shell
npm install -g how-ai
```

### Running commands

1. Invoke How with the command description.

    ```shell
    > how get current user
    ```

1. Paste the copied command into your terminal and execute.

    ```shell
    > how get current user
    $ whoami copied to clipboard!
    > whoami
    alex
    ```

### Generating Code

1. Invoke How with a description of the desired code and set the `--code` or `-c` flag
to the language you want.

    ```python
    > how -c python small function to initialize tensorflow
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

## Usage

```shell
Usage: how [options]

Options:
  -c, --code <language>           generate code snippet instead of a command prompt
  -v, --version                   print version information about how
  -h, --help                      display help for command
```

## Correctness

How is backed by OpenAI GPT-3, a generative LLM. Generative language models are unreliable by nature,
and may produce incorrect or invalid responses.

This tool can help with complex queries or act as a library
of difficult to memorize commands, but is not a drop-in replacement for Google, documentation, and common sense.

To see which model How uses, run

```shell
how -v
```

## Privacy

This tool uses OpenAI APIs. View their
[data policy here](https://openai.com/policies/api-data-usage-policies).
