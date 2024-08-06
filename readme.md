# OH-MY-TASK

<img width="958" alt="스크린샷 2024-02-12 오후 4 06 47" src="https://github.com/dovigod/oh-my-task/assets/30416914/cf8403da-0db2-43ae-bdb4-646413128f1b">

## Introduction

OH-MY-TASK is mainly focusing on helping indie developers to manage their projects neatly.
It basically do things by unit called 'Task' and connects Task related actions with git commands under the hood.

Goal is to let indie developers free from forgetting what to do, spliting tasks from large commits etc.

**Note**
It will force developers to manage there works( not Task ) with PR.

## Major Command Flows

[Select Command](https://github.com/dovigod/oh-my-task/wiki/Select-command-flow-chart)

[Create Command](https://github.com/dovigod/oh-my-task/wiki/Create-Command-Flow-chart)

[PR Command](https://github.com/dovigod/oh-my-task/wiki/PR-command-flow-chart)

[Finish Command](https://github.com/dovigod/oh-my-task/wiki/Finish-command-flow-chart)

## Installation

1. Download Github-cli (https://cli.github.com/)

2. Install package globally

```
 npm i -g oh-my-task
```

## Initialize

- Create history file (Only once just after installing package globally)

```
  omt init -g
```

- Create local project configuration

```
  omt init
```

## Usage

#### Challenge 1 : General task life cycle

-> Create task

```
  omt create
```

-> Select task

```
  omt select
```

-> Send Pull Request (after works)

```
  omt pr
```

-> Finish Task

```
  omt finish
```

#### Challenge 2 : Speedy selection

-> Create task with base branch to current branch and select right away

```
  omt create -s -c
```

#### Challenge 3 : Select from existing Tasks

```
  omt select
```

#### Challenge 4 : Select from existing Tasks base on current branch

```
  omt select -c
```

#### Challenge 5 : Sync task histories to (SyncFile) (default :: README.md)

```
  omt sync
```

#### Challenge 6 : Send PR

```
  omt pr
```

#### Challenge 7 : Finish Task

```
  omt finish
```
