# Developer Tooling and Command-Line Reference

Review a command before running it, especially when it changes Git history,
permissions, dependencies, or many files.

## Git identity and configuration

```bash
git config user.name
git config user.email
git config --list
```

Add `--global` only when the setting should apply to every local repository.
Avoid disabling commit signing globally to solve a repository-specific problem;
diagnose the signing setup or make a narrowly scoped change.

Amend the most recent unpublished commit with `git commit --amend`. Prefer
`git switch -c my-feature` when creating a branch in current Git versions.

### Rebase workflow

Rebase rewrites commit identities. Use it for a private feature branch, or coordinate before rewriting a branch other people may have based work on.

```bash
git fetch origin
git switch my-feature
git status

# Optional recovery reference before rewriting
git branch my-feature-before-rebase

git rebase origin/main
```

Resolve each conflict deliberately, stage the resolved paths, and continue:

```bash
git add path/to/resolved-file
git rebase --continue
```

Use `git rebase --abort` to restore the pre-rebase state. If the branch was already published and rewriting it is agreed, update it with `git push --force-with-lease`; the lease refuses to overwrite remote work that the local repository has not observed. Do not substitute an unguarded force push.

`git pull --rebase` fetches and rebases local commits in one command. The explicit fetch-and-rebase sequence is easier to inspect and recover while learning or handling a risky branch.

### Clone depth

`git clone --depth 1 <url>` creates a shallow clone with limited history. It reduces initial transfer size for disposable builds, but commands that need ancestry, tags, blame, or older commits may be incomplete. Deepen with `git fetch --deepen <count>` or retrieve the full history with `git fetch --unshallow` when required.

Use `git commit --no-verify` only for a diagnosed emergency. Skipping hooks can
bypass the same validation that protects collaborators and CI.

## Packages and local builds

```bash
npm outdated
npx npm-check-updates
pnpm install --frozen-lockfile
```

Review dependency updates before applying them. Commands that rewrite a
manifest should run on a branch and be followed by tests. Generated directories
commonly ignored by Git include `node_modules/`, `.next/`, `coverage/`, and
`storybook-static/`.

## Shell and editor notes

- Use `history` to inspect commands recorded by the current shell; remember that history may contain sensitive arguments.
- In Windows Command Prompt or PowerShell, `explorer .` opens the current directory in File Explorer.
- Export `GPG_TTY=$(tty)` when terminal-based signing needs the active TTY.
- In Vim, press `Esc`, enter `:wq`, and press Return to save and quit.
- Restart a TypeScript language server through the editor command palette when
  its project state becomes stale.
- Editor settings sync can keep preferences consistent across machines; review
  extensions and settings before trusting a shared configuration.
- Format LaTeX with `latexindent cv.tex -w` only after reviewing or committing
  the file, because `-w` rewrites it.

Administrative tools such as `visudo` intentionally require elevated access.
Do not copy credentials or passphrases into notes, repositories, shell history,
or example commands; store them in an appropriate password manager.

## Environment cleanup and CI

Some Windows Subsystem for Linux checkouts contain `Zone.Identifier` metadata.
List exact matches before deleting them; never run a recursive deletion command
from an unverified directory.

When a pipeline fails, start at the first failed step rather than searching only
for the word `FAIL`. Capture the failing command, environment, and relevant log
context, reproduce locally when possible, then fix the cause instead of bypassing
validation.

Code-review assistants can help with a full-file walkthrough, but their output
is a review input, not evidence that the code is correct or secure.
