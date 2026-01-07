-- Seed courses
INSERT INTO courses (slug, domain, description) VALUES
('llm-fundamentals', 'LLM Fundamentals', 'How language models work—not just surface prompting'),
('prompt-engineering', 'Prompt Engineering', 'Systematic prompt design—not tips and tricks'),
('agentic-systems', 'Agentic Systems', 'Building AI that takes autonomous action'),
('rag-knowledge', 'RAG & Knowledge', 'Connecting AI to your data intelligently'),
('strategic-ai', 'Strategic AI', 'Making AI decisions that create value')
ON CONFLICT (slug) DO NOTHING;

-- Seed course tracks for LLM Fundamentals
INSERT INTO course_tracks (course_id, level, duration, modules, price_cents, locked) VALUES
((SELECT id FROM courses WHERE slug = 'llm-fundamentals'), 'Foundation', '8 hours', 12, 0, false),
((SELECT id FROM courses WHERE slug = 'llm-fundamentals'), 'Application', '12 hours', 16, 9900, true),
((SELECT id FROM courses WHERE slug = 'llm-fundamentals'), 'Systems', '16 hours', 20, 14900, true),
((SELECT id FROM courses WHERE slug = 'llm-fundamentals'), 'Mastery', '20 hours', 24, 19900, true);

-- Seed course tracks for Prompt Engineering
INSERT INTO course_tracks (course_id, level, duration, modules, price_cents, locked) VALUES
((SELECT id FROM courses WHERE slug = 'prompt-engineering'), 'Foundation', '6 hours', 10, 0, false),
((SELECT id FROM courses WHERE slug = 'prompt-engineering'), 'Application', '10 hours', 14, 9900, true),
((SELECT id FROM courses WHERE slug = 'prompt-engineering'), 'Systems', '14 hours', 18, 14900, true),
((SELECT id FROM courses WHERE slug = 'prompt-engineering'), 'Mastery', '18 hours', 22, 19900, true);

-- Seed course tracks for Agentic Systems
INSERT INTO course_tracks (course_id, level, duration, modules, price_cents, locked) VALUES
((SELECT id FROM courses WHERE slug = 'agentic-systems'), 'Foundation', '10 hours', 12, 0, false),
((SELECT id FROM courses WHERE slug = 'agentic-systems'), 'Application', '14 hours', 16, 9900, true),
((SELECT id FROM courses WHERE slug = 'agentic-systems'), 'Systems', '18 hours', 20, 14900, true),
((SELECT id FROM courses WHERE slug = 'agentic-systems'), 'Mastery', '24 hours', 26, 19900, true);

-- Seed course tracks for RAG & Knowledge
INSERT INTO course_tracks (course_id, level, duration, modules, price_cents, locked) VALUES
((SELECT id FROM courses WHERE slug = 'rag-knowledge'), 'Foundation', '8 hours', 11, 0, false),
((SELECT id FROM courses WHERE slug = 'rag-knowledge'), 'Application', '12 hours', 15, 9900, true),
((SELECT id FROM courses WHERE slug = 'rag-knowledge'), 'Systems', '16 hours', 19, 14900, true),
((SELECT id FROM courses WHERE slug = 'rag-knowledge'), 'Mastery', '20 hours', 23, 19900, true);

-- Seed course tracks for Strategic AI
INSERT INTO course_tracks (course_id, level, duration, modules, price_cents, locked) VALUES
((SELECT id FROM courses WHERE slug = 'strategic-ai'), 'Foundation', '8 hours', 11, 0, false),
((SELECT id FROM courses WHERE slug = 'strategic-ai'), 'Application', '12 hours', 15, 9900, true),
((SELECT id FROM courses WHERE slug = 'strategic-ai'), 'Systems', '16 hours', 19, 14900, true),
((SELECT id FROM courses WHERE slug = 'strategic-ai'), 'Mastery', '24 hours', 25, 19900, true);
