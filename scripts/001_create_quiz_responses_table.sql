-- Create quiz_responses table to store user quiz answers
CREATE TABLE IF NOT EXISTS quiz_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Quiz answers
  workouts TEXT CHECK (workouts IN ('0-2', '3-5', '6+')),
  goal TEXT CHECK (goal IN ('lose', 'maintain', 'gain')),
  height INTEGER,
  weight DECIMAL(5,2),
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  birth_day INTEGER CHECK (birth_day >= 1 AND birth_day <= 31),
  birth_month INTEGER CHECK (birth_month >= 1 AND birth_month <= 12),
  birth_year INTEGER CHECK (birth_year >= 1900 AND birth_year <= 2100),
  target_weight DECIMAL(5,2),
  source TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view their own quiz responses
CREATE POLICY "Users can view own quiz responses"
  ON quiz_responses
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own quiz responses
CREATE POLICY "Users can insert own quiz responses"
  ON quiz_responses
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own quiz responses
CREATE POLICY "Users can update own quiz responses"
  ON quiz_responses
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_quiz_responses_user_id ON quiz_responses(user_id);
CREATE INDEX idx_quiz_responses_created_at ON quiz_responses(created_at DESC);
