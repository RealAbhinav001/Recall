-- Enable pgvector so chunk embeddings can be stored and searched by similarity.
-- Lives in a migration (not run by hand) so every fresh database — local,
-- CI, production — gets it automatically.
CREATE EXTENSION IF NOT EXISTS vector;
