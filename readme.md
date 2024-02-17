# OH-MY-TASK
<img width="958" alt="스크린샷 2024-02-12 오후 4 06 47" src="https://github.com/dovigod/oh-my-task/assets/30416914/cf8403da-0db2-43ae-bdb4-646413128f1b">

## Introduction

OH-MY-TASK is mainly focusing on helping indie developers to manage their projects neatly.
It basically do things by unit called 'Task' and connects Task related actions with wrapped git commands.

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
<!-->Start of Placeholder of OH-MY-TASK<-->
## Task List

- Task1 is this
  > Hello Task1 World!!!

- This is task2.
  > Lores porum, this is dummy texts description

- task3
  

- ❌ task4
  > this is task4

- ❌ new task - 1
  > this is new task while migrating git to create command

- ❌ task hi
  

- 💻 __<U>hello current</U>__
  

- ❌ hello current2
  

- ❌ hello current3
  

- ❌ task life cycle-try1
  

- ❌ task123123
  

- ❌ current task is based on current-branch
  

- ❌ Select this branch immediately [hello]
  > testing if banned chars are discarded

- ❌ select this branch as quick as possi[ble]-heelo haha
  > testing........

- ❌ create v 2-11
  

- ❌ daw123opas
  

- hello-task-2-11-fr awdg rwa dawd awd
  

- 💻 __<U>Testing select command before push</U>__
  > this is description for select command.

- 💻 __<U>회사 공부</U>__
  > ㅎㅎㅎㅎㅎ

- 💻 __<U>quickly test</U>__
  

- 💻 __<U>Testing PR with base branch feature-pr</U>__
  > this is test description

- 💻 __<U>feature/close</U>__
  > Implement "close" command

- 💻 __<U>test:base-branch</U>__
  

- 💻 __<U>this branch is about to merge</U>__
  

- 💻 __<U>Invoke Sync before pr</U>__
  > Sync should be invoked to prevent duplicate pushes

- 💻 __<U>fetch and pull after checkout on finish command</U>__
  

- 💻 __<U>change-log-automation</U>__
  > make change log automation

- 💻 __<U>auto complete on select</U>__
  
<!-->End of Placeholder of OH-MY-TASK<-->