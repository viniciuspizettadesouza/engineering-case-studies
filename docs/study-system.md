# Adaptive Study System

The Study System adds retrieval practice to the Engineering Practice Lab without creating a second knowledge base. Detailed explanations remain in the Markdown handbook; concise, source-controlled cards link to a canonical topic and optional heading.

## Learning model

The normal loop is **question → think → reveal → rate**. Ratings are Again, Hard, Good, and Easy. The maintained `ts-fsrs` implementation uses those ratings to update difficulty, stability, state, and the next due time. Desired retention is configurable and defaults to 90%; the UI never hard-codes intervals.

FSRS owns **when** a learned card is due. The application owns **which eligible card appears next**. Due cards precede new cards, interview-derived content has transparent priority, and deterministic interleaving avoids consecutive categories when an alternative exists. Interleaving never edits a due date.

Priority and memory are intentionally separate. Interview evidence says why content matters; FSRS state says how it is currently retained. The knowledge map therefore shows New, Learning, Review, or Relearning plus due dates, reviews, lapses, and stability—never an invented mastery percentage.

## Local persistence and privacy

Version 1 uses `localStorage` behind `StudyProgressRepository`, under `engineering-practice-lab.study.v1`. Stored data contains settings, scheduler state, and review history; it contains no account or unnecessary personal data. Malformed stored data falls back safely without overwriting the malformed value. Unknown historical card IDs remain readable in history.

Export creates human-readable JSON with a schema version and export timestamp. Import validates the complete payload before asking for confirmation and replacing progress. Reset also requires confirmation. Clearing browser storage can still remove data, so regular exports are appropriate when progress matters.

## Architecture

- `cards/` contains curated definitions and stable IDs.
- `scheduler/` isolates all `ts-fsrs` APIs and serialization.
- `queue/` selects due/new cards and interleaves ordering.
- `storage/` validates, imports, exports, and persists versioned state.
- `study-context.tsx` coordinates one browser-local learner.
- `pages/` and `components/` implement the lazy-loaded routes.

A central clock boundary supports deterministic scheduling tests. Source links use the existing handbook slug and heading extraction logic.

## Limitations and future work

The initial catalog prioritizes the nineteen migrated technical exercises and selected interview-derived concepts. It does not import `software-architecture-playbook`, optimize personal FSRS parameters, synchronize devices, support multiple learners, or generate canonical cards with AI. Those extensions should follow only after real use validates the current learning loop.
