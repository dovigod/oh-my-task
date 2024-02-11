# OH-MY-TASK

## Installation

```
 npm i -g oh-my-task
```

## Initialize

- 1. Create history file (Only once just after installing package globally)

```
  omt init -g
```

- 2. Create local project configuration

```
  omt init
```

## Useage

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
